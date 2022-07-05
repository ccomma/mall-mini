import { CellStatusConstant, CommonSignConstant } from "../../constants/common-constant";
import { CellStatusHolder } from "./cell-status-holder";

class Cell {

    /** 属性id */
    keyId;

    /** 属性值id */
    valueId;

    /** 属性值名称 */
    value;

    /** 状态，默认未选中 */
    status = CellStatusConstant.UNSELECT;

    
    /**
     * 构建一个 Cell 对象
     * 
     * @param {object} spec 规格
     * @returns {Cell} 属性单元
     */
    static instance(spec) {
        let cell = new Cell();
        cell.keyId = spec.keyId;
        cell.valueId = spec.valueId;
        cell.value = spec.value;
        return cell;
    }

    setStatus(availableCells) {
        // 选中
        if (CellStatusHolder.isSelected(this)) {
            this.status = CellStatusConstant.SELECTED;
            return;
        }

        // 可用
        if (this.isInclude(availableCells)) {
            this.status = CellStatusConstant.UNSELECT;
            return;
        }

        // 不可用（禁止）
        this.status = CellStatusConstant.FORBIDDEN;
        return;
    }

    /**
     * 是否存在于某个数组中
     * 
     * @param {[{keyId,valueId}]} cells cell 数组
     * @returns 
     */
    isInclude(cells) {
        return cells.some(cell => this.equals(cell));
    }

    /**
     * 是否与另一个 cell 相等
     * 
     * @param {Cell} cell cell
     * @returns 
     */
    equals(cell) {
        return this.keyId === cell.keyId && this.valueId === cell.valueId;
    }

}

export {
    Cell
}