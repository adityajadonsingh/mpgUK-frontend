"use client";

import { Schema } from "@/types";

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
interface JSONObject {
  [key: string]: JSONValue;
}
type JSONArray = JSONValue[];


interface SchemaInjectorProps {
  schemas?: Schema[];
}

export default function SchemaInjector({ schemas }: SchemaInjectorProps) {
  if (!schemas || schemas.length === 0) return null;

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema.schema_json),
          }}
        />
      ))}
    </>
  );
}
