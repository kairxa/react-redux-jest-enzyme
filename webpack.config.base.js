var path = require('path');
var webpack = require('webpack');
var nodeDir = path.resolve(__dirname, 'node_modules');

var config = {
    entry: {
        kk: path.resolve(__dirname, 'build/kreasikamu.jsx'),
        vendors: [
          'react',
          'react-dom',
          'react-redux',
          'react-router',
          'react-router-redux',
          'redux'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist/assets/javascripts'),
        filename: '[name].js',
        publicPath: '/assets/javascripts/'
    },
    module: {
        loaders: [
            {
                test: /\.(jsx|js)$/,
                exclude: /(node_modules)/,
                loader: 'babel?presets[]=es2015'
            },
            {
                test: /\.(jpg|png)$/i,
                loader: 'file?name=[sha512:hash:base64:7].[ext]'
            },
            {
                test: /\.(svg)$/,
                loader: 'babel!svg-react'
            },
            {
                test: /\.(json)$/,
                loader: 'json-loader'
            }
        ],
        preLoaders: [
            {
                test: /\.(js|jsx)?/,
                exclude: [nodeDir],
                loader: 'source-map-loader'
            }
        ]
    },
    postcss: function (webpack) {
        return [
            require("postcss-import")({ addDependencyTo: webpack }),
            require("postcss-url")(),
            require("postcss-cssnext")(),
            require("postcss-browser-reporter")(),
        ]
    },
    plugins: [],
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".jsx", ".js"],
        modulesDirectories: ['web_modules', 'node_modules', 'build']
    }
};

module.exports = config;