import { ServiceName } from "../config/config";
import { Http } from "../utils/http";
import { Paging } from "../utils/paging";

class Item {

    static itemV1 = `item/v1`;

    /**
     * 获取 item 分页对象
     * 
     * @returns item 分页对象
     */
    static getPagingForRecommend() {
        return Paging.instanceStart({
            url: `${ServiceName.MINI_FRONT}/${Item.itemV1}/get_item_page_for_recommend`
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