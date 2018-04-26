<template>
    <div class="base-slider" :class="{active:sliderToggle}">
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo"
                 :collapse="collapseStatus"
                  @select="handleSelect"
                 background-color="transparent"
                 text-color="#fff"
                 active-text-color="#ffd04b">
            <!--<el-submenu index="demo.demo1">-->
                <!--<template slot="title">-->
                    <!--<i class="el-icon-goods"></i>-->
                    <!--<span slot="title">商品管理</span>-->
                <!--</template>-->
                <!--<el-menu-item-group>-->
                    <!--<el-menu-item index="product-summary.index">商品列表</el-menu-item>-->
                    <!--&lt;!&ndash;<el-menu-item index="product-summary.create">新建商品</el-menu-item>&ndash;&gt;-->
                    <!--<el-menu-item index="product-category.index">商品分类</el-menu-item>-->
                    <!--<el-menu-item index="product-attribute.index">属性设置</el-menu-item>-->
                <!--</el-menu-item-group>-->
            <!--</el-submenu>-->
            <!--<el-submenu index="1">-->
                <!--<template slot="title">-->
                    <!--<i class="el-icon-location"></i>-->
                    <!--<span slot="title">通用页面</span>-->
                <!--</template>-->
                <!--<el-menu-item-group>-->
                    <!--<el-menu-item index="others.404">404</el-menu-item>-->
                    <!--<el-menu-item index="others.500">500</el-menu-item>-->
                <!--</el-menu-item-group>-->
            <!--</el-submenu>-->
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-tickets"></i>
                    <span slot="title">优惠券管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="coupon.index">优惠券列表</el-menu-item>
                    <el-menu-item index="coupon.create">新建优惠券</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">其他管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="sys-prop.index">分享红包链接图</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export  default{
        computed: {
            ...mapGetters({ //获取vuex的getter
                sliderToggle: 'common/sliderToggle'
            }),
            defaultActive(){
                return this.$route.name
            }
        },
        data(){
            return{
                collapseStatus: false,
            }
        },
        methods: {
            changeCollapse(val){
                this.collapseStatus = val
            },
            handleSelect(key){
                this.$router.push({name:key})
            }
        }
    }
</script>
<style lang="scss">
    .base-slider{
        .el-menu{
            border-right: none;
        }
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 200px;
        }
        .collapse{
            line-height: 56px;
            text-align: center;
        }
        .el-menu-item-group__title{
            display: none;
        }
    }

    @media screen and (max-width: 768px) {
        .base-slider{
            position: absolute;
            left: -100%;
            transition: all 0.6s;
            border-bottom: solid 1px #e6e6e6;
            background-color: #fff;
            -webkit-box-shadow: 2px 1px 2px 0 rgba(0,0,0,.15);
            box-shadow: 2px 1px 2px 0 rgba(0,0,0,.15);
        }
        .base-slider.active{
            left: 0;
            transition: all 0.6s;
        }
    }
</style>
