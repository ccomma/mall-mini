
class ArrayUtil {

    /**
     * 数组去重
     * 
     * @param   {[]}       array  数组
     * @param   {Function} getKey 获取 key 的函数，根据 key 进行去重
     * @returns {[]}       去重后的数组
     */
    static distinct(array, getKey) {
        let map = ArrayUtil.toMap(array, getKey);
        return [...map.values()];
    }

    /**
     * 数组转 map
     * 
     * @param {[]}       array 数组
     * @param {Function} getKey 获取 key 的函数
     * @returns {Map}    map
     */
    static toMap(array, getKey) {
        let map = new Map();
        array.forEach(item => map.set(getKey(item), item));
        return map;
    }

}

export {
    ArrayUtil
}