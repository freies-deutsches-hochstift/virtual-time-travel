const { createGlobPatternsForDependencies } = require("@nrwl/react/tailwind");
const { join } = require("path");
const sharedTailwindConfig = require("../../libs/tailwind-preset/tailwind.config");

/** @type {import('tailwindcss').Config} */

module.exports = {
  presets: [sharedTailwindConfig],
  content: [
    join(
      __dirname,
      "{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}",
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
};
