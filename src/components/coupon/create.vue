<template>
    <div class="coupon-create">
        <el-row>
            <el-card class="box-card">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/coupon/index' }">优惠券管理</el-breadcrumb-item>
                    <el-breadcrumb-item>新建优惠券</el-breadcrumb-item>
                </el-breadcrumb>
            </el-card>
        </el-row>
        <el-row>
            <el-card>
                <div class="form-width">
                    <el-form  :rules="rules" ref="ruleForm" :model="form" label-width="100px">
                        <el-form-item label="选择类型">
                            <el-select v-model="form.type" placeholder="请选择">
                                <el-option label="现金券" :value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="现金券名称" prop="name">
                            <el-input v-model="form.name" placeholder="限输入12个字符" maxlength="12"></el-input>
                        </el-form-item>
                        <el-form-item label="现金券金额" prop="amount" required>
                            <el-input v-model="form.amount" placeholder="请输入抵用券金额"></el-input>
                        </el-form-item>
                        <el-form-item label="使用范围">
                            <el-select v-model="form.sceneType" placeholder="请选择">
                                <el-option v-for="item in scene" :label="item.label" :value="item.value" :key="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="使用品类">
                            <el-select v-model="form.categoryId" placeholder="请选择">
                                <el-option label="所有品类" :value="-1"></el-option>
                                <el-option v-for="item in categories" :label="item.name" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="用户类型" required prop="userLevel">
                            <el-select v-model="form.userLevel" placeholder="请选择">
                                <el-option v-for="item in levels" :label="item.label" :value="item.value" :key="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="活动时间" required>
                            <el-col :span="11">
                                <el-form-item prop="consumeStartTime">
                                    <el-date-picker type="date" placeholder="选择开始时间" :picker-options="pickerOptions1" v-model="form.consumeStartTime" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col class="line" :span="2" style="text-align: center">-</el-col>
                            <el-col :span="11">
                                <el-form-item prop="consumeEndTime">
                                    <el-date-picker type="date" placeholder="选择结束时间" :picker-options="pickerOptions2" v-model="form.consumeEndTime" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">提交发布</el-button>
                            <el-button @click="cancel">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </el-row>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import axios from 'axios'
    export default {
        computed:{
            ...mapGetters({
                form: 'coupon/item',
                scene: 'coupon/scene',
                levels: 'coupon/levels',
                rules: 'coupon/rules',
                categories: 'productCategory/all'
            }),
        },
        data(){
            return {
                pickerOptions1:{
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                pickerOptions2:{
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                },
            }
        },
        methods:{
            get(){
                this.$store.dispatch('productCategory/getAll')
            },
            onSubmit(){
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('新建后将无法修改和删除, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$store.dispatch('coupon/store',this.form).then(res=>{
                                this.$router.push({name: 'coupon.index'})
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消新建'
                            });
                        });
                    } else {
                        return false
                    }
                })
            },
            cancel(){
                this.$router.push({name: 'coupon.index'})
            }
        },
        mounted(){
            this.$refs.ruleForm.resetFields();
            this.$store.commit('coupon/resetItem')
            this.get()
        }
    }
</script>
<style lang="scss">
    .coupon-create{
        .el-select{
            width: 100%;
        }
    }
</style>
