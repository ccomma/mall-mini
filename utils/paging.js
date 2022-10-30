import { PageResult } from "../result/page-result";
import { Http } from "./http";

class Paging {

    /** 页码 */
    pageIndex;

    /** 页大小 */
    pageSize;

    /** 请求参数 */
    request;

    /**
     * 利用锁防抖
     * true：锁已被占有；false：锁未被占有
     */
    lock = false;

    /** 是否还有下一页 */
    hasNext = true;

    /** 数据累加器 */
    accumulator = [];


    /**
     * 实例化方法
     * 取代构造函数
     * 
     * @param {object} request   请求参数
     * @param {string} pageIndex 页码，默认为 1
     * @param {string} pageSize  页大小，默认为 10
     * @returns 
     */
    static instance(request, pageIndex = 1, pageSize = 10) {
        let result = new Paging();
        result.request = request;
        result.pageIndex = pageIndex;
        result.pageSize = pageSize;
        return result;
    }

    /**
     * 实例化方法，从第一页开始请求
     * 取代构造函数
     * 
     * @param {object} request  请求参数
     * @param {string} pageSize 页大小，默认为 10
     * @returns 
     */
    static instanceStart(request, pageSize = 10) {
        return Paging.instance(request, 1, pageSize);
    }

    /**
     * 请求下一页
     * 
     * @returns 响应数据
     */
    async next() {
        if (!this.hasNext || !this._getLock()) {
            return;
        }

        // 获取下一页数据
        let data = await this._doNext();

        this._releaseLock();

        return data;
    }

    /**
     * 实际请求下一页方法
     * 
     * @returns 响应数据
     */
    async _doNext() {
        this._setPageParam();
        let pagingData = await Http.request(this.request);
        if (!pagingData) {
            return null;
        }

        // 无数据，返回空
        if (pagingData.totalCount === 0) {
            return PageResult.empty();
        }

        // 是否有下一页
        this.hasNext = this._hasNext(this.pageIndex, pagingData.pageCount);
        if (this.hasNext) {
            this.pageIndex++;
        }

        // 数据累加
        this.accumulator = this.accumulator.concat(pagingData.list);

        return PageResult.of(pagingData.list, this.accumulator);
    }

    /**
     * 是否存在下一页
     * 
     * @param {string} pageIndex 页码
     * @param {string} totalPage 页大小
     * @returns 
     */
    _hasNext(pageIndex, totalPage) {
        return pageIndex < totalPage;
    }

    /**
     * set 分页参数
     */
    _setPageParam() {
        if (!this.request.data) {
            Object.defineProperties(this.request, {
                data: {
                    value: {}
                }
            });
        }

        this.request.data.pageIndex = this.pageIndex;
        this.request.data.pageSize = this.pageSize;
    }

    /**
     * 拿到锁
     * 
     * @returns true：成功；false：失败
     */
    _getLock() {
        if (this.lock) {
            return false;
        }

        this.lock = true;
        return true;
    }

    /**
     * 释放锁
     */
    _releaseLock() {
        this.lock = false;
    }

}

export {
    Paging
}