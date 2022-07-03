import { Http } from "../utils/http";

class Category {

    static categoryV1 = `category/v1`;

    /**
     * 获取一级类目列表
     * 
     * @returns 一级类目列表
     */
    static async getTopList() {
        return await Http.request({
            url: `${Category.categoryV1}/get_category_list_by_top`
        });
    }

}

export {
    Category
}