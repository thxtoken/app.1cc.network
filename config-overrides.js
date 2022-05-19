const {
  override,
  addWebpackAlias,
  addWebpackResolve,
  addWebpackPlugin,
  setWebpackStats,
  setWebpackOptimizationSplitChunks
} = require('customize-cra')

const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { getThemeVariables } = require('antd/dist/theme')
const path = require('path')
const addLessLoader = require('customize-cra-less-loader')

const analyzerMode = process.env.BUNDLE_ANALYZER_MODE || 'disabled'
const splitChunks = process.env.OPTIMIZATION_SPLIT_CHUNKS || false
const splitChunksConfig = {
  cacheGroups: {
    commons: {
      test: /[\\/]node_modules[\\/]/,
      name: 'vendors',
      chunks: 'all',
      reuseExistingChunk: true
    }
  }
}

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    'bn.js': path.resolve(process.cwd(), 'node_modules', 'bn.js')
  }),
  addWebpackResolve({
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify'),
      url: require.resolve('url'),
      buffer: require.resolve('buffer')
    }
  }),
  addLessLoader({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: getThemeVariables({
          dark: true,
          compact: true
        })
      }
    }
  }),
  addWebpackPlugin(new BundleAnalyzerPlugin({ analyzerMode })),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ),
  addWebpackPlugin(
    new webpack.IgnorePlugin({
      resourceRegExp: /genesisStates\/[a-z]*\.json$/,
      contextRegExp: /@ethereumjs\/common/
    })
  ),
  setWebpackOptimizationSplitChunks(splitChunks ? splitChunksConfig : {}),
  setWebpackStats({
    warningsFilter: [
      /Failed to parse source map/,
      /Warning: findDOMNode is deprecated in StrictMode/
    ]
  })
)
