export function formatDate(dateString: string) {
  const options = {
    weekday: "long" as const,
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", options);
}
