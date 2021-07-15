export default [
  {
    input: `
        import { Select } from '@translation/macro';
        <Select
          value={count}
          _male="He"
          _female={\`She\`}
          other={<strong>Other</strong>}
        />;
      `,
    expected: `
        import { Trans } from "@translation/react";
        <Trans id="{count, select, male {He} female {She} other {<0>Other</0>}}" values={{
          count: count
        }} components={{
          0: <strong />
        }} />;
      `,
  },
  {
    input: `
        import { Select } from '@translation/macro';
        <Select
          id="msg.select"
          render="strong"
          value={user.gender}
          _male="He"
          _female={\`She\`}
          other={<strong>Other</strong>}
        />;
      `,
    expected: `
        import { Trans } from "@translation/react";
        <Trans render="strong" id="msg.select" message="{0, select, male {He} female {She} other {<0>Other</0>}}" values={{
          0: user.gender
        }} components={{
          0: <strong />
        }} />;
      `,
  },
]
