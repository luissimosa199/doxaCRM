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
  id: string;
}

const EmailContent: FunctionComponent<EmailProps> = ({ name, id }) => {
  return (
    <>
      <Preview>¡Incrementa tus pacientes!</Preview>
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
            <Text className="text-black text-base leading-[24px] px-4 font-semibold">
              Podemos ayudarte a conseguir más pacientes.
            </Text>

            <Text className="text-black text-base leading-[24px] px-4">
              <span className="font-semibold">¿Cómo funciona?</span> Conexión
              Inmediata: Una vez que forma parte de nuestra red, dirigimos a
              pacientes que buscan especialistas en su área directamente a su
              perfil. Los pacientes pueden agendar sus turnos directamente desde
              nuestra plataforma, facilitando el proceso para ambos.
            </Text>

            <Text className="text-black text-base leading-[24px] px-4">
              <span className="font-semibold">Pago por Resultados:</span>{" "}
              Nosotros solo cobramos una pequeña tarifa por cada paciente que
              agende una cita a través de nuestra plataforma.
            </Text>

            <Text className="text-black text-base leading-[24px] px-4">
              Tenemos estos beneficios gratis para vos por{" "}
              <span className="font-semibold">tiempo limitado:</span>
            </Text>

            <Text className="text-black text-base font-semibold leading-[15px] px-6">
              ✔ Incremento en el número de pacientes.
            </Text>

            <Text className="text-black text-base font-semibold leading-[15px] px-6">
              ✔ Menos tiempo y recursos invertidos en marketing.
            </Text>

            <Text className="text-black text-base font-semibold leading-[15px] px-6">
              ✔ Servicio de chat y videollamadas para consulta virtual.
            </Text>

            <Text className="text-black text-base font-semibold leading-[15px] px-6">
              ✔ Facilitamos el cobro de copagos
            </Text>

            <Text className="text-black text-base font-semibold leading-[15px] px-6">
              ✔ Soporte y asistencia gratuita.
            </Text>

            <Link
              href={`https://panel.doxadoctor.com/formulario/doctor?id=${id}`}
              className="bg-orange-500 flex text-lg w-fit mx-auto font-semibold text-center text-white py-2 px-4 rounded-full mb-4 no-underline"
            >
              Quiero mis beneficios
            </Link>

            <Text className="text-black mt-4 text-base leading-[24px] px-4">
              ¡esperamos contar con usted pronto!
            </Text>

            <Text className="text-black text-base leading-[24px] px-4">
              Saludos cordiales.
            </Text>

            <Section className="mt-6 w-full">
              <div className="flex gap-2">
                <div>
                  <div className="w-full flex items-center mb-4">
                    <Img
                      src="https://doxadoctor2-static.hereflow-cdn.net/img/hector-julian.jpg"
                      width="100"
                      height="100"
                      alt="javier photo"
                      className=""
                    />
                    <div>
                      <Text className="text-black text-base leading-[2px] px-4 font-semibold">
                        Hector Julian
                      </Text>
                      <Text className="text-black text-base leading-[14px] px-4 italic mb-1 ">
                        "Estoy muy contento con el servicio"
                      </Text>
                      <Text className="px-4 text-sm">
                        <Link
                          className=""
                          href="https://www.doxadoctor.com/medicos/Hector-Julian"
                        >
                          www.doxadoctor.com/medicos/Hector-Julian
                        </Link>
                      </Text>
                    </div>
                  </div>

                  <div className="w-full flex items-center">
                    <Img
                      src="https://doxadoctor2-static.hereflow-cdn.net/img/Ignacio-Peluffo-2.jpg"
                      width="100"
                      height="100"
                      alt="javier photo"
                      className=""
                    />
                    <div>
                      <Text className="text-black text-base leading-[2px] px-4 font-semibold">
                        Ignacio Peluffo
                      </Text>
                      <Text className="text-black text-base leading-[14px] px-4 italic mb-1 ">
                        "Me consiguieron muchos pacientes!! estoy muy contento."
                      </Text>
                      <Text className="px-4 text-sm">
                        <Link
                          className=""
                          href="https://www.doxadoctor.com/medicos/Ignacio-Peluffo"
                        >
                          www.doxadoctor.com/medicos/Ignacio-Peluffo
                        </Link>
                      </Text>
                    </div>
                  </div>
                </div>

                <div className="ml-auto mr-4">
                  <Link
                    className="italic "
                    href="https://api.whatsapp.com/send?phone=1156160290"
                  >
                    <Img
                      src="https://res.cloudinary.com/dahu3rii0/image/upload/v1697806251/whatsapp_scqnum.png"
                      width="75"
                      height="65"
                      alt="ws logo"
                      className=""
                    />
                  </Link>
                </div>
              </div>
            </Section>

            <Section className="ml-4 mt-6">
              <Img
                src="https://res.cloudinary.com/dahu3rii0/image/upload/v1696881502/javier_l0irtj.jpg"
                width="100"
                height="100"
                alt="javier photo"
                className=""
              />

              <Text className="">
                Javier Gómez
                <br />
                <div className="flex gap-1 items-center">
                  <Link
                    className="italic flex gap-1 -mb-4"
                    href="https://api.whatsapp.com/send?phone=1156160290"
                  >
                    <div className="w-[25px] h-[15px]">
                      <Img
                        src="https://res.cloudinary.com/dahu3rii0/image/upload/v1697806251/whatsapp_scqnum.png"
                        width="25"
                        height="15"
                        alt="javier photo"
                        className=""
                      />
                    </div>
                    <span>11 5616 0290</span>
                  </Link>
                </div>
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
