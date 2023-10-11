import React from "react";
import EmailContent from "@/components/EmailContent";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { CustomSession, authOptions } from "./api/auth/[...nextauth]";

const Email = () => {
  return (
    <EmailContent
      name="Luis"
      slug="Juan Perez"
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
