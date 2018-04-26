// 操作数据的一些方法
let arr_in = function(arr, shan) {
    var zhi = arr.findIndex(function (value, index, arr) {
        return value == shan;
    });
    if (zhi == -1) {
        return false;
    } else {
        return true;
    }
}
/**
 * 向提交接口附加查询条件
 * @param query
 * @param key
 * @param value
 * @param isSearch：是否附加到search字段中
 * @returns {*}
 */
let addQuery = function(query, key, value, isSearch = true) {
    let ret = Object.assign({}, query)
    if (!isSearch) {
        ret[key] = value
        return ret
    }
    let searchStr = undefined === ret.search ? '' : ret.search
    let searchArr = searchStr ? searchStr.split(";") : []
    searchArr.push('' + key + ':' + value)

    ret['search'] = searchArr.join(';')

    return ret
}

export default {arr_in,addQuery}



