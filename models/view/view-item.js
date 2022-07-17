import { Cart } from "../cart";

class ViewItem {

    /** 主图 */
    image;

    /** 价格 */
    price;

    /** 库存 */
    stock;

    /** 已选规格列表 */
    selectedList = [];

    /** 数量 */
    count = 1;

    /** 最小数量 */
    minCount = Cart.MIN_COUNT;

    /** 最大数量 */
    maxCount = Cart.MAX_COUNT;


    static instance(obj) {
        let item = new ViewItem();
        item.image = obj.image;
        item.price = obj.price;
        item.stock = obj.stock;
        return item;
    }

}

export {
    ViewItem
}