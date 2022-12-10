import electron from 'vite-plugin-electron';

const config = electron([
  {
    entry: 'electron/main/index.ts',
    vite: {
      build: {
        // For Debug
        sourcemap: true,
        outDir: 'dist-electron/main',
      },
      plugins: [process.env.VSCODE_DEBUG ? null : null],
    },
  },
  {
    entry: 'electron/preload/index.ts',
    vite: {
      build: {
        // For Debug
        sourcemap: 'inline',
        outDir: 'dist-electron/preload',
      },
    },
    onstart(options) {
      // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
      // instead of restarting the entire Electron App.
      options.reload();
    },
  },
  {
    // Enables use of Node.js API in the Electron-Renderer
    // https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#electron-renderervite-serve
  },
]);

export default config;
