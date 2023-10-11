import React, { useEffect } from "react";
import DoxaEmailPreview from "@/components/Email";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CustomSession } from "./api/auth/[...nextauth]";

const Email = () => {
  //
  const { data: session } = useSession() as { data: CustomSession | null };
  const router = useRouter();

  useEffect(() => {
    if (!session || session?.role !== "ADMIN") {
      router.push("/login");
    }
  }, [session, router]);
  //

  return (
    <DoxaEmailPreview
      name="Luis"
      slug="Slug-Prueba-Slug"
      id="1"
    />
  );
};

export default Email;
