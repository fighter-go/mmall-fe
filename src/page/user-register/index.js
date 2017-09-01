/*
* @Author: xue zhenqi
* @Date:   2017-08-31 13:49:24
* @Last Modified by:   xue zhenqi
* @Last Modified time: 2017-08-31 19:53:19
*/
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
        // 验证username
        $('#user-name').blur(function(){
            var username = $.trim($(this).val());
            // 如果用户名为空，不做验证
            if(!username){
                return;
            };
            // 异步验证用户名是否存在
            _user.checkUsername(username,function(res){
                formError.hide();
            },function(errMsg){
                formError.show(errMsg);
            });
        });

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
            password : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
            phone : $.trim($('#phone').val()),
            email : $.trim($('#email').val()),
            question : $.trim($('#question').val()),
            answer : $.trim($('#answer').val())
        };
        // 表单验证结果
        var validateResult = this.formValidate(formData);
        // 验证成功
        if(validateResult.status){
            _user.register(formData,function(res){
                window.location.href = './result.html?type=register';
            },function(errMsg){
                formError.show(errMsg);
            });
        }
        // 验证失败
        else{
            formError.show(validateResult.msg);
        };

    },
    formValidate : function(formData){
        var result = {
            status : false,
            mag : ''
        };
       
        if(!_mm.validate(formData.username,'require')){
            result.msg = '用户名不能为空';
            return result;
        };
        if(!_mm.validate(formData.password,'require')){
            result.msg = '密码不能为空';
            return result;
        };
        // 密码不能少于6位
        if(formData.password.length < 6){
            result.msg = '密码不能少于6位';
            return result;
        };
        // 验证两次密码输入是否一致
        if(formData.password != formData.passwordConfirm){
            result.msg = '两次输入密码不一致';
            return result;
        };
        // 验证手机格式
        if(!_mm.validate(formData.phone,'phone')){
            result.msg = '手机号码格式不正确';
            return result;
        };
        // 验证邮箱格式
        if(!_mm.validate(formData.email,'email')){
            result.msg = '邮箱格式不正确';
            return result;
        };
        // 安全问题不能为空
        if(!_mm.validate(formData.question,'require')){
            result.msg = '安全问题不能为空';
            return result;
        };
        // 答案不能为空
        if(!_mm.validate(formData.answer,'require')){
            result.msg = '安全问题答案不能为空';
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