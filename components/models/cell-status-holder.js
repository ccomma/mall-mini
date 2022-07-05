import { CellStatusConstant } from "../../constants/common-constant";
import { Cell } from "./cell";

class CellStatusHolder {

    /**
     * 已选择 cell map
     * key:   cell.keyId; 因为一个 fence  里同时只能被选中一个 cell
     * value: cell
     */
    static selectedMap = new Map();

    /**
     * 未选择 cell map
     * key:   `${cell.keyId}_${cell.valueId}`
     * value: cell
     */
    static unselectMap = new Map();


    /**
     * 反选
     * 若原已选中，取消选择；若原未选中，则选中
     * 
     * @param {Cell} cell cell
     */
    static reverseSelect(cell) {
        // 原来已选择该 cell，取消选择
        if (this.isSelected(cell)) {
            this.deleteSelect(cell.keyId);
            return;
        }

        // 非反选情况直接重新 set 覆盖
        if (this.isUnselect(cell)) {
            this.putSelect(cell);
            return;
        }

        // 禁用状态不处理
        return;
    }

    static getStatus(cell) {
        // 选中
        if (CellStatusHolder.isSelected(cell)) {
            return CellStatusConstant.SELECTED;
        }

        // 未选
        if (CellStatusHolder.isUnselect(cell)) {
            return CellStatusConstant.UNSELECT;
        }

        // 禁用
        return CellStatusConstant.FORBIDDEN;
    }

    // ==================================== selected ====================================

    /**
     * 获取已选中数组
     * 
     * @returns 已选中数组
     */
    static selectedList() {
        return [...this.selectedMap.values()];
    }

    /**
     * 是否已选择
     * keyId 和 valueId 都得相等
     * 
     * @param {{Cell}} cell cell
     * @returns true：已选择
     */
    static isSelected(cell) {
        let selectedCell = this.selectedMap.get(cell.keyId);
        return selectedCell && cell.valueId === selectedCell.valueId;
    }

    /**
     * 添加 cell 到 selectedMap
     * 
     * @param {Cell} cell cell
     */
    static putSelect(cell) {
        this.selectedMap.set(cell.keyId, cell);
    }

    /**
     * selectedMap 中删除 cell
     * 
     * @param {string} keyId 属性 id
     */
    static deleteSelect(keyId) {
        this.selectedMap.delete(keyId);
    }

    // ==================================== unselect ====================================

    /**
     * 初始化未选 map
     * 
     * @param {[]} skuList sku 数组
     */
    static initUnselect(keyId, skuList) {
        // 获取该 fence 中的非禁用的 cell 数组
        CellStatusHolder._calculateAvailableCells(keyId, skuList)
            // 过滤掉已选择的 cell
            .filter(cell => !CellStatusHolder.isSelected(cell))
            // 剩余的都是未选择的 cell，都加入 unselectMap
            .forEach(cell => CellStatusHolder.putUnselect(cell));
    }

    /**
     * 获取该 fence 内非禁用的（可选择的）规格数组
     * 
     * @param   {[]} skuList sku 数组
     * @returns {[]} 非禁用的（可选择的）规格数组
     */
    static _calculateAvailableCells(keyId, skuList) {
        // 其他 fence 的已选 cell
        let otherSelectedCells = CellStatusHolder.selectedList().filter(sCell => sCell.keyId !== keyId);

        // 筛选出其他 fence 已选规格的 sku
        return skuList.filter(sku => CellStatusHolder._isHasAllSpec(sku, otherSelectedCells))
            // 这些 sku 中 keyId 是该 fence 的 spec 即为该 fence 中未被禁用的 cell
            .flatMap(sku => sku.specs)
            .filter(spec => spec.keyId === keyId)
            // 转 Cell
            .map(spec => new Cell.instance(spec));
    }

    /**
     * sku 是否全部拥有这些 spec
     * 
     * @param   {object}             sku   sku
     * @param   {[{keyId, valueId}]} specs 其他 fence 的已选 cell
     * @returns 是否全部拥有 specs
     */
    static _isHasAllSpec(sku, specs) {
        return specs.every(spec => sku.specs.some(skuSpec => spec.keyId === skuSpec.keyId && spec.valueId === skuSpec.valueId));
    }

    /**
     * 清空未选
     */
    static clearUnselect() {
        this.unselectMap.clear();
    }

    /**
    * 是否未选择
    * 
    * @param {{Cell}} cell cell
    * @returns true：未选择
    */
    static isUnselect(cell) {
        return this.unselectMap.has(cell.unionId());
    }

    /**
     * 添加 cell 到 unselectMap
     * 
     * @param {Cell} cell cell
     */
    static putUnselect(cell) {
        this.unselectMap.set(cell.unionId(), cell);
    }

    /**
     * unselectMap 中删除 cell
     * 
     * @param {{keyId, valueId}} cell cell
     */
    static deleteUnselect(cell) {
        this.unselectMap.delete(cell.unionId());
    }

}

export {
    CellStatusHolder
}