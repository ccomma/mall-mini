
class PageResult {

    /** 是否为空 */
    isEmpty;

    /** 数据 */
    list = [];

    /** 是否有下一页 */
    hasNext;

    /** 累加器 */
    accumulator = [];


    /**
     * 构建一个空的 PageResult 对象
     * 
     * @returns 空的 PageResult 对象
     */
    static empty() {
        let result = new PageResult();
        result.isEmpty = true;
        result.list = [];
        result.hasNext = false;
        result.accumulator = [];
        return result;
    }

    /**
     * 构建一个 PageResult 对象
     * 
     * @param {array}   list        数据列表
     * @param {array}   accumulator 累加器
     * @param {boolean} hasNext     是否存在下一页
     * @returns 
     */
    static of(list, accumulator, hasNext = true) {
        let result = new PageResult();
        result.isEmpty = false;
        result.list = list;
        result.hasNext = hasNext;
        result.accumulator = accumulator;
        return result;
    }

}

export {
    PageResult
}