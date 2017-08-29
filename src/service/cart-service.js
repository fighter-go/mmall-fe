/*
* @Author: xue zhenqi
* @Date:   2017-08-29 17:23:49
* @Last Modified by:   xue zhenqi
* @Last Modified time: 2017-08-29 17:32:26
*/
var _mm = require('util/mm.js');

var _cart = {
    // 获取购物车数量
    getCartCount : function(resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/cart/get_cart-product_count.do'),
            success : resolve,
            error : reject,
        });
    },
};

module.exports = _cart;