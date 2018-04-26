const PATH = 'product-category' //路径

export default [

    {
        path: '/' + PATH + '/index',
        name: PATH + '.index',
        component: require('@/components/' + PATH + '/index.vue'),
        meta: {
            title: '商品分类'
        }
    }
]
