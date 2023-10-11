import { ParsedObject } from "@/utils/parseData";
import dynamic from "next/dynamic";
import { FunctionComponent } from "react";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { twilight } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface OutputProps {
  output: ParsedObject[];
}

const ReactSyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Prism),
  {
    ssr: false,
  }
);

const Output: FunctionComponent<OutputProps> = ({ output }) => {
  const processedOutput = output;

  const handleCopy = async () => {
    const textToCopy = JSON.stringify(processedOutput, null, 2);

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Copiado exitosamente");
      })
      .catch((error) => {
        alert("Error");
      });
  };

  return (
    <>
      {output && (
        <div className="w-full min-h-screen">
          <ReactSyntaxHighlighter
            language="javascript"
            style={twilight}
            customStyle={{ height: "100vh" }}
          >
            {JSON.stringify(processedOutput, null, 2)}
          </ReactSyntaxHighlighter>
          <button
            onClick={handleCopy}
            type="button"
            className="w-full md:mx-auto px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white focus:outline-none focus:bg-blue-500 focus:text-white transition-all "
          >
            Copiar al portapapeles
          </button>
        </div>
      )}
    </>
  );
};

export default Output;
