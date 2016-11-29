var path = require('path');
var webpack = require('webpack');
var nodeDir = path.resolve(__dirname, 'node_modules');

var config = {
    devtool: 'inline-source-map',
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
            },
            {
                test:/\.(pcss|postcss)$/,
                loader: 'style-loader!css-loader?modules!postcss-loader'
            },
            {
                test:/\.(css)$/,
                loader: 'style-loader!css-loader?modules'
            }
        ],
        preLoaders: [
            {
                test: /\.(js|jsx)?/,
                exclude: [nodeDir],
                loader: 'source-map-loader'
            }
        ],
    },
    externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
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