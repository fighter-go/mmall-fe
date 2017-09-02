/*
* @Author: xue zhenqi
* @Date:   2017-09-02 13:41:53
* @Last Modified by:   xue zhenqi
* @Last Modified time: 2017-09-02 15:12:35
*/
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var templateIndex = require('./index.string');


var page = {
    init : function(){
        this.onLoad();
    },
    onLoad : function(){
        // 侧边导航,激活当前所选菜单项
        navSide.init({
            name : "user-center"
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex,res);
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
};
$(function(){
    page.init();
});