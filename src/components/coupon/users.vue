<template>
    <div class="coupon-users">
        <el-row>
            <el-card class="box-card">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/coupon/index' }">优惠券管理</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/coupon/index' }">优惠券列表</el-breadcrumb-item>
                    <el-breadcrumb-item>参与者列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-card>
        </el-row>
        <el-row>
            <el-card class="box-card">
                <my-search v-if="undefined!==search" :data="search"></my-search>
            </el-card>
        </el-row>
        <el-row>
            <el-card class="box-card">
                <el-row>
                    <el-table
                        :data="list"
                        stripe
                        border
                        style="width: 100%">
                        <el-table-column label="序号" width="55">
                            <template slot-scope="scope">
                                <my-index :index="scope.$index"></my-index>
                            </template>
                        </el-table-column>
                        <el-table-column label="头像">
                            <template slot-scope="scope">
                                <div class="product-img" :style="thumbStyle(scope.row.avatarUrl)">
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="nickname"
                            label="昵称">
                            <template slot-scope="scope">
                                <my-reveal :data="scope.row.nickname"></my-reveal>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            label="手机号">
                            <template slot-scope="scope">
                                <my-reveal :data="scope.row.nickname"></my-reveal>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            label="是否使用">
                            <template slot-scope="scope">
                                {{conver(statuses,scope.row.status)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="productName"
                            label="商品名称">
                            <template slot-scope="scope">
                                <my-reveal :data="scope.row.nickname"></my-reveal>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="transactionPrice"
                            label="成交价">
                            <template slot-scope="scope">
                                <my-reveal :data="scope.row.nickname"></my-reveal>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="sceneType"
                            label="类型">
                            <template slot-scope="scope">
                                {{conver(scene,scope.row.sceneType)}}
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
                <el-row>
                    <my-pagination :pagination="meta"></my-pagination>
                </el-row>
            </el-card>
        </el-row>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        computed:{
            ...mapGetters({
                list: 'coupon/users',
                meta: 'coupon/usersMeta',
                search: 'coupon/userSearch',
                scene: 'coupon/scene'
            }),
        },
        data(){
            return {
                statuses: [
                    {value: 0,label: '可用'},
                    {value: 1,label: '不可用'},
                    {value: 2,label: '已过期'},
                    {value: 3,label: '已作废'},
                ],
                // 使用场景限制 0:表示所有场景 1:拍卖 2:投标
            }
        },
        methods:{
            get(){
                let query = Object.assign({},this.$route.query)
                query.pageSize = query.pageSize || 10
                if(query.statuses){
                    query.statusList = query.statuses.split(',')
                }else{
                    query.statusList = ['0','1','2']
                }
                query.page = query.page || 1
                query.nickname = query.nickname || ''
                query.phoneNum = query.phoneNum || ''
                this.$store.dispatch('coupon/getUsers',query)
            },
            thumbStyle(avatarUrl, index = 0) {
                let url = avatarUrl?avatarUrl:'./static/icon/default_photo.png'
                return {
                    backgroundImage: 'url(' + url + ')'
                }
            },
            conver(arr,value){
                let obj = arr.find(item=>item.value==value) || {label: '--'}
                return obj.label
            },
        },
        created(){
            this.get()
        },
        watch:{
            $route(){
                this.get()
            }
        }
    }
</script>
<style lang="scss">
    .coupon-users{
        .product-img{
            width: 40px;
            height: 40px;
            border-radius: 40px;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
        }
    }
</style>
