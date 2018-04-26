const PATH = 'coupon' //路径

export default [
    {
        path: '/' + PATH + '/index',
        name: PATH + '.index',
        component: require('@/components/' + PATH + '/index.vue'),
        meta: {
            title: '优惠券列表'
        }
    },
    {
        path: '/' + PATH + '/create',
        name: PATH + '.create',
        component: require('@/components/' + PATH + '/create.vue'),
        meta: {
            title: '新建优惠券'
        }
    },
    {
        path: '/' + PATH + '/users',
        name: PATH + '.users',
        component: require('@/components/' + PATH + '/users.vue'),
        meta: {
            title: '参与者列表'
        }
    },
]
