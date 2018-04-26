<template>
    <div class="coupon-index">
        <el-row>
            <el-card class="box-card">
                <el-row>
                    <el-col :span="12">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item :to="{ path: '/coupon/index' }">优惠券管理</el-breadcrumb-item>
                            <el-breadcrumb-item>优惠券列表</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                </el-row>
            </el-card>
        </el-row>
        <el-row>
            <el-card class="box-card">
                <el-row>
                    <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
                        <!--<el-tab-pane label="全部" name="first"></el-tab-pane>-->
                        <!--<el-tab-pane label="上线" name="second"></el-tab-pane>-->
                        <!--<el-tab-pane label="拍卖中" name="third"></el-tab-pane>-->
                    <!--</el-tabs>-->
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
                        <el-table-column
                            prop="name"
                            label="名称">
                        </el-table-column>
                        <el-table-column
                            prop="amount"
                            label="金额">
                        </el-table-column>
                        <el-table-column
                            label="使用范围">
                            <template slot-scope="scope">
                                {{conver(scene,scope.row.sceneType)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="catetoryDesc"
                            label="使用品类">
                        </el-table-column>
                        <el-table-column
                            label="用户类型">
                            <template slot-scope="scope">
                                {{conver(levels,scope.row.userLevel)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="有效时间"
                            width="200px">
                            <template slot-scope="scope">
                                {{converDate(scope.row.consumeStartTime)}}至{{converDate(scope.row.consumeEndTime)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="numOfGot"
                            label="领取人数">
                        </el-table-column>
                        <el-table-column
                            prop="numOfUsed"
                            label="使用人数">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="linkUser(scope.row.id)">参与</el-button>
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
    import moment from 'moment'
    export default {
        computed:{
            ...mapGetters({
                list: 'coupon/list',
                meta: 'coupon/meta',
                scene: 'coupon/scene',
                levels: 'coupon/levels',
            }),
        },
        methods:{
            get(){
                this.$store.dispatch('coupon/get',this.$route.query)
            },
            linkUser(couponId){
                this.$router.push({name: 'coupon.users',query:{couponId}})
            },
            conver(arr,value){
               let obj = arr.find(item=>item.value==value) || {label: '--'}
               return obj.label
            },
            converDate(str){
                return moment(str).format('YYYY-MM-DD')
            }
        },
        mounted(){
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
    .coupon-index{
        .product-img{
            img{
                display: block;
                width: 100px;
                height: 100px;
            }
        }
    }
</style>
