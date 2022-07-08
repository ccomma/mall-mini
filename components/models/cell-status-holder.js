import { CellStatusConstant } from "../../constants/common-constant";
import { Cell } from "./cell";

class CellStatusHolder {

    specKeyCount;

    /**
     * 已选择 cell map
     * key:   cell.keyId; 因为一个 fence  里同时只能被选中一个 cell
     * value: cell
     * ? 排序
     */
    selectedMap = new Map();

    /**
     * 未选择 cell map
     * key:   `${cell.keyId}_${cell.valueId}`
     * value: cell
     */
    unselectMap = new Map();


    static instance(specKeyCount) {
        let holder = new CellStatusHolder();
        holder.specKeyCount = specKeyCount;
        return holder;
    }

    getStatus(cell) {
        // 选中
        if (this.isSelected(cell)) {
            return CellStatusConstant.SELECTED;
        }

        // 未选
        if (this.isUnselected(cell)) {
            return CellStatusConstant.UNSELECT;
        }

        // 禁用
        return CellStatusConstant.FORBIDDEN;
    }

    // ==================================== selected ====================================

    isAllSelected() {
        return this.selectedList().length === this.specKeyCount;
    }

    /**
     * 获取已选中数组
     * 
     * @returns 已选中数组
     */
    selectedList() {
        return [...this.selectedMap.values()];
    }

    /**
     * 是否已选择
     * keyId 和 valueId 都得相等
     * 
     * @param {{keyId, valueId}} cell cell
     * @returns true：已选择
     */
    isSelected(cell) {
        let selectedCell = this.selectedMap.get(cell.keyId);
        return selectedCell && cell.valueId === selectedCell.valueId;
    }

    /**
     * 添加 cell 到 selectedMap
     * 
     * @param {Cell} cell cell
     */
    putSelect(cell) {
        this.selectedMap.set(cell.keyId, cell);
    }

    /**
     * selectedMap 中删除 cell
     * 
     * @param {string} keyId 属性 id
     */
    deleteSelect(keyId) {
        this.selectedMap.delete(keyId);
    }

    // ==================================== unselect ====================================

    /**
     * 清空未选
     */
    clearUnselect() {
        this.unselectMap.clear();
    }

    /**
    * 是否未选择
    * 
    * @param {{Cell}} cell cell
    * @returns true：未选择
    */
    isUnselected(cell) {
        return this.unselectMap.has(cell.unionId());
    }

    /**
     * 添加 cell 到 unselectMap
     * 
     * @param {Cell} cell cell
     */
    putUnselect(cell) {
        this.unselectMap.set(cell.unionId(), cell);
    }

    /**
     * unselectMap 中删除 cell
     * 
     * @param {{Cell}} cell cell
     */
    deleteUnselect(cell) {
        this.unselectMap.delete(cell.unionId());
    }

}

export {
    CellStatusHolder
}