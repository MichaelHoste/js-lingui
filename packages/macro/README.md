[![License][badge-license]][license]
[![Version][badge-version]][package]
[![Downloads][badge-downloads]][package]
[![Babel Macro][badge-macro]][linguijs]

# @translation/macro

> [Babel Macros](https://github.com/kentcdodds/babel-plugin-macros) which
> transforms tagged template literals and JSX components to ICU MessageFormat.

`@translation/macro` is part of [LinguiJS][linguijs]. See the [documentation][documentation]
for all information, tutorials and examples.

## Installation

```sh
npm install --save-dev @translation/macro
# yarn add --dev @translation/macro
```

## Usage

See the [reference][reference] documentation.

```jsx
import { setupI18n } from "@translation/core"
import { t } from "@translation/macro"

const i18n = setupI18n()

const message = i18n._(t`Hello, my name is ${name} and today is ${date(now)}`)

// line above is transformed using babel-plugin-macros to this
// const message = i18n._(/*i18n*/{ id: "Hello, my name is {name} and today is {now,date}", values: { name, now }})
```

## License

[MIT][license]

[license]: https://github.com/lingui/js-lingui/blob/main/LICENSE
[linguijs]: https://github.com/lingui/js-lingui
[documentation]: https://lingui.js.org/
[reference]: https://lingui.js.org/ref/macro/
[package]: https://www.npmjs.com/package/@translation/macro
[badge-downloads]: https://img.shields.io/npm/dw/@translation/macro.svg
[badge-version]: https://img.shields.io/npm/v/@translation/macro.svg
[badge-license]: https://img.shields.io/npm/l/@translation/macro.svg
[badge-macro]: https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg
