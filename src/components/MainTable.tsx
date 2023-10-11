import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import PaginationButtons from "@/components/PaginationButtons";
import TableSkeleton from "@/components/TableSkeleton";
import { formatDate } from "@/utils/formatDate";

type FormTurnosType = {
  _id: string;
  id: string;
  nombreCompleto: string;
  telefono: string;
  horarioPreferido: string;
  obraSocial: string;
  otroEspecialista: boolean;
  fechaNacimiento: string;
  tipoConsulta: string;
  provincia: string;
  localidad: string;
  dni: string;
  comentario: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  nombreInicial: string;
  doctor?: string;
  doctorLink?: string;
};

const MainTable = () => {
  const [page, setPage] = useState(1);
  const limit = 10; // Or any other number you prefer

  const fetchProspects = async () => {
    const response = await fetch(`/api/prospects?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, error, isLoading } = useQuery(
    ["prospects", page],
    fetchProspects
  );

  if (isLoading) return <TableSkeleton />;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  const { data: turnos } = data;

  const { formTurnos } = turnos;

  return (
    <div>
      <table className="bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Nombre Turno</th>
            <th className="py-2 px-4 text-left">Nombre Formulario</th>
            <th className="py-2 px-4 text-left">Teléfono</th>
            <th className="py-2 px-4 text-left">Horario Preferido</th>
            <th className="py-2 px-4 text-left">Obra Social</th>
            <th className="py-2 px-4 text-left">Abierto a otro profesional</th>
            <th className="py-2 px-4 text-left">Fecha de Nacimiento</th>
            <th className="py-2 px-4 text-left">Tipo Consulta</th>
            <th className="py-2 px-4 text-left">Fecha de formulario</th>
            <th className="py-2 px-4 text-left">Provincia</th>
            <th className="py-2 px-4 text-left">Localidad</th>
            <th className="py-2 px-4 text-left">DNI</th>
            <th className="py-2 px-4 text-left">Comentario</th>
            <th className="py-2 px-4 text-left">Doctor</th>
            <th className="py-2 px-4 text-left">Doctor Link</th>
          </tr>
        </thead>
        <tbody>
          {formTurnos.map((turno: FormTurnosType) => (
            <tr key={turno._id}>
              <td className="border-t py-2 px-4">
                {turno.nombreInicial || ""}
              </td>
              <td className="border-t py-2 px-4">
                {turno.nombreCompleto || ""}
              </td>
              <td className="border-t py-2 px-4">{turno.telefono || ""}</td>
              <td className="border-t py-2 px-4">
                {turno.horarioPreferido || ""}
              </td>
              <td className="border-t py-2 px-4">{turno.obraSocial || ""}</td>
              <td className="border-t py-2 px-4">
                {turno.otroEspecialista ? "Si" : "No" || ""}
              </td>
              <td className="border-t py-2 px-4">
                {turno.fechaNacimiento || ""}
              </td>
              <td className="border-t py-2 px-4">{turno.tipoConsulta || ""}</td>
              <td className="border-t py-2 px-4">
                {formatDate(turno.createdAt) || ""}
              </td>
              <td className="border-t py-2 px-4">{turno.provincia || ""}</td>
              <td className="border-t py-2 px-4">{turno.localidad || ""}</td>
              <td className="border-t py-2 px-4">{turno.dni || ""}</td>
              <td className="border-t py-2 px-4">{turno.comentario || ""}</td>
              <td className="border-t py-2 px-4">{turno.doctor || ""}</td>
              <td className="border-t py-2 px-4">
                {turno.doctorLink ? (
                  <Link
                    href={`https://${turno.doctorLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400"
                  >
                    Link
                  </Link>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationButtons
        setPage={setPage}
        total={data?.data?.total}
        limit={limit}
        page={page}
      />
    </div>
  );
};

export default MainTable;
