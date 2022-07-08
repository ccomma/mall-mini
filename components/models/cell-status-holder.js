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


    static getStatus(cell) {
        // 选中
        if (CellStatusHolder.isSelected(cell)) {
            return CellStatusConstant.SELECTED;
        }

        // 未选
        if (CellStatusHolder.isUnselected(cell)) {
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
     * @param {{keyId, valueId}} cell cell
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
    static isUnselected(cell) {
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
     * @param {{Cell}} cell cell
     */
    static deleteUnselect(cell) {
        this.unselectMap.delete(cell.unionId());
    }

}

export {
    CellStatusHolder
}