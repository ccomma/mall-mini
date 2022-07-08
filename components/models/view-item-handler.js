import { CellStatusHolder } from "./cell-status-holder";

class ViewItemHandler {

    viewItem = {};

    cellStatusHolder = {};


    static instance(viewItem, cellStatusHolder) {
        let handler = new ViewItemHandler();
        handler.viewItem = viewItem;
        handler.cellStatusHolder = cellStatusHolder;
        return handler;
    }

    refreshFromSku(skuList) {
        if (!this.cellStatusHolder.isAllSelected()) {
            return false;
        }

        // 找出对应的 sku
        let sku = skuList.find(sku => sku.specs.every(spec => this.cellStatusHolder.isSelected(spec)));

        this.refresh({
            image: sku.image,
            price: sku.price,
            stock: sku.stock,
            selectedList: this.cellStatusHolder.selectedList()
        })
        return true;
    }

    refreshSelectedList() {
        this.refresh({selectedList: this.cellStatusHolder.selectedList()});
    }

    refresh(viewItem) {
        if (viewItem.image) {
            this.viewItem.image = viewItem.image;
        }
        if (viewItem.price) {
            this.viewItem.price = viewItem.price;
        }
        if (viewItem.stock) {
            this.viewItem.stock = viewItem.stock;
        }
        if (viewItem.selectedList) {
            this.viewItem.selectedList = viewItem.selectedList;
        }
        if (viewItem.count) {
            this.viewItem.count = viewItem.count;
        }
    }

}

export {
    ViewItemHandler
}