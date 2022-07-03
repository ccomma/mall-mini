
class ArrayUtil {

    /**
     * 对象数组去重
     * 
     * @param {array}    array  对象数组
     * @param {Function} getKey 数组中对象的 key
     * @returns {array} 去重后的数组
     */
    static distinctObjectArray(array, getKey) {
        let map = new Map();
        for (let item of array) {
            map.set(getKey(item), item);
        }

        return [...map.values()];
    }

}

export {
    ArrayUtil
}