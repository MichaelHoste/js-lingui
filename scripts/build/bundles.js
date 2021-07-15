"use strict"

const bundleTypes = {
  UNIVERSAL: "UNIVERSAL",
  NODE: "NODE",
  NOOP: "NOOP",
  ESM: "ESM",
}

const bundles = [
  {
    type: bundleTypes.UNIVERSAL,
    entry: "@translation/core",
    externals: []
  },

  {
    type: bundleTypes.UNIVERSAL,
    entry: "@translation/core",
    label: "dev",
    externals: []
  },

  {
    type: bundleTypes.UNIVERSAL,
    entry: "@translation/react",
    externals: ["@translation/core"]
  },
  {
    type: bundleTypes.UNIVERSAL,
    entry: "@translation/detect-locale",
  },
  {
    type: bundleTypes.NODE,
    entry: "@translation/babel-plugin-extract-messages"
  },
  {
    type: bundleTypes.NODE,
    entry: "@translation/snowpack-plugin"
  },

  {
    type: bundleTypes.NODE,
    entry: "@translation/macro"
  },

  {
    type: bundleTypes.NODE,
    entry: "@translation/cli"
  },

  {
    type: bundleTypes.NODE,
    entry: "@translation/conf"
  },

  {
    type: bundleTypes.NODE,
    entry: "@translation/loader"
  }
]

// Based on deep-freeze by substack (public domain)
function deepFreeze(o) {
  Object.freeze(o)
  Object.getOwnPropertyNames(o).forEach(function(prop) {
    if (
      o[prop] !== null &&
      (typeof o[prop] === "object" || typeof o[prop] === "function") &&
      !Object.isFrozen(o[prop])
    ) {
      deepFreeze(o[prop])
    }
  })
  return o
}

// Don't accidentally mutate config as part of the build
deepFreeze(bundles)

module.exports = {
  bundleTypes,
  bundles
}
