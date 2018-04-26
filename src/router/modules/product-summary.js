const PATH = 'product-summary' //路径

export default [
    {
        path: '/' + PATH + '/index',
        name: PATH + '.index',
        component: require('@/components/' + PATH + '/index.vue'),
        meta: {
            title: '商品列表'
        }
    },
    {
        path: '/' + PATH + '/create',
        name: PATH + '.create',
        component: require('@/components/' + PATH + '/create.vue'),
        meta: {
            title: '新建商品'
        }
    }
]
