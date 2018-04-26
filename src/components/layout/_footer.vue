<template>
    <div class="base-footer">
        <div class="footer-content">技术支持:翠佛堂</div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export  default{
        computed: mapGetters({ //获取vuex的getter

        }),
        data(){
            return{

            }
        },
        methods: {

        }
    }
</script>
<style lang="scss">
    .base-footer{
        display: table;
        width: 100%;
        height: 100%;
        color: #fff;
        text-align: center;

        .footer-content{
            display: table-cell;
            vertical-align: middle;
        }
    }
</style>
