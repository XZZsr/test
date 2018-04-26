const PATH = 'product-attribute' //路径

export default [

    {
        path: '/' + PATH + '/index',
        name: PATH + '.index',
        component: require('@/components/' + PATH + '/index.vue'),
        meta: {
            title: '属性设置'
        }
    },
]
