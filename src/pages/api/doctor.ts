import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";
import { render } from "@react-email/render";
import sendgrid from "@sendgrid/mail";
import React, { ReactElement } from "react";
import dbConnect from "@/db/dbConnect";
import { getServerSession } from "next-auth";
import { CustomSession, authOptions } from "./auth/[...nextauth]";
import DoctorEmail from "@/components/DoctorEmail";
import { ProspectsDocsModel } from "@/db/models/ProspectsDocsModel";

type DoctorData = {
  name: string;
  email: string;
  tlf: string;
  id: string;
};

type ResponseData = {
  message: string;
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
    console.log({ session, role: session.role });
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests allowed" });
    return;
  }

  const doctors: DoctorData[] = req.body;

  if (
    !Array.isArray(doctors) ||
    doctors.some((user) => !user.name || !user.email)
  ) {
    res.status(400).json({ message: "Invalid data format" });
    return;
  }

  await dbConnect();

  sendgrid.setApiKey(process.env.SEND_GRID_API_KEY_2 as string);

  console.log(doctors);

  const emailPromises = doctors.map(async (doctor, idx) => {
    const id = nanoid(9);
    const emailHtml = render(DoctorEmail({ ...doctor, id }) as ReactElement);

    const options = {
      from: "javier.doxadoctor@gmail.com",
      to: doctor.email,
      subject: `¡${doctor.name} Incrementa tus pacientes!`,
      html: emailHtml,
    };

    const newProspect = new ProspectsDocsModel({
      id: id,
      name: doctor.name,
      email: doctor.email,
    });

    const saved = await newProspect.save();

    console.log("saved", saved);
    console.log(idx + 1, `enviado a ${doctor.email}`);
    return sendgrid.send(options);
  });

  try {
    await Promise.all(emailPromises);

    console.log("Mensajes enviados exitosamente");
    res
      .status(200)
      .json({ message: "Function executed successfully for all users" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ message: "Error sending emails." });
  }
}
