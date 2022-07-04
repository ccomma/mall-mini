import { Matrix } from "../../utils/matrix";
import { Fence } from "./fence";

class FenceGroup {
    
    /** 商品spu */
    item = {};

    /** sku列表 */
    skuList = [];

    /** 规格列表 */
    specs = [];

    /** 属性行列表 */
    fences = [];

    /** 
     * 已选择 cell map
     * key: cell.keyId; value: cell
     */
    selectedCellMap = new Map();


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

    select(tapCell) {
        console.log(this.selectedCellMap);

        // 调整已选择 cell 的 map
        this._resetSelectedCellMap(tapCell);
        // 重新计算全部 cell 的状态
        this._calculateStatus();
    }

    /**
     * 初始化 fences
     */
    _initFences() {
        // 获取规格矩阵
        this.specs = this.skuList.map(sku => sku.specs);
        // 转置矩阵，把每一行转换为 fence
        this.fences = Matrix.transpose(specs).map(row => Fence.instance(row));
    }

    _resetSelectedCellMap(tapCell) {
        // 原来已选择该cell，取消选择
        let selectedCell = this.selectedCellMap.get(tapCell.keyId);
        if (selectedCell && selectedCell.valueId === tapCell.valueId) {
            this.selectedCellMap.delete(tapCell.keyId);
        }
        // 非反选情况直接重新 set 覆盖
        else {
            this.selectedCellMap.set(tapCell.keyId, tapCell);
        }
    }

    _calculateStatus() {

    }

}

export {
    FenceGroup
}