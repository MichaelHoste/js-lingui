========================
Setup with React project
========================

.. important::

   If you use Create React App, even ejected, follow :doc:`LinguiJS and Create React App</tutorials/setup-cra>`
   setup guide.

This setup guide is for any project which uses React.

Install
=======

1. Install ``@translation/cli``, ``@translation/macro``, `babel-plugin-macros` and Babel core
   packages as a development dependencies and ``@translation/react`` as a runtime dependency.

   .. code-block:: shell

      npm install --save-dev @translation/cli @babel/core
      npm install --save-dev @translation/macro babel-plugin-macros  # required for macros
      npm install --save @translation/react

      # or using Yarn
      yarn add --dev @translation/cli @babel/core
      yarn add --dev @translation/macro babel-plugin-macros  # required for macros
      yarn add @translation/react

   In case you get errors with ``import/no-extraneous-dependencies`` eslint rule feel free to add the dependencies as non-dev

   .. code-block:: shell

      npm install --save-dev @translation/cli @babel/core
      npm install --save-dev babel-plugin-macros  # required for macros
      npm install --save @translation/macro @translation/react

      # or using Yarn
      yarn add --dev @translation/cli @babel/core
      yarn add --dev babel-plugin-macros  # required for macros
      yarn add @translation/macro @translation/react

2. Add ``macros`` plugin to Babel config (e.g: ``.babelrc``):

   .. code-block:: json

      {
        "plugins": [
          "macros"
        ]
      }

   .. important::

      If you use any preset, check first if it contains ``macros`` plugin.
      These presets already includes ``macros`` plugin:

      - ``react-scripts``

3. Create ``.linguirc`` file with LinguiJS configuration in root of your project (next
   to ``package.json``). Replace ``src`` with a directory name where you have source files:

   .. code-block:: json

      {
         "locales": ["en", "cs"],
         "catalogs": [{
            "path": "src/locales/{locale}/messages",
            "include": ["src"]
         }],
         "format": "po"
      }

   PO format is recommended for message catalogs. See :conf:`format` documentation for other
   available formats.

4. Add following scripts to your ``package.json``:

   .. code-block:: json

      {
         "scripts": {
            "extract": "lingui extract",
            "compile": "lingui compile",
         }
      }

5. Check the installation by running ``npm run extract`` (or ``yarn extract``):

   .. code-block:: shell

      npm run extract

      # or using Yarn
      yarn extract

   There should be no error and you should see output similar following:

   .. code-block:: none

      > npm run extract

      Catalog statistics:
      ┌──────────┬─────────────┬─────────┐
      │ Language │ Total count │ Missing │
      ├──────────┼─────────────┼─────────┤
      │ cs       │     0       │   0     │
      │ en       │     0       │   0     │
      │ fr       │     0       │   0     │
      └──────────┴─────────────┴─────────┘

      (use "lingui extract" to update catalogs with new messages)
      (use "lingui compile" to compile catalogs for production)

Congratulations! You've sucessfully set up project with LinguiJS.
Now it's good time to follow :doc:`React tutorial </tutorials/react>`
or read about :doc:`ICU Message Format </ref/message-format>` which
is used in messages.

Further reading
===============

Checkout these reference guides for full documentation:

- :doc:`ICU Message Format </ref/message-format>`
- :doc:`React reference </ref/react>`
- :doc:`Macro reference </ref/macro>`
- :doc:`CLI reference </ref/cli>`
- :doc:`Configuration reference </ref/conf>`
