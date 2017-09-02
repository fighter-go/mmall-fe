/*
* @Author: xue zhenqi
* @Date:   2017-08-29 17:03:29
* @Last Modified by:   xue zhenqi
* @Last Modified time: 2017-09-02 16:32:57
*/
var _mm = require('util/mm.js');

var _user = {
    login : function(userInfo,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/login.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject,
        });
    },
    // 用户注册
    register : function(userInfo,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/register.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject,
        });
    },
    // 获取用户密码提示问题
    getQuestion : function(username,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/forget_get_question.do'),
            data : {
                username : username
            },
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 检查密码提示问题答案
    checkAnswer : function(userInfo,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/forget_check_answer.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 重置密码
    resetPassword : function(userInfo,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/forget_reset_password.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 获取用户信息
    getUserInfo : function(resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/get_information.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 更新个人信息
    updateUserInfo : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/update_information.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 登录状态下更新密码
    updatePassword : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    logout : function(resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/logout.do'),
            method : 'POST',
            success : resolve,
            error : reject,
        });
    },
    checkUsername : function(username,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/check_valid.do'),
            method : 'POST',
            data : {
                type : 'username',
                str : username
            },
            success : resolve,
            error : reject,
        });
    },
    checkLogin : function(resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/get_user_info.do'),
            method : 'POST',
            success : resolve,
            error : reject,
        });
    },
}

module.exports = _user;