<template>
    <div class="coupon-create">
        <el-row>
            <el-card class="box-card">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>分享红包链接图</el-breadcrumb-item>
                </el-breadcrumb>
            </el-card>
        </el-row>
        <el-row>
            <el-card>
                <div class="form-width">
                    <el-form label-width="60px">
                        <el-form-item label="图片" required>
                            <el-upload
                                class="upload-demo"
                                action="http://upload-z0.qiniu.com"
                                :data="{'token':qiniuToken}"
                                :on-remove="handleRemove"
                                :file-list="fileList"
                                :on-success="hasSuccess"
                                list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="色值">
                            <el-color-picker v-model="clr"></el-color-picker>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-radio-group v-model="key" @change="changeType">
                                <el-radio label="arpbg_">拍卖列表</el-radio>
                                <el-radio label="brpbg_">投标列表</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">提交发布</el-button>
                            <!--<el-button @click="cancel">取消</el-button>-->
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </el-row>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        computed:{
            ...mapGetters({
                qiniuToken: 'common/qiniuToken'
            }),
        },
        data(){
            return {
                fileList: [],
                key: 'arpbg_',
                pic: '',
                clr: '#409EFF',
            }
        },
        methods:{
            cancel(){

            },
            changeType(val){
                let query = this.$route.query
                let path = this.$route.path
                query = Object.assign({key: val})
                this.$router.push({path,query})
            },
            getToken(){
                let operatorId = 1
                this.$store.dispatch('common/getQiniuToken',{operatorId})
            },
            getInfo(){
                let operatorId = 1
                let type = this.$route.query.key || 'arpbg_'
                let keyClr = type+'pic_clr'
                let keyPic = type + 'pic'
                let propKeys = [keyClr,keyPic]
                this.$store.dispatch('sysProp/getProp',{operatorId,propKeys}).then(res=>{
                    let data = res.data.data
                    this.pic = data[keyPic].pVal
                    this.fileList = [].concat({name: data[keyPic].pDesc,url: data[keyPic].pVal})
                    this.clr = data[keyClr].pVal
                })
            },
            handleRemove(){
                this.pic = ''
            },
            hasSuccess(res,file){
                this.fileList = [].concat(file)
                this.pic = 'https://img.cft.upmi.com.cn/' + res.key
            },
            onSubmit(){
                if(this.pic == ''){
                   this.$message.error("请先上传图片！")
                    return
                }
                let propReqs = [
                    {
                        desc: '背景图',
                        pKey: this.key + 'pic',
                        pVal: this.pic
                    },
                    {
                        desc: '背景图颜色值',
                        pKey: this.key + 'pic_clr',
                        pVal: this.clr
                    }
                ]
                let operatorId = 1
                this.$store.dispatch('sysProp/setProp',{propReqs,operatorId}).then(res=>{
                    if(res.status == 200){
                        this.$message.success("成功！")
                    }
                })
            },
        },
        mounted(){
            this.key = this.$route.query.key || 'arpbg_'
            this.getToken()
            this.getInfo()
        },
        watch:{
            $route(){
                this.getInfo()
            }
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
