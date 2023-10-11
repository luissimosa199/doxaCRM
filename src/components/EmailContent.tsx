import React, { FunctionComponent } from "react";

import {
  Body,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface EmailProps {
  name: string;
  slug: string;
  id: string;
}

const EmailContent: FunctionComponent<EmailProps> = ({ name, slug, id }) => {
  return (
    <>
      <Preview>Tu turno médico con {name}.</Preview>
      <Tailwind>
        <Body className="bg-[#f9fafe] my-auto mx-auto font-sans pb-4">
          <Section
            style={{ width: "100% !important" }}
            className="mt-6 bg-[#0083ef]"
          >
            <Img
              src="https://www.doxadoctor.com/build/assets/img-app/logo-white@1x.45991de8.png"
              width="200"
              height="37"
              alt="doxa logo"
              className="my-6 mx-auto"
            />
          </Section>

          <Section className="my-6">
            <Heading className="text-black text-4xl font-semibold text-center p-0 my-[30px] mx-0">
              ¡Hola {name}!
            </Heading>

            <Text className="text-black text-base leading-[24px] px-4">
              ¡Gracias por confiar en nosotros y solicitar un turno a través de
              nuestra plataforma! Estamos comprometidos en brindarte la mejor
              atención y, por ello, estamos haciendo todo lo posible para
              conectar tu solicitud con tu especialista medico y así resolver tu
              consulta de manera eficiente.
            </Text>

            <Text className="text-black text-base leading-[24px] px-4">
              Entendemos lo valioso que es tu tiempo y cuán importante es esta
              consulta para ti. Por eso, para agilizar y optimizar el proceso,
              te pedimos que completes un formulario que nos permitirá entender
              mejor tus necesidades y facilitar la comunicación con el
              profesional.
            </Text>

            <Link
              href={`https://panel.doxadoctor.com/formulario/turnos?id=${id}`}
              className="bg-[#0083ef] flex text-lg w-fit mx-auto font-semibold text-center text-white py-2 px-4 rounded-full no-underline"
            >
              Continuar con el turno {slug.replaceAll("-", " ")}
            </Link>

            <Text className="text-black text-base leading-[24px] px-4">
              Sabemos que cada detalle cuenta y queremos asegurarnos de que
              tanto tú como el doctor tengan toda la información necesaria para
              que tu consulta sea exitosa.
            </Text>

            <Text className="text-black text-base leading-[24px] px-4">
              ¡Hasta pronto y cuídate mucho!
            </Text>

            <Text className="text-black text-base leading-[24px] px-4">
              Saludos cordiales.
            </Text>

            <Section className="ml-4 mt-6">
              <Img
                src="https://res.cloudinary.com/dahu3rii0/image/upload/v1696881502/javier_l0irtj.jpg"
                width="100"
                height="100"
                alt="javier photo"
                className=""
              />

              <Text className="">
                Javier
                <br />
                <Link
                  className="w-fit italic"
                  href="mailto:javier.doxadoctor@gmail.com"
                >
                  javier.doxadoctor@gmail.com
                </Link>
                <br />
                <Link
                  className="w-fit italic"
                  href="https://doxadoctor.com"
                >
                  https://doxadoctor.com
                </Link>
              </Text>
            </Section>

            <Section className="text-center mt-6">
              <Link
                href={`https://doxadoctor.com/medicos/${slug}`}
                className="bg-[#0083ef] flex items-center w-fit mx-auto font-semibold  text-white py-1 px-2 rounded-full no-underline mt-4"
              >
                Ir al perfil de {slug.replaceAll("-", " ")}
              </Link>
            </Section>

            <Text className="text-slate-400 text-sm leading-[24px] px-4 text-center mt-6">
              © Doxadoctor 2013-2023 All rights reserved.
            </Text>
          </Section>
        </Body>
      </Tailwind>
    </>
  );
};

export default EmailContent;
