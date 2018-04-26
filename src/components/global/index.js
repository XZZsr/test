
export default {
    install(Vue) {
        Vue.component('my-back', require('./back.vue'))
        Vue.component('my-icon', require('./icon.vue'))
        Vue.component('my-index', require('./table-index.vue'))
        Vue.component('my-pagination',require('./pagination.vue'))
        Vue.component('my-search',require('./search.vue'))
        Vue.component('my-reveal',require('./reveal.vue'))
    }
}
