/*
* @Author: xue zhenqi
* @Date:   2017-08-30 14:21:21
* @Last Modified by:   xue zhenqi
* @Last Modified time: 2017-08-30 14:47:10
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type        = _mm.getUrlParam('type') || 'default'
    var $element    = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
})