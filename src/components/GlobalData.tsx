import { useQuery } from "@tanstack/react-query";
import React from "react";

const fetchGlobalData = async () => {
  const response = await fetch("/api/globalData");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const GlobalData = () => {
  const { data, isLoading, isError } = useQuery(
    ["globalData"],
    fetchGlobalData
  );

  if (isLoading)
    return (
      <div className="p-4 mb-4">
        Cantidad de turnos solicitados: Cargando...
      </div>
    );
  if (isError) return <div>Error fetching data</div>;

  const prospects = data?.prospects || 0;
  return (
    <h2 className="p-4 mb-4">Cantidad de turnos solicitados: {prospects} </h2>
  );
};

export default GlobalData;
