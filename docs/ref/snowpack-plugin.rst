***********************************************
API Reference - Snowpack Plugin (@translation/snowpack-plugin)
***********************************************

It's a good practice to use compiled message catalogs during development. However,
running :cli:`compile` everytime messages are changed soon becomes tedious.

``@translation/snowpack-plugin`` is a snowpack loader, which compiles messages on the fly:

Installation
============

Install ``@translation/snowpack-plugin`` as a development dependency:

.. code-block:: sh

   npm install --save-dev @translation/snowpack-plugin

   # Or using yarn
   # yarn add --dev @translation/snowpack-plugin

Usage
=====

Simply add ``@translation/snowpack-plugin`` inside your ``snowpack.config.js``:

.. code-block:: js

   module.exports = {
      plugins: [
         '@translation/snowpack-plugin',
      ],
   }

Then in your code all you need is to use dynamic() import. Extension is mandatory. In case of using po format, use ``.po``.

.. code-block:: jsx

   export async function dynamicActivate(locale: string) {
      const { messages } = await import(`./locales/${locale}/messages.po`)
      i18n.load(locale, messages)
      i18n.activate(locale)
   }

See the `guide about dynamic loading catalogs <../guides/dynamic-loading-catalogs.html>`_
for more info.
