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
        if (CellStatusHolder.selectedList().length !== this.specKeyCount) {
            return false;
        }

        // 找出对应的 sku
        console.log(skuList);
        let sku = skuList.find(sku => sku.specs.every(spec => CellStatusHolder.isSelected(spec)));

        this.viewItem.image = sku.image;
        this.viewItem.price = sku.price;
        this.viewItem.stock = sku.stock;
        this.viewItem.selectedList = CellStatusHolder.selectedList();

        return true;
    }

}

export {
    ViewItemHandler
}