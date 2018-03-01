let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = (process.env.NODE_ENV === 'production');

module.exports = {
    entry: {
        'js/main.min.js': './js/main.js',
        'css/main.min.css': './sass/main.scss'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name]'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract([
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: isProduction
                        }
                    }, 'sass-loader']),
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name]'
        })
    ]
}

if (isProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({})
    );
}
