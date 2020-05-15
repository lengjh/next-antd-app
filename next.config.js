const withLess = require("@zeit/next-less");
const withCss = require("@zeit/next-css");
const isProd = process.env.NODE_ENV === "production";

const withPlugins = require("next-compose-plugins");

const WITHLESS = [
  withLess,
  {
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]___[hash:base64:5]",
    },
  },
];
const WITHCSS = [
  withCss,
  {
    cssModules: false,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]___[hash:base64:5]",
    },
  },
];

const nextOption = {
  cssModules: true,

  // postcssLoaderOptions: {
  //     parser: true,

  //     config: {
  //         ctx: {
  //             theme: JSON.stringify(process.env.REACT_APP_THEME)
  //         }
  //     }
  // },
  distDir: "build",
  // Use the CDN in production and localhost for development.
  // // assetPrefix: isProd ? 'https://cdn.mydomain.com' : '',
  compress: false,
  webpack(config, { isServer }) {
    // console.log(config, options)

    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === "function") {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader",
      });
    }

    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (
        entries["main.js"] &&
        !entries["main.js"].includes("./utils/polyfills.js")
      ) {
        entries["main.js"].unshift("./utils/polyfills.js");
      }

      return entries;
    };

    // 分开打包CSS
    try {
      config.optimization.splitChunks.cacheGroups.styles.chunks = "async";
    } catch (ev) {
      console.log("--");
    }

    // 支持绝对路径引用
    // config.resolve.modules.push(path.resolve('./'));

    return config;
  },
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return `my-build-id-${Date.now()}`;
  },

  // onDemandEntries: {
  //     // period (in ms) where the server will keep pages in the buffer
  //     maxInactiveAge: 25 * 1000,
  //     // number of pages that should be kept simultaneously without being disposed
  //     pagesBufferLength: 2,
  // },

  // exportPathMap: async function (
  //     defaultPathMap,
  //     { dev, dir, outDir, distDir, buildId }
  // ) {
  //     return {
  //         '/': { page: '/' },
  //         '/about': { page: '/about' },
  //         '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
  //         '/p/learn-nextjs': { page: '/post', query: { title: 'learn-nextjs' } },
  //         '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } },
  //     }
  // },
};

module.exports = withPlugins([WITHLESS, WITHCSS], nextOption);
