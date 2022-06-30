import { Paging } from "../utils/paging";

class Item {

    static getItemPaging() {
        return Paging.instanceStart({
            url: ''
        });
    }
}

export {
    Item
}