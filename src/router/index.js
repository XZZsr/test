import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'

import others from './modules/others'
import demo from './modules/demo'
import productAttribute from './modules/product-attribute'
import productSummary from './modules/product-summary'
import productCategory from './modules/product-category'
import coupon from './modules/coupon'
import sysProp from './modules/sys-prop'

Vue.use(Router)

let arr = [
    ...demo,
    ...others,
    ...productAttribute,
    ...productSummary,
    ...productCategory,
    ...coupon,
    ...sysProp,
]

let children = []  //是base.vue即页面布局main的路由

for (let i in arr) {
    children.push(arr[i])
}
let routes = [   //最外层的route
    {
        path: '/',
        name: 'index',
        component: require('@/components/layout/base.vue'),
        children
    }
]
const router = new Router({routes})

router.beforeEach((to, from, next) => {  //路由钩子，
    if(to.matched.length === 0){  //链接匹配不到组件跳到404页面
        next('/common/404');
        return false
    }
    window.scrollTo(0, 0)  //跳转新路由 回到顶部
    document.title = undefined === to.meta.title ? '默认信息' : to.meta.title  //如果meta有title信息则设置title
    next()
})

export default router
