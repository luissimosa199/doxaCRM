import React from "react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { CustomSession, authOptions } from "./api/auth/[...nextauth]";
import DoctorEmailContent from "@/components/DoctorEmailContent";

const Email = () => {
  return (
    <DoctorEmailContent
      name="Luis"
      id="1"
    />
  );
};

export default Email;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: CustomSession | null = await getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session || session?.role !== "ADMIN") {
    return {
      redirect: {
        destination: session ? "/login" : "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
