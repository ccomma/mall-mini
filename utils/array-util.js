
class ArrayUtil {

    /**
     * 对象数组去重
     * 
     * @param   {[]}       array  对象数组
     * @param   {Function} getKey 数组中对象的 key
     * @returns {[]}       去重后的数组
     */
    static distinctObjectArray(array, getKey) {
        let map = ArrayUtil.toMap(array, getKey);
        return [...map.values()];
    }

    /**
     * 数组转 map
     * 
     * @param {[]}       array 对象数组
     * @param {Function} getKey 数组中对象的 key
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