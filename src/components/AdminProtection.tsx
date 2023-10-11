// import { useAdminProtection } from "@/hooks/useAdminProtection";
import { useRouter } from "next/router";
import { FunctionComponent, PropsWithChildren, useEffect } from "react";

const AdminProtection: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== "/login") {
      console.log("admin check");
      // useAdminProtection();
    }
  }, [router.pathname]);

  return <>{children}</>;
};

export default AdminProtection;
