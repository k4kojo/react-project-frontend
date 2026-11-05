# Fix Notes: `process is not defined`

## What this error means

`process` is a Node.js global. It exists when code runs in Node, but it does not exist in the browser.

Create React App normally replaces safe environment checks like this during bundling:

```js
process.env.NODE_ENV
```

The crash happens when some bundled code still tries to read `process` at runtime in Chrome. In CRA 5 / webpack 5 this became more common because webpack 5 stopped automatically polyfilling Node globals for browser apps. Older dependencies, deep CommonJS builds, or direct imports from package internals can accidentally leave a real `process` reference in the browser bundle.

## Why the other console warnings are different

The manifest icon warning means Chrome could not load one of the app icons from `public/manifest.json`. It is noisy, but it does not stop React from running.

The unload / permissions-policy warning is also a browser warning. It is usually caused by Chrome or a package using a deprecated browser feature. It does not normally break a button click.

`ReferenceError: process is not defined` is different because it is a real JavaScript crash. If it happens inside code that runs after clicking a button, that button can look like it does nothing.

## Most likely trigger in this app

The most likely trigger is importing React Router from a deep CommonJS path such as:

```js
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
```

That path bypasses the normal package entry and can pull in a browser bundle that still expects `process` to exist.

The correct import is always the package root:

```js
import { Link, NavLink, Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';
```

I checked the current project files and they already use clean imports from `react-router-dom` everywhere:

- `src/App.js`
- `src/places/pages/UserPlaces.js`
- `src/user/components/UserItem.js`
- `src/shared/components/FormElements/Button.js`
- `src/shared/components/Navigation/MainNavigation.js`
- `src/shared/components/Navigation/NavLinks.js`

So the earlier bad deep import was probably the original trigger, and the clean import is the right fix.

## Applied fix

I added a tiny fallback shim in `src/polyfills.js` and imported it first in `src/index.js`.

This gives the browser a safe empty `process.env` object:

```js
window.process = window.process || { env: {} };
window.process.env = window.process.env || {};
```

This is intentionally small. It does not eject CRA, does not change webpack, and does not add a new dependency.

## Step-by-step fix checklist

1. Search the project for bad React Router imports:

```bash
rg "react-router-dom/cjs|react-router-dom/"
```

2. Replace every deep import with the normal package import:

```js
import { Link } from 'react-router-dom';
```

3. Restart the dev server so the old bundle is gone:

```bash
npm start
```

4. Hard refresh Chrome, then click the button again.

5. If the error still appears, keep `src/polyfills.js` imported at the very top of `src/index.js`.

## If a real webpack override is needed later

Only do this if a dependency still crashes after clean imports and the small shim.

### CRACO option

Install CRACO:

```bash
npm install @craco/craco
```

Change scripts in `package.json`:

```json
{
  "start": "craco start",
  "build": "craco build",
  "test": "craco test"
}
```

Create `craco.config.js`:

```js
const webpack = require('webpack');

module.exports = {
  webpack: {
    plugins: {
      add: [
        new webpack.DefinePlugin({
          'process.env': JSON.stringify({}),
        }),
      ],
    },
  },
};
```

### react-app-rewired option

Install react-app-rewired:

```bash
npm install react-app-rewired
```

Change scripts in `package.json`:

```json
{
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test"
}
```

Create `config-overrides.js`:

```js
const webpack = require('webpack');

module.exports = function override(config) {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({}),
    })
  );

  return config;
};
```

Do not eject for this. Clean imports plus the small shim should be enough for this project.
