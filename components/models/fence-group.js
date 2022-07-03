import { Matrix } from "../utils/matrix";
import { Fence } from "./fence";

class FenceGroup {
    /** 商品spu */
    item;

    /** sku列表 */
    skuList = [];

    /** 属性行列表 */
    fences = [];


    /**
     * 构建一个 FenceGroup 对象
     * 
     * @param {object} item item 对象
     * @returns {FenceGroup} 栅栏组
     */
    static instance(item) {
        let fenceGroup = new FenceGroup();
        fenceGroup.item = item;
        fenceGroup.skuList = item.skuList;
        fenceGroup._initFences();
        return fenceGroup;
    }

    /**
     * 初始化 fences
     */
    _initFences() {
        // 获取规格矩阵
        let specsMatrix = this.skuList.map(sku => sku.specs);
        // 转置矩阵，把每一行转换为 fence
        this.fences = Matrix.transpose(specsMatrix).map(row => Fence.instance(row));
    }

}

export {
    FenceGroup
}