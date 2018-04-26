<template>
    <div class="my-search">

        <div>
            <div class="search-item" v-for="(item, index) in data" :key="index">
                <template v-if="'text'===item.type || 'number'===item.type">
                    <div class="search-label">{{item.label}}</div>
                    <div class="search-input">
                        <el-input v-model="form[item.model]" :type="item.type" :placeholder="item.placeholder || item.label" size="small" @keyup.enter.native="onSearch"></el-input>
                    </div>
                </template>
                <template v-else-if="'select'===item.type">
                    <div class="search-label">{{item.label}}</div>
                    <div class="search-input">
                        <el-select v-model="form[item.model]" clearable filterable  :placeholder="item.placeholder||item.label" size="small">
                            <el-option v-for="(v, k) in item.data" :key="k" :label="v[item.labelField] || v.name" :value="v.id"></el-option>
                        </el-select>
                    </div>
                </template>
                <template v-else-if="'date'===item.type">
                    <div class="search-label">{{item.label}}</div>
                    <div class="search-input">
                        <el-date-picker v-model="form[item.model]" type="date" :placeholder="item.placeholder||item.label" :editable="false" @change="changeDate($event, item.model)" size="small" @keyup.enter.native="onSearch"></el-date-picker>
                    </div>
                </template>
                <template v-else-if="'group'===item.type">
                    <div class="search-input search-input-group">
                        <el-input :placeholder="item.placeholder||item.label" v-model="group[item.model]['value']" size="small" @keyup.enter.native="onSearch">
                            <el-select v-model="group[item.model]['key']" slot="prepend">
                                <el-option v-for="(v, k) in item.data" :key="k" :label="v.label" :value="v.model"></el-option>
                            </el-select>
                        </el-input>
                    </div>
                </template>
                <template v-else-if="'range'===item.type && 2===item.data.length">
                    <div class="search-label">{{item.label}}</div>
                    <div class="search-input search-input-range">
                        <el-input v-model="form[item.data[0]['model']]" :type="item.data[0]['type'] || 'text'" :placeholder="item.data[0]['placeholder']||item.data[0]['label']" size="small" @keyup.enter.native="onSearch"></el-input>
                    </div> ~
                    <div class="search-input search-input-range">
                        <el-input v-model="form[item.data[1]['model']]" :type="item.data[0]['type'] || 'text'" :placeholder="item.data[1]['placeholder']||item.data[1]['label']" size="small" @keyup.enter.native="onSearch"></el-input>
                    </div>
                </template>
                <template v-else-if="'dateRange'===item.type && 2===item.data.length">
                    <div class="search-label">{{item.label}}</div>
                    <div class="search-input">
                        <el-date-picker v-model="form[item.data[0]['model']]" type="date" :placeholder="item.data[0]['placeholder']||item.data[0]['label']" :editable="false" @change="changeDate($event, item.data[0]['model'])" size="small"></el-date-picker>
                    </div> ~
                    <div class="search-input">
                        <el-date-picker v-model="form[item.data[1]['model']]" type="date" :placeholder="item.data[1]['placeholder']||item.data[1]['label']" :editable="false" @change="changeDate($event, item.data[1]['model'])" size="small"></el-date-picker>
                    </div>
                </template>
            </div>
        </div>
        <div class="search-btn">
            <div class="search-item search-button-item">
                <el-button @click="resetForm">重置</el-button>
                <el-button type="success" @click="onSearch">查询</el-button>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        props: ['data'],
        data() {
            return {
                form: {},
                group: {},
                formGroup: {},
            }
        },
        methods: {
            checkValue(value) {
                return value && 'undefined' !== value || 0 === value || '0' === value
            },
            onSearch() {
                let obj = {}
                let query = Object.assign({}, this.$route.query)
                for (let i in this.form) {
                    let value = this.form[i]
                    if (!this.checkValue(value)) {
                        delete query[i]
                        continue
                    }
                    obj[i]=value
                }
                // 关键词组
                for (let i in this.group) {
                    let {key, value} = this.group[i]
                    if (!this.checkValue(value)) {
                        continue
                    }
                    obj[key]=value
                }
                let path = this.$route.path
                // if (undefined !== query['page']) {
                //     delete query['page']
                //     this.$store.commit('utils/setSearching', true)
                // }
                query = Object.assign(query, obj)
                // console.log(query)
                this.$router.push({path, query})
            },
            handleQuery() {
                // if (undefined !== this.$route.query.search) {
                    let that = this
                    let query = this.$route.query
                    for (let n in query) {
                        // let item = arr[n]
                        //
                        // let i = item.indexOf(':')
                        // let k = item.slice(0, i)
                        // let v = item.slice(i + 1)
                        let k = n
                        let v = query[n]
                        if (!this.checkValue(v)) {
                            continue
                        }

                        if (that.form.hasOwnProperty(k)) {
                            that.form[k] = v == parseInt(v) ? parseInt(v) : v   // 严格区分数字与字符串
                        } else if (that.formGroup.hasOwnProperty(k))  { // 关键词分组
                            let group = that.formGroup[k]
                            that.group[group]['key'] = k
                            that.group[group]['value'] = v
                        }
                    }
                // }
            },
            changeDate(e, model) {
                if (undefined === e || 'undefined' === e) {
                    this.form[model] = ''
                } else {
                    this.form[model] = e
                }
            },
            setDefaultForm() {
                let form = {}
                let group = {}
                let formGroup = {}
                let data = this.data
                for (let i in data) {
                    if (undefined === data[i]['model']) {
                        continue
                    }
                    let model = data[i]['model']

                    // 关键词组
                    if ('group' === data[i]['type']) {
                        let defaultData = data[i]['data'][0]
                        let key = defaultData['model']
                        let value = undefined === defaultData['default'] ? '' : defaultData['default']
                        group[model] = {key, value}

                        for (let j in data[i]['data']) {
                            let subModel = data[i]['data'][j]['model']
                            formGroup[subModel] = model
                        }

                        continue
                    }

                    // 输入区间
                    if ('range' === data[i]['type'] || 'dateRange' === data[i]['type']) {
                        for (let j in data[i]['data']) {
                            let key = data[i]['data'][j]['model']
                            let value = undefined === data[i]['data'][j]['default'] ? '' : data[i]['data'][j]['default']
                            form[key] = value
                        }

                        continue
                    }

                    form[model] = undefined === data[i]['default'] ? '' : data[i]['default']
                }
                this.form = Object.assign({}, form)
                this.group = Object.assign({}, group)
                this.formGroup = Object.assign({}, formGroup)
            },
            resetForm() {
                this.setDefaultForm()
                this.onSearch()
            }
        },
        created() {
            this.setDefaultForm()
            this.handleQuery()
        }
    }
</script>

<style lang="scss">
    .my-search{
        background: #F3F3F3;
        padding: 0 0 0;
        .search-item {
            display: inline-block;

            &.search-button-item {
                margin-right: 0;
            }

            .search-label {
                padding:0 15px;
                height: 36px;
                line-height: 36px;
                font-size: 14px;
                display: inline-block;
            }

            .search-input {
                display: inline-block;
                width: 158px;

                .el-date-editor {
                    width: 158px;
                }

                &.search-input-group {
                    padding: 3px 0;
                    height: 36px;
                    width: 250px;
                    vertical-align: middle;

                    .el-select {
                        min-width: 90px;
                        max-width: 120px;
                    }
                }

                &.search-input-range {
                    width: 80px;
                }
            }
        }
        .search-item:nth-child(1){
            .search-label{
                padding-left: 0;
            }
        }
        .el-input-group__prepend .el-input{
            color: #333;
        }
        .search-btn{
            text-align: right;
        }
    }

</style>
