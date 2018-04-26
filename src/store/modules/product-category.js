import api from '@/utils/api'
const PATH = 'api-product/product/category'
const namespaced = true

const state = {
    all:[]
}

const getters = {
    all: state => state.all,
}

const mutations = {
    setAll(state, payload){
        state.all = payload
    }
}

const actions = {
    async getAll({commit}, request) {  //获得所有品类
        let url = PATH + '/all'
        return api.get(url, request).then(res => {
            commit('setAll', res.data.data)
            return res
        })
    },
}
export default {namespaced, state, getters, mutations, actions}
