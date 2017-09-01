/*
* @Author: xue zhenqi
* @Date:   2017-08-25 21:48:45
* @Last Modified by:   xue zhenqi
* @Last Modified time: 2017-08-31 13:48:37
*/
require('../module.js');
require('./index.css');
require('../common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

// 表单错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide();
    },
};

var page = {
    init : function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        // 登录按钮提交
        $('#submit').click(function(){
            _this.submit();
        });
        // 如果按下回车，也进行提交
        $('.user-content').keyup(function(e){
            // 13是回车键的keyCode
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    // 提交表单
    submit : function(){
        var formData = {
            username : $.trim($('#user-name').val()),
            password : $.trim($('#password').val())
        };
        // 表单验证结果
        var validateResult = this.formValidate(formData);
        // 验证成功
        if(validateResult.status){
            _user.login(formData,function(res){
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            },function(errMsg){
                formError.show(errMsg);
            });
        }
        // 验证失败
        else{
            formError.show(validateResult.msg);
        };

    },
    formValidate : function(a){
        var result = {
            status : false,
            mag : ''
        };
        if(!_mm.validate(a.username,'require')){
            result.msg = '用户名不能为空';
            return result;
        };
        if(!_mm.validate(a.password,'require')){
            result.msg = '密码不能为空';
            return result;
        };
        // 验证通过，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
});