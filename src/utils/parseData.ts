export type ParsedObject = {
  doxado_id: number;
  name: string;
  email: string;
  slug?: string;
};

export function parseData(inputString: string): ParsedObject[] {
  const lines = inputString.split("\n");

  const objects: ParsedObject[] = lines
    .map((line) => {
      const elements = line.split("\t");

      return {
        doxado_id: parseInt(elements[2], 10),
        name: elements[0],
        email: elements[3],
        slug: elements[6]?.trim(),
      };
    })
    .filter((obj) => obj.email && obj.email.trim() !== "");

  return objects;
}
