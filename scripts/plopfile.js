export default function (plop) {
  // controller generator
  plop.setGenerator("sketch", {
    description: "Create a new Sketch",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Sketch name in kebab-case please",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/sketches/{{name}}.ts",
        templateFile: "./plop-templates/sketch.hbs",
      },
      {
        type: "append",
        path: "../src/sketches/index.ts",
        pattern: "/** PLOP_INJECT_SKETCH_IMPORT */",
        template: "import {{ pascalCase name }} from './{{ name }}';",
      },
      {
        type: "append",
        path: "../src/sketches/index.ts",
        pattern: "/** PLOP_INJECT_SKETCH */",
        template: "  {{ pascalCase name}},",
      },
    ],
  });
}
