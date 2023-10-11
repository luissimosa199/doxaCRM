import React from "react";

const TableSkeleton = () => {
  return (
    <>
      <table className="bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Nombre Completo</th>
            <th className="py-2 px-4 text-left">Teléfono</th>
            <th className="py-2 px-4 text-left">Horario Preferido</th>
            <th className="py-2 px-4 text-left">Obra Social</th>
            <th className="py-2 px-4 text-left">Tipo Consulta</th>
            <th className="py-2 px-4 text-left">Provincia</th>
            <th className="py-2 px-4 text-left">Localidad</th>
            <th className="py-2 px-4 text-left">DNI</th>
            <th className="py-2 px-4 text-left">Doctor</th>
            <th className="py-2 px-4 text-left">Doctor Link</th>
          </tr>
        </thead>
        <tbody>
          {Array(10).map((e: string, idx: number) => {
            return (
              <tr key={idx}>
                <td className="border-t py-2 px-4">Cargando...</td>
                <td className="border-t py-2 px-4">Cargando...</td>
                <td className="border-t py-2 px-4">Cargando...</td>
                <td className="border-t py-2 px-4">Cargando...</td>
                <td className="border-t py-2 px-4">Cargando...</td>
                <td className="border-t py-2 px-4">Cargando...</td>
                <td className="border-t py-2 px-4">Cargando...</td>
                <td className="border-t py-2 px-4">Cargando...</td>
                <td className="border-t py-2 px-4">Cargando...</td>
                <td className="border-t py-2 px-4">Cargando...</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4 flex items-center justify-center space-x-4">
        {Array(3)
          .fill(null)
          .map((_, idx) => (
            <button
              key={idx}
              className="bg-gray-300 animate-pulse rounded w-24 h-8"
            ></button>
          ))}
      </div>
    </>
  );
};

export default TableSkeleton;
