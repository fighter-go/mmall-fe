/*
* @Author: xue zhenqi
* @Date:   2017-08-31 20:58:08
* @Last Modified by:   xue zhenqi
* @Last Modified time: 2017-09-02 00:13:04
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
    data : {
        username : '',
        question : '',
        answer : '',
        token : ''
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadStepUsername();
    },
    bindEvent : function(){
        var _this = this;
        // 输入用户名后下一步按钮的点击
        $('#submit-username').click(function(){
            var username = $.trim($('#user-name').val());
            // 如果用户名不为空
            if(username){
                _user.getQuestion(username,function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 如果用户名不为空
            else{
                formError.show('请输入用户名');
            }
        });
        // 输入密码提示问题答案后下一步按钮的点击
        $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            // 如果密码提示问题答案不为空
            if(answer){
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer : answer
                },function(res){
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 如果密码提示问题答案为空
            else{
                formError.show('请输入问题答案');
            }
        });
        // 新密码提交
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            // 如果新密码不为空
            if(password && password.length >= 6){
                _user.resetPassword({
                    username : _this.data.username,
                    passwordNew : password,
                    forgetToken : _this.data.token
                },function(res){
                    window.location.href = './result.html?type=pass-reset';
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 如果新密码为空
            else{
                formError.show('请输入不少于6位的新密码');
            }
        });
    },
    // 加载输入用户名的一步
    loadStepUsername :function(){
        $('.step-username').show();
    },
    // 加载输入密码提示问题的部分
    loadStepQuestion :function(){
        // 清除错误提示问题
        formError.hide();
        // 隐藏第一步，显示第二步
        $('.step-username').hide();
        $('.step-question').show();
        // 获取密码提示问题
        $('.step-question').find('.question').text(this.data.question);
    },
    // 加载最后一步，重置密码
    loadStepPassword : function(){
        // 清除错误提示问题
        formError.hide();
        // 隐藏第二步，显示第三步
        $('.step-question').hide().siblings('.step-password').show();
    }
};
$(function(){
    page.init();
});