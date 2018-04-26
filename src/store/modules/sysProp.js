import api from '@/utils/api'
const PATH = '/api-activity/sysProp'

const namespaced = true

const state = {

}

const getters = {

}

const mutations = {
}

const actions = {
    async setProp({commit}, request) {  //系统设置属性
        let url = PATH + '?operatorId=' + request.operatorId
        delete request.operatorId
        let array = request.propReqs
        return api.post(url, array).then(res => {
            return res
        })
    },
    async getProp({commit}, request) {  //获取系统属性
        let url = PATH + '/info?operatorId=' + request.operatorId
        delete request.operatorId
        let array = request.propKeys
        return api.post(url, array).then(res => {
            return res
        })
    },
}
export default {namespaced, state, getters, mutations, actions}
