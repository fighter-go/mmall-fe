/*
* @Author: xue zhenqi
* @Date:   2017-08-25 15:12:42
* @Last Modified by:   xue zhenqi
* @Last Modified time: 2017-08-25 22:54:38
*/
var webpack             = require('webpack');
var ExtractTextPlugin   = require("extract-text-webpack-plugin");
var config = {
    entry: {
        'common' : ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],
    },
    output: {
        path:'./dist',
        filename:'js/[name].js'
    },
    externals : {
        'jquery' : 'window.jQuery'
    },
    module : {
        loaders : [
            {test: /\.css$/,loader:  ExtractTextPlugin.extract("style-loader","css-loader")}
        ]
    },
    plugins : [
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        new ExtractTextPlugin("css/[name].css")
    ]
};

module.exports = config;