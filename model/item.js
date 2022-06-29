import { Paging } from "../utils/paging";

class Item {

    static async getItemPaging() {
        return Paging.instanceStart({
            url: ''
        });
    }
}

export {
    Item
}