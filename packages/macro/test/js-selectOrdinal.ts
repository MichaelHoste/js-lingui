export default [
  {
    input: `
        import { t, selectOrdinal } from '@translation/macro'
        t\`This is my \${selectOrdinal(count, {
          one: "#st",
          "two": \`#nd\`,
          other: ("#rd")
        })} cat\`
      `,
    expected: `
        import { i18n } from "@translation/core";
        /*i18n*/
        i18n._("This is my {count, selectordinal, one {#st} two {#nd} other {#rd}} cat", {
          count: count
        });
      `,
  },
]
