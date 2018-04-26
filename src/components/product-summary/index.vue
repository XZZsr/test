<template>
    <div class="product-summary">
        <el-row>
            <el-card class="box-card">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-card>
        </el-row>
        <el-row>
            <el-card class="box-card">
                <el-row>
                    <el-button size="mini" @click="create">新建商品</el-button>
                    <el-button size="mini" type="success">转投标</el-button>
                    <el-select v-model="value" placeholder="操作" size="mini">
                        <el-option
                            v-for="item in actions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button size="mini">清除勾选</el-button>
                </el-row>
                <el-row>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="全部" name="first"></el-tab-pane>
                        <el-tab-pane label="上线" name="second"></el-tab-pane>
                        <el-tab-pane label="拍卖中" name="third"></el-tab-pane>
                    </el-tabs>
                    <el-table
                        :data="list"
                        stripe
                        style="width: 100%">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column label="序号" width="55">
                            <template slot-scope="scope">
                                <my-index :index="scope.$index"></my-index>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="art_no"
                            label="商品货号">
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div class="product-img">
                                    <img :src="scope.row.media_url" alt="">
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="商品名称">
                        </el-table-column>
                        <el-table-column
                            prop="category_name"
                            label="类型">
                        </el-table-column>
                        <el-table-column
                            prop="updated_at"
                            label="更新时间">
                        </el-table-column>
                        <el-table-column
                            prop="status_text"
                            label="状态">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="text">预览</el-button>
                                <el-button type="text">编辑</el-button>
                                <el-button type="text">生新</el-button>
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
                list: 'productSummary/list',
                meta: 'productSummary/meta',
                actions: 'productSummary/actions',
            }),
        },
        methods:{
            create(){
                this.$router.push({name:'product-summary.create'})
            }
        }
    }
</script>
<style lang="scss">
    .product-summary{
        .product-img{
            img{
                display: block;
                width: 100px;
                height: 100px;
            }
        }
    }
</style>
