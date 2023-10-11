import { CustomSession } from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAdminProtection = () => {
  const { data: session } = useSession() as { data: CustomSession | null };
  const router = useRouter();

  useEffect(() => {
    if (!session || session?.role !== "ADMIN") {
      router.push("/login");
    }
  }, [session, router]);
};
