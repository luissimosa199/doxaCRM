import Output from "@/components/Output";
import { ParsedObject, parseData } from "@/utils/parseData";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import { useState } from "react";
import Swal from "sweetalert2";
import { CustomSession, authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps } from "next";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [inputData, setInputData] = useState<string>("");
  const [processedData, setProcessedData] = useState<ParsedObject[] | null>();
  const [dataAnalized, setDataAnalized] = useState<boolean>(false);

  const sendEmail = async () => {
    setLoading(true);

    if (!processedData) {
      return;
    }

    const response = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(processedData),
    });

    const data = await response.json();
    setLoading(false);
    return data;
  };

  const handleSend = () => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Enviar",
    }).then((result) => {
      if (result.isConfirmed) {
        sendEmail();
        Swal.fire(`${processedData?.length} Mensajes enviados`);
        setInputData("");
        setProcessedData(null);
        setDataAnalized(false);
      }
    });
  };

  const handleAnalize = () => {
    if (!inputData) {
      return;
    }

    const data = parseData(inputData);
    console.log(data);
    setProcessedData(data);
    setDataAnalized(true);
  };

  return (
    <div
      className={`flex min-h-screen flex-col items-center p-24 bg-gray-100 ${inter.className}`}
    >
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Prospects:</h2>

      <textarea
        name="inputdata"
        value={inputData}
        id="inputdata"
        className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setInputData(e.target.value)}
        cols={30}
        rows={10}
      ></textarea>

      <button
        className="w-1/2 bg-blue-500 mb-4 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        onClick={handleAnalize}
      >
        Analizar
      </button>

      {dataAnalized && (
        <button
          onClick={handleSend}
          disabled={loading}
          className={`${
            loading ? "bg-slate-600" : "bg-blue-500"
          } w-1/2 text-white mb-4 px-6 py-2 rounded shadow hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50`}
        >
          Enviar
        </button>
      )}

      {loading && <p className="mt-2 text-gray-700">Enviando...</p>}

      {dataAnalized && processedData && <Output output={processedData} />}
    </div>
  );
}

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
