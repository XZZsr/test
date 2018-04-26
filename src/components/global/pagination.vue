<template>
    <div class="pager">
        <el-pagination v-if="undefined !== pagination && pagination.totalNumber > 0"
            layout="prev, pager, next,jumper"
            :page-size="pagination.pageSize"
            :total="pagination.totalNumber"
            :current-page="pagination.currentPage"
            @current-change="changePage"
            @size-change="handleSizeChange">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        props: {
            pagination: {
                type: Object,
            },
            changeQuery: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            changePage(page){
                this.$emit('change', page)
                if (this.$store.getters['utils/searching']) {
                    this.$store.commit('utils/setSearching', false)
                    return
                }
                if (this.changeQuery) {
                    let path = this.$route.path
                    let query = Object.assign({}, this.$route.query, {page})
                    this.$router.push({path, query})
                }
            },
            handleSizeChange(pageSize){
                let path = this.$route.path
                let query = Object.assign({}, this.$route.query, {pageSize})
                this.$router.push({path, query})
            }
        }
    }
</script>
<style>
    .pager{
        text-align: right;
    }
</style>
