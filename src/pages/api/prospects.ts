import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/db/dbConnect";
import { ProspectModel } from "@/db/models/scheduleProspect";
import { FormTurnos, FormTurnosModel } from "@/db/models/FormTurnosModel";
import { getServerSession } from "next-auth";
import { CustomSession, authOptions } from "./auth/[...nextauth]";

type ResponseData = {
  message: string;
  data?: {
    formTurnos: FormTurnos[];
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const session = (await getServerSession(
    req,
    res,
    authOptions
  )) as CustomSession;

  if (!session || !session.user || session.role !== "ADMIN") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method !== "GET") {
    res.status(405).json({ message: "Only GET requests allowed" });
    return;
  }
  try {
    await dbConnect();

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10; // Default 10 items per page
    const skip = (page - 1) * limit;

    const total = await FormTurnosModel.countDocuments();

    const formTurnos = await FormTurnosModel.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit);

    const prospects = await ProspectModel.find().select("id name doctor slug");

    // Map over formTurnos and add the additional properties
    const enrichedFormTurnos = formTurnos
      .filter((turno) => turno.id.toString().length === 9) // Filter out documents with id not of length 9
      .map((turno) => {
        const matchingProspect = prospects.find(
          (prospect) => prospect._id.toString() === turno.id.toString()
        );

        if (matchingProspect) {
          return {
            ...turno.toObject(), // Spread the existing properties of turno
            nombreInicial: matchingProspect.name,
            doctor: matchingProspect.doctor,
            doctorLink: `doxadoctor.com/medicos/${matchingProspect.slug}`,
          };
        }
        return turno;
      });

    const data = {
      formTurnos: enrichedFormTurnos,
      total,
      page,
      limit,
    };

    res.status(200).json({ message: "Éxito", data });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error retrieving prospects." });
  }
}
