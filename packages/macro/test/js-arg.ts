export default [
  {
    name: "Arg macro should be exluded from values",
    input: `
        import { t, arg } from '@translation/macro';
        const a = t\`Hello $\{arg('name')\}\`;
    `,
    expected: `
        import { i18n } from "@translation/core";
        const a = 
          /*i18n*/
          i18n._("Hello {name}")
    `,
  },
]
