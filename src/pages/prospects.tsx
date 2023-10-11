import GlobalData from "@/components/GlobalData";
import MainTable from "@/components/MainTable";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CustomSession } from "./api/auth/[...nextauth]";

const Prospects = () => {
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
    <div>
      <GlobalData />
      <MainTable />
    </div>
  );
};

export default Prospects;
