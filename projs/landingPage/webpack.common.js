const //webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, './src/js/app.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/front.[name].[contenthash].js',
        // publicPath: 'dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/i
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // Images larger than 10 KB won’t be inlined
                            //   limit: 10 * 1024,
                            //   fallback: 'file-loader',
                            name: '[name].[ext]',
                            // publicPath: 'dist/img',
                            outputPath: 'assets/img/',
                            esModule: false,
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            // Specify enforce: 'pre' to apply the loader
                            // before url-loader/svg-url-loader
                            // and not duplicate it in rules with them
                            enforce: 'pre',
                            bypassOnDebug: process.env.NODE_ENV === 'development' ? true : false, // no processing is done when webpack 'debug' mode is used and the loader acts as a regular file-loader
                            disable: process.env.NODE_ENV === 'development' ? true : false, // Same functionality as bypassOnDebug option, but doesn't depend on webpack debug mode, which was deprecated in 2.x. use this option if you're running webpack@2.x or newer.
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            //optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: true,
                                //   optimizationLevel:7
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: true,
                                optimizationLevel: 3
                            },
                            svgo: {
                                plugins: [
                                    { removeViewBox: false },
                                    { convertStyleToAttrs: false },
                                    // {removeUselessStrokeAndFill: false},
                                    { minifyStyles: false },
                                    // {removeUselessDefs: false},
                                    { inlineStyles: false }
                                ]
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ],
                exclude: [
                    /^.*(android|apple|favicon|safari|tile|mstile).*$|^(fa-*.*\d?\.svg)$/i,
                    path.resolve(__dirname, './src/style/fonts'),
                    /font/,
                    /fonts/,
                    /webfonts/
                ]
            },
            {
                test: /(\.(ico|txt|xml|htaccess|webmanifest)?$|^.*(android|apple|favicon|safari|tile|mstile).*$)/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: 'dist/',
                        // outputPath: 'dist/'
                    },
                }],
                exclude: /node_modules/i
            }
        ]
    },
    resolve: {
        alias: {
            _: path.resolve(__dirname, 'src/'),
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'kohawayosa',
            filename: 'index.html',
            template: './src/public/index.html',
            minify: {
                collapseWhitespace: false,
                // conservativeCollapse:true,
                collapseInlineTagWhitespace: false,
                // preserveLineBreaks:true,
                caseSensitive: true,
            },
            hash: true,
            // favicon: path.resolve(__dirname,'./src/assets/img/icon.png'),
            meta: {
                description: 'kohawayosa Landing Page',
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                keywords: 'kohawayosa, Landing Page',
                author: 'Ahmed Salah',
                'application-name': 'kohawayosa', //Name of web app (only should be used if the website is used as an app)
                'theme-color': '#f3eaea', //Theme Color for Chrome, Firefox OS and Opera
                robots: 'index,follow', //All search engine crawling and indexing
            },
            chunks: ['app'],
            // excludeChunks: ['contact'],
        }),
        new HtmlWebpackPlugin({
            title: '404',
            filename: '404.html',
            template: './src/public/404.html',
            minify: {
                collapseWhitespace: true,
                // conservativeCollapse:true,
                collapseInlineTagWhitespace: true,
                // preserveLineBreaks:true,
                caseSensitive: true,
            },
            hash: true,
            // favicon: path.resolve(__dirname,'./src/assets/img/icon.png'),
            meta: {
                description: 'kohawayosa Landing Page',
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                keywords: 'kohawayosa, landing page',
                author: 'Ahmed Salah',
                'application-name': 'kohawayosa', //Name of web app (only should be used if the website is used as an app)
                'theme-color': '#4285f4', //Theme Color for Chrome, Firefox OS and Opera
                robots: 'index,follow', //All search engine crawling and indexing
            },
            chunks: ['']
        }),

    ],
};