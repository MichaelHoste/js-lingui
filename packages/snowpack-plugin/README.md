[![License][badge-license]][license]
[![Version][badge-version]][package]
[![Downloads][badge-downloads]][package]

# @translation/snowpack-plugin

> Snowpack plugin which compiles on the fly the .po files for auto-refreshing. In summary, `lingui compile` command isn't required when using this plugin

`@translation/snowpack-plugin` is part of [LinguiJS][linguijs]. See the [documentation][documentation] for all information, tutorials and examples.

## Installation

```sh
npm install --save-dev @translation/snowpack-plugin
# yarn add --dev @translation/snowpack-plugin
```

## Usage

### Via `snowpack.config.js` (Recommended)

**snowpack.config.js**

```js
module.exports = {
  plugins: [
    '@translation/snowpack-plugin',
  ],
}
```

## License

[MIT][license]

[license]: https://github.com/lingui/js-lingui/blob/main/LICENSE
[linguijs]: https://github.com/lingui/js-lingui
[documentation]: https://lingui.js.org/
[package]: https://www.npmjs.com/package/@translation/snowpack-plugin
[badge-downloads]: https://img.shields.io/npm/dw/@translation/snowpack-plugin.svg
[badge-version]: https://img.shields.io/npm/v/@translation/snowpack-plugin.svg
[badge-license]: https://img.shields.io/npm/l/@translation/snowpack-plugin.svg
