import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/api/graphql",
  documents: [
    "src/graphql/operations/**/*.ts",
    "components/**/*.tsx",
    "pages/**/*.tsx",
  ],
  generates: {
    "./generated/client-types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
    "./generated/server-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
