<template>
    <div>{{number}}</div>
</template>

<script>
    export default {
        props: {
            index: {
                default: 0
            },
            page: {
                default: 0
            },
            limit: {
                default: 15
            },
        },
        computed: {
            number() {
                let page = this.page || this.$route.query.page || 1
                return (page - 1) * this.limit + this.index + 1
            }
        },
    }
</script>