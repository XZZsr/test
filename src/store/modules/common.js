import api from '@/utils/api'
const namespaced = true

const state = {
    sliderToggle: false,
    qiniuToken: ''
}

const getters = {
    sliderToggle: state => state.sliderToggle,
    qiniuToken: state => state.qiniuToken
}

const mutations = {
    setToggle(state){
        state.sliderToggle = !state.sliderToggle
    },
    setQiniuToken(state, payload){
        state.qiniuToken = payload
    }
}

const actions = {
    async getQiniuToken({commit}, request) {  //获取七牛云token。随机域名->周灵敏
        let url = '/api-product/qiniu/uploadToken/' + request.operatorId
        return api.get(url, request).then(res => {
            commit('setQiniuToken',res.data.data)
            return res
        })
    },
}
export default {namespaced, state, getters, mutations, actions}
