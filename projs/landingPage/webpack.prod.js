const { merge } = require('webpack-merge'),
    common = require('./webpack.common.js'),
    path = require('path'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: 'production',
    // devtool: '#source-map',
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?url=false',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot)(?=\?[A-Za-z0-9])?$|\.svg$/i, //(\?v=\d+\.\d+\.\d+)?
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        // publicPath: 'dist',
                        outputPath: 'style/fonts/',
                        // esModule: false
                    }
                }],
                exclude: [
                    /^.*(android|apple|favicon|safari|tile|mstile).*$/i,
                    path.resolve(__dirname, './src/assets/img')
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'style/front.[name].[contenthash].css',
            chunkFilename: 'style/front.[id].[contenthash].css',
        }),
    ],
});