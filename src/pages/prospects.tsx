import GlobalData from "@/components/GlobalData";
import MainTable from "@/components/MainTable";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { CustomSession, authOptions } from "./api/auth/[...nextauth]";

const Prospects = () => {
  return (
    <div>
      <GlobalData />
      <MainTable />
    </div>
  );
};

export default Prospects;

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
