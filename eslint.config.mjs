import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  // eslint-config-next ships its flat config as an array under this subpath;
  // spreading it is the form that actually runs under the pinned ESLint 9 /
  // Next 16 pair. Importing the package root gives you the legacy shape.
  ...nextCoreWebVitals,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    rules: {
      // Content data files carry long prose strings; wrapping them at 80
      // columns would make them harder to proofread, not easier.
      "react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],
    },
  },
]);
