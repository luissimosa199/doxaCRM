import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";
import { render } from "@react-email/render";
import sendgrid from "@sendgrid/mail";
import DoxaEmail from "@/components/Email";
import React, { ReactElement } from "react";
import dbConnect from "@/db/dbConnect";
import { ProspectModel } from "@/db/models/scheduleProspect";
import { getServerSession } from "next-auth";
import { CustomSession, authOptions } from "./auth/[...nextauth]";

type UserData = {
  name: string;
  email: string;
  slug: string;
  id: string;
  doxado_id: string;
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

  const users: UserData[] = req.body;

  if (
    !Array.isArray(users) ||
    users.some((user) => !user.name || !user.email)
  ) {
    res.status(400).json({ message: "Invalid data format" });
    return;
  }

  await dbConnect();

  sendgrid.setApiKey(process.env.SEND_GRID_API_KEY as string);

  const emailPromises = users.map(async (user, idx) => {
    const id = nanoid(9);
    const emailHtml = render(DoxaEmail({ ...user, id }) as ReactElement);

    const options = {
      from: "javier.doxadoctor@gmail.com",
      to: user.email,
      subject: `Consigue tu turno con ${user.slug.replaceAll("-", " ")}`,
      html: emailHtml,
    };

    const newProspect = new ProspectModel({
      _id: id,
      name: user.name,
      email: user.email,
      doxado_id: user.doxado_id,
      doctor: user.slug.replaceAll("-", " "),
      slug: user.slug,
    });

    const saved = await newProspect.save();

    console.log(idx + 1, `enviado a ${user.email}`);
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
