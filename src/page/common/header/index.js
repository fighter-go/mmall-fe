/*
* @Author: xue zhenqi
* @Date:   2017-08-29 20:57:13
* @Last Modified by:   xue zhenqi
* @Last Modified time: 2017-08-29 22:33:12
*/
require("./index.css");

var _mm = require('util/mm.js');
//通用头部搜索栏
var header = {
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        var keyword = _mm.getUrlParam('keyword');
        if(keyword){
            $('#search-input').val(keyword);
        };
    },
    bindEvent : function(){
        var _this = this;
        // 点击搜索按钮后，做搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        // 按下回车键，做搜索提交
        $('#search-input').keyup(function(e){
            // 13是回车键的keycode
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    //搜索提交
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        // 如果提交的时候有keyword，跳转到list页面
        if(keyword){
            window.location.href = './list.html?keyword='+keyword;
        }
        // 如果提交的时候没有keyword，则返回首页
        else{
            _mm.goHome();
        }
    }
};
header.init();