const jsdom = require("jsdom").JSDOM;
const fs = require("fs");
const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const nodeResolve = require("rollup-plugin-node-resolve");
const replace = require("rollup-plugin-replace");
const { terser } = require("rollup-plugin-terser");
const postcss = require("rollup-plugin-postcss");
const clear = require("rollup-plugin-clear");
const { rollup } = require("rollup");
const brotli = require("rollup-plugin-brotli");
const { compress } = require("brotli");
const { gzip } = require("node-zopfli");
const gzipPlugin = require("rollup-plugin-gzip").default;
const workboxBuild = require("workbox-build");

// PostCSS plugins
const simplevars = require("postcss-simple-vars");
const nested = require("postcss-nested");
const cssnext = require("postcss-cssnext");
const cssnano = require("cssnano");
const react = require("react");
const reactDom = require("react-dom");

const plugins = [
  clear({
    // required, point out which directories should be clear.
    targets: ["./app/public/javascript", "./app/public/css"],
    // optional, whether clear the directores when rollup recompile on --watch mode.
    watch: true // default: false
  }),
  nodeResolve(),
  replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
  commonjs({
    include: ["node_modules/**"],
    exclude: ["node_modules/process-es6/**"],
    namedExports: {
      react: Object.keys(react),
      "react-dom": Object.keys(reactDom)
    }
  }),
  babel({ runtimeHelpers: true }),
  postcss({
    extract: "app/public/css/styles.css",
    plugins: [
      simplevars(),
      nested(),
      cssnext({ warnForDuplicates: false }),
      cssnano()
    ],
    extensions: [".css"]
  }),
  terser(),
  gzipPlugin({
    customCompression: content => compress(Buffer.from(content)),
    fileName: ".br"
  }),
  gzipPlugin({
    customCompression: content => gzip(Buffer.from(content))
  })
  // compiler()
  // visualizer()
];

const buildSWForModule = () => {
  return workboxBuild
    .injectManifest({
      swSrc: "./src/sw.js",
      swDest: "app/sw-modules.js",
      globDirectory: "app",
      globPatterns: ["public/javascript/module/*.js", "**/*.{css,html,png}"]
    })
    .then(({ count, size }) => {
      console.log(
        `Generated, which will precache ${count} files, totaling ${size} bytes.`
      );
    });
};

const buildSWForNoModule = () => {
  return workboxBuild
    .injectManifest({
      swSrc: "./src/sw.js",
      swDest: "app/sw-nomodules.js",
      globDirectory: "app",
      globPatterns: ["public/javascript/nomodule/*.js", "**/*.{css,html,png}"]
    })
    .then(({ count, size }) => {
      console.log(
        `Generated, which will precache ${count} files, totaling ${size} bytes.`
      );
    });
};

rollup({
  input: "src/index.js",
  plugins
}).then(bundle => {
  bundle
    .write({
      dir: "app/public/javascript/module",
      format: "es"
    })
    .then(res => {
      let list;
      for (let index = 0; index < res.output.length; index++) {
        const element = res.output[index];

        if (element.isEntry) list = [...element.imports];

        if (
          element.fileName.includes("Welcome") &&
          element.fileName.endsWith(".js")
        ) {
          list.push(element.fileName);
        }
      }
      AppendChunks(list);
    });
});

rollup({
  input: "src/index.js",
  plugins
}).then(bundle => {
  bundle
    .write({
      dir: "app/public/javascript/nomodule",
      format: "system"
    })
    .then(res => {
      let list;
      for (let index = 0; index < res.output.length; index++) {
        const element = res.output[index];

        if (element.isEntry) list = [...element.imports];

        if (
          element.fileName.includes("Welcome") &&
          element.fileName.endsWith(".js")
        ) {
          list.push(element.fileName);
        }
      }
      AppendChunks(list, false);
      buildSWForNoModule();
      buildSWForModule();
    });
});

brotli({
  options: {
    mode: 0 // "generic mode"
    // ...
  },
  additional: ["dist/bundle.css"],
  minSize: 1000
});

function AppendChunks(list, es = true) {
  options = {
    // runScripts: "dangerously",
    resources: "usable"
  };

  if (es) {
    jsdom
      .fromFile("app/template.html", options)
      .then(dom => {
        let window = dom.window,
          document = window.document;

        var script = document.createElement("script");

        script.innerHTML = `;window.module = ${JSON.stringify(list)}`;

        document.head.prepend(script);

        return dom;
      })
      .then(res => {
        fs.writeFile("app/index.html", res.serialize(), function(err) {
          if (err) throw err;
          console.log("Saved!");
        });
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    jsdom
      .fromFile("app/index.html", options)
      .then(dom => {
        let window = dom.window,
          document = window.document;

        var script = document.createElement("script");

        script.innerHTML = `window.nomodule = ${JSON.stringify(list)}`;

        document.head.prepend(script);

        return dom;
      })
      .then(res => {
        fs.writeFile("app/index.html", res.serialize(), function(err) {
          if (err) throw err;
          console.log("Saved!");
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
}
