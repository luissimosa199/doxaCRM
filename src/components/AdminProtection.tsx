import { useAdminProtection } from "@/hooks/useAdminProtection";
import { FunctionComponent, PropsWithChildren } from "react";

const AdminProtection: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  useAdminProtection();
  return children;
};

export default AdminProtection;
