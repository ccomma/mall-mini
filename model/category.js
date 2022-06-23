import { Http } from "../utils/http";

class Category {
    static categoryV1 = `category/v1`;

    /**
     * 获取一级类目
     * @returns 一级类目
     */
    static async getTopCategoryList() {
        const categoryListResult = await Http.request({
            url: `${Category.categoryV1}/get_category_list_by_top`
        });

        if (categoryListResult.success) {
            return categoryListResult.data;
        }
    }
}

export {
    Category
}