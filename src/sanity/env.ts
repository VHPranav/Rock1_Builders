export const apiVersion = "2026-10-26";

export const projectId = required(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, "NEXT_PUBLIC_SANITY_PROJECT_ID");
export const dataset = required(process.env.NEXT_PUBLIC_SANITY_DATASET, "NEXT_PUBLIC_SANITY_DATASET");

function required(value: string | undefined, name: string): string {
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}
