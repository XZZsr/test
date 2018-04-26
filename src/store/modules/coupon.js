import api from '@/utils/api'
const PATH = 'api-activity/admin/coupon'

const namespaced = true

let resetItem = function () {
    return {
        operatorId: 1,
        type: 1,
        name: '',
        amount: '',
        sceneType: 0,
        categoryId: -1,
        userLevel: '',
        consumeStartTime: '',
        consumeEndTime: ''
    }
}

const state = {
    list: [],
    meta: {},
    item: resetItem(),
    users: [],
    usersMeta: {},
}

const getters = {
    list: state => state.list,
    meta: state => state.meta,
    users: state => state.users,
    usersMeta: state => state.usersMeta,
    item: state => state.item,
    userSearch(){
        return [
            {
                label: '昵称',
                type: 'text',
                model: 'nickname',
            },
            {
                label: '手机',
                type: 'text',
                model: 'phoneNum',
            },
            {
                label: '是否使用',
                type: 'select',
                model: 'statuses',
                data: [
                    {
                        id: '0,1,2',
                        name: '全部'
                    },
                    {
                        id: '1',
                        name: '已使用'
                    },
                    {
                        id: '0,2',
                        name: '未使用'
                    },
                ]
            },
        ]
    },
    scene(){
        return [
            {value:0,label: '所有场景'},
            {value:1,label: '拍卖'},
            {value:2,label: '投标'}
        ]
    },
    levels(){
        return [
            {value:0,label: '新人'},
            {value:1,label: 'v1'},
            {value:7,label: 'v1及v1以上'},
            {value:2,label: 'v2'},
            {value:8,label: 'v2及v2以上'},
            {value:3,label: 'v3'},
            {value:9,label: 'v3及v3以上'},
            {value:4,label: 'v4'},
            {value:10,label: 'v4及v4以上'},
            {value:5,label: 'v5'},
            {value:11,label: 'v5及v5以上'},
            {value:6,label: 'v6'},
            {value:12,label: 'v6及v6以上'},
        ]
    },
    // 可领券的用户类别或级别 0-未参与过拍卖或投标的用户 1~6代表用户级别 7-11代表Vx级别及以上
    rules(){
        let judgementNum = (rule,value,callback) => {
            let reg = /^[0-9]+.?[0-9]*$/;
            if(value === ''){
                callback(new Error('请填写现金券金额'))
            }else if(!reg.test(value)){
                callback(new Error('现金券金额必须是数字值'))
            }else{
                callback()
            }
        }
        return {
            name: [
                { required: true,message: '请填写现金券名称', trigger: 'blur'},
                { max: 12, message:'长度不能超过12个字符', trigger: 'blur'}
            ],
            amount: [
                { validator: judgementNum, trigger: 'blur' }
            ],
            consumeStartTime:[
                { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
            ],
            consumeEndTime: [
                { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
            ],
            userLevel: [
                { required: true, message: '请选择用户类型', trigger: 'change' }
            ]
        }
    }
}

const mutations = {
    setList(state, payload){
        state.list = payload
    },
    setMeta(state, payload){
        state.meta = payload
    },
    setItem(state, payload){
        state.item = payload
    },
    resetItem(state){
        state.item = resetItem()
    },
    setUsers(state, payload){
        state.users = payload
    },
    setUsersMeta(state, payload){
        state.usersMeta = payload
    }
}

const actions = {
    async get({commit}, request) {
        let page = request.page || 1
        let url = PATH + '/' + page
        return api.get(url, request).then(res => {
            commit('setList', res.data.data.items)
            let pagination = {
                currentPage: res.data.data.currentPage,
                pageSize: res.data.data.pageSize,
                totalNumber: res.data.data.totalNumber,
                totalPage: res.data.data.totalPage,
            }
            commit('setMeta', pagination)
            return res
        })
    },
    async getUsers({commit}, request) {
        let url = PATH + '/users/' + request.couponId + '?pageSize=' + request.pageSize
        delete request.pageSize
        delete request.page
        delete request.statuses
        return api.post(url, request).then(res => {
            if(!res.data.data){
                commit('setList', [])
                commit('setMeta', {})
                return res
            }
            commit('setUsers', res.data.data.items)
            let pagination = {
                currentPage: res.data.data.currentPage,
                pageSize: res.data.data.pageSize,
                totalNumber: res.data.data.totalNumber,
                totalPage: res.data.data.totalPage,
            }
            commit('setUsersMeta', pagination)
            return res
        })
    },
    async store({commit}, request) {
        return api.put(PATH, request).then(res => {
            return res
        })
    },
}
export default {namespaced, state, getters, mutations, actions}
