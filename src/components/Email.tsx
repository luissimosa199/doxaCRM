import React, { FunctionComponent } from "react";

import { Html } from "@react-email/components";
import EmailContent from "./EmailContent";

interface EmailProps {
  name: string;
  slug: string;
  id: string;
}

const DoxaEmail: FunctionComponent<EmailProps> = (props) => {
  return (
    <Html>
      <EmailContent {...props} />
    </Html>
  );
};

export default DoxaEmail;
