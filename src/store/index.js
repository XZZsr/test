import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common'  //主要放些通用的样式
import productAttribute from './modules/product-attribute'
import productSummary from './modules/product-summary'
import productCategory from './modules/product-category'
import coupon from './modules/coupon'
import sysProp from './modules/sysProp'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        common,
        productAttribute,
        productSummary,
        productCategory,
        coupon,
        sysProp
    }
})
