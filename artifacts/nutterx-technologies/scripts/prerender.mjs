import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

process.env.NODE_ENV = 'production';

const outputFile = path.resolve('dist/public/index.html');
const vite = await createServer({
  appType: 'custom',
  logLevel: 'error',
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true },
});

try {
  const [{ default: App }, { ErrorBoundary }] = await Promise.all([
    vite.ssrLoadModule('/src/App.tsx'),
    vite.ssrLoadModule('/src/components/error-boundary.tsx'),
  ]);
  const appMarkup = renderToString(
    React.createElement(
      ErrorBoundary,
      null,
      React.createElement(App),
    ),
  );
  const html = await readFile(outputFile, 'utf8');
  const emptyRoot = '<div id="root"></div>';

  if (!html.includes(emptyRoot)) {
    throw new Error('Could not find the application root in the built HTML.');
  }

  await writeFile(
    outputFile,
    html.replace(emptyRoot, `<div id="root">${appMarkup}</div>`),
  );
  console.log(`Pre-rendered ${appMarkup.length} characters of page content.`);
} finally {
  await vite.close();
}
