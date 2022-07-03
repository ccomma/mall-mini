import { Http } from "../utils/http";
import { Paging } from "../utils/paging";

class Item {

    /**
     * 获取 item 分页对象
     * 
     * @returns item 分页对象
     */
    static getPaging() {
        return Paging.instanceStart({
            url: ``
        });
    }

    /**
     * 获取 item 对象
     * 
     * @param {string} id itemId
     * @returns item
     */
    static async getWithSkuList(id) {
        return await Http.request({
            url: ``
        });
    }

}

export {
    Item
}