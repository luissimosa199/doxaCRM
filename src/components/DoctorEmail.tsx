import React, { FunctionComponent } from "react";
import { Html } from "@react-email/components";
import DoctorEmailContent from "./DoctorEmailContent";

interface EmailProps {
  name: string;
  id: string;
}

const DoctorEmail: FunctionComponent<EmailProps> = (props) => {
  return (
    <Html>
      <DoctorEmailContent {...props} />
    </Html>
  );
};

export default DoctorEmail;
