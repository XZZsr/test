<template>
    <span class="my-reveal">
        <span v-if="data && !type || data == '0'" :title="data">{{data}}</span>
        <span v-if="data && type" :title="data">{{data | money}}</span>
        <span class="line" v-if="!data && data != '0'">--</span>
    </span>
</template>
<script>
export default{
    props: {
        data: {
            default: ''
        },
        type: {
            type: String,
            default: ''
        },
    }
}
</script>
