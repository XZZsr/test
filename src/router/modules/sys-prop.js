const PATH = 'sys-prop' //路径

export default [
    {
        path: '/' + PATH + '/index',
        name: PATH + '.index',
        component: require('@/components/' + PATH + '/index.vue'),
        meta: {
            title: '分享红包链接图'
        }
    }
]
