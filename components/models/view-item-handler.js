import { CellStatusHolder } from "./cell-status-holder";

class ViewItemHandler {

    viewItem = {};


    static instance(viewItem) {
        let handler = new ViewItemHandler();
        handler.viewItem = viewItem;
        return handler;
    }

    refreshFromSku(skuList, specKeyCount) {
        if (!CellStatusHolder.isAllSelected(specKeyCount)) {
            return false;
        }

        // 找出对应的 sku
        let sku = skuList.find(sku => sku.specs.every(spec => CellStatusHolder.isSelected(spec)));

        this.refresh({
            image: sku.image,
            price: sku.price,
            stock: sku.stock,
            selectedList: CellStatusHolder.selectedList()
        })
        return true;
    }

    refreshSelectedList() {
        this.refresh({selectedList: CellStatusHolder.selectedList()});
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