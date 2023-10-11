import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/db/dbConnect";
import { ProspectModel } from "@/db/models/scheduleProspect";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "./auth/[...nextauth]";

type ResponseData = {
  message: string;
  prospects?: number;
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

    const prospects = await ProspectModel.countDocuments();

    res.status(200).json({ message: "Éxito", prospects });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error retrieving prospects." });
  }
}
