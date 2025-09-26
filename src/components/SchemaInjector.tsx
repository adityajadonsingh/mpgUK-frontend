import { Schema } from "@/types";

interface SchemaInjectorProps {
  schemas?: Schema[];
}

export default function SchemaInjector({ schemas }: SchemaInjectorProps) {
  if (!schemas || schemas.length === 0) return null;

  const combinedSchemas = schemas.map((s) => s.schema_json);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(combinedSchemas.length === 1 ? combinedSchemas[0] : combinedSchemas),
      }}
    />
  );
}
