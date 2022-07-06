import { CellStatusHolder } from "./cell-status-holder";

class ViewItemHandler {

    viewItem = {};

    specKeyCount;

    static instance(viewItem, specKeyCount) {
        let handler = new ViewItemHandler();
        handler.viewItem = viewItem;
        handler.specKeyCount = specKeyCount;
        return handler;
    }

    update(skuList) {
        if (CellStatusHolder.selectedList.length !== this.specKeyCount) {
            return;
        }

        // 找出对应的 sku
        let sku = skuList.find(sku => sku.specs.every(spec => CellStatusHolder.isSelected(spec)));

        this.viewItem.image = sku.image;
        this.viewItem.price = sku.price;
        this.viewItem.stock = sku.stock;
    }

}

export {
    ViewItemHandler
}