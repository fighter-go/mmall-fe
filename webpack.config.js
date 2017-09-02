/*
* @Author: xue zhenqi
* @Date:   2017-08-25 15:12:42
* @Last Modified by:   xue zhenqi
* @Last Modified time: 2017-09-02 16:24:38
*/
var webpack             = require('webpack');
var ExtractTextPlugin   = require("extract-text-webpack-plugin");
// html文件处理模块儿
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 环境变量配置，dev / online
var WEBPACK_ENV     =   process.env.WEBPACK_ENV||'dev';

// 获取html-webpack-plugin参数的方法,多模板注入方式
var getHtmlConfig = function(name,title){
    return {
        template    : './src/view/'+ name +'.html',
        filename    : 'view/'+ name + '.html',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common',name]
    };
};
// webpack config
var config = {
    entry: {
        'common' : ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'user-login' : ['./src/page/user-login/index.js'],
        'user-register' : ['./src/page/user-register/index.js'],
        'user-pass-reset' : ['./src/page/user-pass-reset/index.js'],
        'user-pass-update' : ['./src/page/user-pass-update/index.js'],
        'user-center' : ['./src/page/user-center/index.js'],
        'user-center-update' : ['./src/page/user-center-update/index.js'],
        'result' : ['./src/page/result/index.js']
    },
    output: {
        path:'./dist',
        publicPath : '/dist',
        filename:'js/[name].js'
    },
    externals : {
        'jquery' : 'window.jQuery'
    },
    module : {
        loaders : [
            {test: /\.css$/,loader:  ExtractTextPlugin.extract("style-loader","css-loader")},
            {test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
            {test: /\.string$/,loader: 'html-loader'}
        ]
    },
    resolve : {
        alias : {
            util    : __dirname + '/src/util',
            page    : __dirname + '/src/page',
            service : __dirname + '/src/service',
            image   : __dirname + '/src/image',
            node_modules   : __dirname + '/node_modules'
        }
    },
    plugins : [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','登陆页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','注册页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','个人信息修改')),
        new HtmlWebpackPlugin(getHtmlConfig('result','结果提示页'))
    ]
};
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;