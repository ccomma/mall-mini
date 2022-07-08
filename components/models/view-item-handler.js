import { CellStatusHolder } from "./cell-status-holder";

class ViewItemHandler {

    viewItem = {};

    /** 属性总数量 */
    specKeyCount;


    static instance(viewItem, specKeyCount) {
        let handler = new ViewItemHandler();
        handler.viewItem = viewItem;
        handler.specKeyCount = specKeyCount;
        return handler;
    }

    isAllChoose() {
        return CellStatusHolder.selectedList().length === this.specKeyCount;
    }

    updateSku(skuList) {
        if (!this.isAllChoose()) {
            return false;
        }

        // 找出对应的 sku
        let sku = skuList.find(sku => sku.specs.every(spec => CellStatusHolder.isSelected(spec)));

        this.viewItem.image = sku.image;
        this.viewItem.price = sku.price;
        this.viewItem.stock = sku.stock;
        this.refreshSelectedList();
        return true;
    }

    refreshSelectedList() {
        this.viewItem.selectedList = CellStatusHolder.selectedList();
    }

}

export {
    ViewItemHandler
}