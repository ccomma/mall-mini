import { CommonSignConstant } from "../../constants/common-constant";

class CellStatusHolder {
    /**
     * 已选择 cell map
     * key:   cell.keyId; 因为一个 fence  里同时只能被选中一个 cell
     * value: cell
     */
    static selectedCellMap = new Map();

    /**
     * 已禁用 cell map
     * key:   `${cell.keyId}_${cell.valueId}`
     * value: cell
     */
    static forbiddenCellMap = new Map();


    /**
     * 反转选择
     * 若原已选中，取消选择；若原未选中，则选中
     * 
     * @param {Cell} cell cell
     */
    static reverseSelect(cell) {
        // 原来已选择该cell，取消选择
        if (this.isSelected(cell)) {
            this.unselect(cell.keyId);
            return true;
        }

        // 非反选情况直接重新 set 覆盖
        this.select(cell);
    }

    /**
     * 选中
     * 
     * @param {Cell} cell cell
     */
    static select(cell) {
        this.selectedCellMap.set(cell.keyId, cell);
    }

    /**
     * 取消选中
     * 
     * @param {string} keyId 属性 id
     */
    static unselect(keyId) {
        this.selectedCellMap.delete(keyId);
    }

    /**
     * 是否已选择
     * keyId 和 valueId 都得相等
     * 
     * @param {{Cell}} cell cell
     * @returns true：已选择；false：未选择
     */
    static isSelected(cell) {
        let selectedCell = this.selectedCellMap.get(cell.keyId);
        return selectedCell && cell.valueId === selectedCell.valueId;
    }

    /**
     * 获取已选中数组
     * 
     * @returns 已选中数组
     */
    static selectedList() {
        return [...this.selectedCellMap.values()];
    }

    /**
     * 禁用
     * @param {Cell} cell cell
     */
    static forbidden(cell) {
        let key = cell.keyId + CommonSignConstant.UNDERLINE + cell.valueId;
        this.forbiddenCellMap.set(key, cell);
    }

    /**
     * 取消禁用
     * 
     * @param {{keyId, valueId}} cell cell
     */
    static unforbidden(cell) {
        let key = cell.keyId + CommonSignConstant.UNDERLINE + cell.valueId;
        this.forbiddenCellMap.delete(key);
    }

}

export {
    CellStatusHolder
}