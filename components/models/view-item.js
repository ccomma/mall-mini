
class ViewItem {
    
    /** 主图 */
    image;

    /** 价格 */
    price;

    /** 库存 */
    stock;


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