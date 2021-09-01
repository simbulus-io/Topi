// Need this for VSCode debugging
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let widget_name = 'avtest'
// DEBUG
const debug = process.env.DEBUG ? true : false
console.log(`DEBUG is ${debug}`)
// PROXY
const user = process.env.USER
if (user === 'skelly') {
  proxy = '10.0.10.144';
} else if (user === 'milne') {
  proxy = '10.0.10.143';
} else if (user === 'jward') {
  proxy = '10.0.10.145';
} else if (user === 'aholt') {
  proxy = '10.0.10.140';
} else if (user === 'apollock') {
  proxy = '10.0.10.144';
} else if (user === 'btroxel') {
  proxy = '10.0.11.46';
} else if (user === 'james') {
  proxy = '10.0.11.44';
} else {
  proxy = '10.0.10.141';
}
console.log(`PROXY is ${proxy} for user ${user}`)

module.exports = {
  //publicPath: 'vue_avtest',
  devServer: {
    allowedHosts: [
      '.ngrok.io'
    ],
    proxy: {
      '^/(auth/)?ts_node': {
        target: 'http://localhost:5101',
        // This rewrite is necessary for local (non VM proxy)
        // no varnish means no stripping of the auth leg
        pathRewrite: {
          '/auth/ts_node': '/ts_node'
        },
      },
      // '^/(auth/)?wm_api': {
      //   target: 'http://localhost:4006',
      //   // This rewrite is necessary for local (non VM proxy)
      //   // no varnish means no stripping of the auth leg
      //   pathRewrite: {
      //     '/auth/wm_api': '/wm_api'
      //   },
      // },
      '^/logout': {
        target: `http://${proxy}`
      },
      '^/bi': {
        target: `http://${proxy}`
      },
      '^/homework-app': {
        target: `http://${proxy}`
      },
      '^/(auth/)?woot_roster': {
        target: `http://${proxy}`
      },
      '^/(auth/)?wm_api': {
        target: `http://${proxy}`
      },
      '^/(auth/)?wm_web': {
        target: `http://${proxy}`
      },
      '^/(auth/)?wm_node': {
        target: `http://${proxy}`
      },
      '^/auth/login': {
        target: `http://${proxy}`
      },
      '^/auth/teacher/login': {
        target: `http://${proxy}`
      },
      '^/static/libs': {
        target: `http://${proxy}`
      },
      '^/dds': {
        target: `http://${proxy}`
      },
      '^/mktg': {
        target: `http://${proxy}`
      },
      '^/(auth/)?teacher/*': {
        target: `http://${proxy}`
      }
    }
  },
  productionSourceMap: false,
  css: {
    extract: false // bundle the CSS with JS and apply dynamically
  },
  configureWebpack: {
    devtool: debug ? 'source-map' : undefined,
    // Uncomment to run the bundle analyzer
    // plugins: [new BundleAnalyzerPlugin()],
    optimization: {
      minimize: !debug,
      splitChunks: false,
    },
    output: {
      filename: `${widget_name}.js`,
      chunkFilename: `vue_avtest/${widget_name}.chunk.js`
    },
    module: {
      rules: [
        {
          exclude: /hxclasses_es6\.js/
        }
      ]
    }
  },
  chainWebpack: config => {
    //config.optimization.delete('splitChunks')
    if (config.plugins.has("extract-css")) {
      const extractCSSPlugin = config.plugin("extract-css");
      extractCSSPlugin &&
        extractCSSPlugin.tap(() => [
          {
            filename: `${widget_name}.css`
          }
        ]);
    }
  },
}
