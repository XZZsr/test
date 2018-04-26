import api from '@/utils/api'
const PATH = 'product-summary'

const namespaced = true

const state = {
    list: [
        {id:1,art_no:"WSK1801114-16",media_url:'https://img.cft.upmi.com.cn/o_1c9go4l8oev91r63gso1epg16bsc.jpg',name:'18K金和田玉吊坠',category_id:'1',category_name: "18K金镶嵌和田玉",updated_at:'2018-03-27 13:43:21',status:'1', status_text: '拍卖中'},
        {id:2,art_no:"WSK1801114-16",media_url:'https://img.cft.upmi.com.cn/o_1c9go4l8oev91r63gso1epg16bsc.jpg',name:'18K金和田玉吊坠',category_id:'1',category_name: "18K金镶嵌和田玉",updated_at:'2018-03-27 13:43:21',status:'1', status_text: '拍卖中'},
        {id:3,art_no:"WSK1801114-16",media_url:'https://img.cft.upmi.com.cn/o_1c9go4l8oev91r63gso1epg16bsc.jpg',name:'18K金和田玉吊坠',category_id:'1',category_name: "18K金镶嵌和田玉",updated_at:'2018-03-27 13:43:21',status:'1', status_text: '拍卖中'},
        {id:4,art_no:"WSK1801114-16",media_url:'https://img.cft.upmi.com.cn/o_1c9go4l8oev91r63gso1epg16bsc.jpg',name:'18K金和田玉吊坠',category_id:'1',category_name: "18K金镶嵌和田玉",updated_at:'2018-03-27 13:43:21',status:'1', status_text: '拍卖中'},
        {id:5,art_no:"WSK1801114-16",media_url:'https://img.cft.upmi.com.cn/o_1c9go4l8oev91r63gso1epg16bsc.jpg',name:'18K金和田玉吊坠',category_id:'1',category_name: "18K金镶嵌和田玉",updated_at:'2018-03-27 13:43:21',status:'1', status_text: '拍卖中'}
    ],
    meta: {
        per_page: 15,
        total: 20,
        current_page: 1
    }
}

const getters = {
    list: state => state.list,
    meta: state => state.meta,
    actions(){
        return [
            {value:1,label: '可用（或上线）'},
            {value:2,label: '下架'},
            {value:2,label: '删除'}
        ]
    }
}

const mutations = {
    setList(state, payload){
        state.list = payload
    },
    setMeta(state, payload){
        state.meta = payload
    }
}

const actions = {

}
export default {namespaced, state, getters, mutations, actions}
