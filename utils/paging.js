import { Http } from "./http";

class Paging {

    pageIndex;
    pageSize;
    request;
    /**
     * 利用锁防抖
     * true：锁未被占有；false：锁已被占有
     */
    lock = false;
    /**
     * 是否还有下一页
     */
    hasNext = true;
    // 数据累加器
    accumulator = [];

    static instance(request, pageIndex = 1, pageSize = 10) {
        let result = new Paging();
        result.request = request;
        result.pageIndex = pageIndex;
        result.pageSize = pageSize;
    }

    static instanceStart(request, pageSize = 10) {
        return Paging.of(request, 1, pageSize);
    }

    async next() {
        if (!this.hasNext || !this._getLock()) {
            return;
        }

        // 获取下一页数据
        let data = await this._doNext();

        this._releaseLock();

        return data;
    }

    // TODO: 分页数据 pagingData 格式尚未明确
    async _doNext() {
        this._setPageParam();
        let result = await Http.request(this.request);
        if (!result || !result.data) {
            return null;
        }
        let pagingData = result.data;

        // 无数据，返回空
        if (pagingData.total === 0) {
            return {
                isEmpty: true,
                list: [],
                hasNext: false,
                accumulator: []
            };
        }

        // 是否有下一页
        this.hasNext = this._hasNext(this.pageIndex, pagingData.totalPage);
        if (this.hasNext) {
            this.pageIndex++;
        }

        // 数据累加
        this._accumulate(pagingData.list);

        return {
            isEmpty: false,
            list: pagingData.list,
            hasNext: this.hasNext,
            accumulator: this.accumulator
        }
    }

    _accumulate(list) {
        this.accumulator = this.accumulator.concat(list);
    }

    _hasNext(pageIndex, totalPage) {
        return pageIndex < totalPage;
    }

    _setPageParam() {
        Object.defineProperties(this.request.data, {
            pageIndex: {
                value: this.pageIndex
            },
            pageSize: {
                value: this.pageSize
            }
        })

    }

    /**
     * 拿到锁
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