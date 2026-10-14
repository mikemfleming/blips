# blips

Blips of life is a generative audio experiment powered by React, Redux, and Tone.js.
The app runs entirely in the browser; no Express server or environment file is needed.

## Local development

Use Node.js 22 or later.

```sh
npm ci
npm start
```

Open http://localhost:8080. The development server rebuilds when source files change.

## Static build

```sh
npm run build
```

Deploy the contents of `dist/` to any static host. It contains `index.html`,
`bundle.js`, its source map, and `favicon.png`. Asset URLs are relative, so both
root sites and GitHub Pages project sites (such as `/blips/`) work.
Routes use hashes (`/#/about` or `/blips/#/about`) so links and refreshes work
without server rewrite rules. Existing `/about` bookmarks should use `#/about`.

## GitHub Pages

1. In the repository's **Settings → Pages → Build and deployment**, select
   **GitHub Actions** as the source.
2. Push to `master`, or run **Deploy to GitHub Pages** from the Actions tab.

The workflow installs locked dependencies, builds the app, and publishes `dist/`
using the official Pages actions. If you rename the default branch, update the
workflow's `push.branches` value to match. Manual deployment must also run on the
default branch.

See [GitHub's custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
