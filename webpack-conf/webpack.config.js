const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all' // оптимизирует подключение стороних либ и подключает через вендоры
        }
    }
    if (isProd) {
        config.minimizer = [ // минимизирует и оптимизирует прод файлы
            new OptimizeCssAssetsPlugin(), 
            new TerserPlugin()
        ]
    }
    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssloaders = extra => {
    const loaders = [{
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,  //позволяет обновлять некоторые сущности без перезагрузки страницы 
                reloadAll: true //
            },
        }, 
        'css-loader'
    ]
    
    if(extra) {
        loaders.push(extra)
    }

    return loaders
}

const babelOptions = preset => {
    const opt = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if(preset) {
        opt.presets.push(preset)
    }

    return opt
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill','./index.jsx'],
        analytics: './analytics.ts',
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.png'],//позволяет е дописывать форматы в импортах
        alias: {
            '@models': path.resolve(__dirname, 'src/models')
        }
    },
    devtool: isDev ? 'source-map' : '',
    optimization: optimization(),
    devServer: {
        port: 4200, // позволяет автомочитески перезагружать открытое окно на 4200 порте
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({ // создаёт html файл с подключёнными импортами
            template: './index.html',
            minify: {
                collapseWhitespace: isProd //минифицирует  когда собираем в прод
            }
        }),
        new CleanWebpackPlugin(), // чистит старые сборки
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css') //создаёт файл цсс в дист
        })
    ],
    module: {
        rules: [
            {   test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader' ,
                    options: babelOptions()
                }    
            },
            {   
                test: /\.ts$/,//Для работы с тс
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader' ,
                    options: babelOptions('@babel/preset-typescript')
                }
            },
            {   
                test: /\.jsx$/,//Для работы с react
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader' ,
                    options: babelOptions('@babel/preset-react')
                }
            },
            {
                test: /\.css$/,
                use: cssloaders()
            },
            {
                test: /\.less$/,
                use: cssloaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssloaders('sass-loader')
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|eot|woff2)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },

        ]
    }
        
}