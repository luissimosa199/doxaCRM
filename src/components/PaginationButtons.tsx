import React, { FunctionComponent } from "react";

interface PaginationButtonsProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  total: number;
  limit: number;
}

const PaginationButtons: FunctionComponent<PaginationButtonsProps> = ({
  setPage,
  page,
  total,
  limit,
}) => {
  return (
    <div className="my-4 flex items-center justify-center space-x-4">
      <button
        onClick={() => setPage(1)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
      >
        Inicio
      </button>
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
      >
        Anterior
      </button>
      <span className="text-lg">{page}</span>
      <button
        onClick={() => {
          setPage((prev) => (total > prev * limit ? prev + 1 : prev));
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
};

export default PaginationButtons;
