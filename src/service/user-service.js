/*
* @Author: xue zhenqi
* @Date:   2017-08-29 17:03:29
* @Last Modified by:   xue zhenqi
* @Last Modified time: 2017-08-29 17:20:08
*/
var _mm = require('util/mm.js');

var _user = {
    logout : function(resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/logout.do'),
            method : 'POST',
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