import { CellStatus } from "../../constants/common-constant";

class Cell {

    /** 属性id */
    keyId;

    /** 属性值id */
    valueId;

    /** 属性值名称 */
    value;

    /** 状态，默认未选中 */
    status = CellStatus.UNSELECT;

    
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

    setStatus(selectedCells, availableCells) {
        // 选中
        if (this.isInclude(selectedCells)) {
            this.status = CellStatus.SELECTED;
            return;
        }

        // 可用
        if (this.isInclude(availableCells)) {
            this.status = CellStatus.UNSELECT;
            return;
        }

        // 不可用（禁止）
        this.status = CellStatus.FORBIDDEN;
        return;
    }

    isInclude(cells) {
        return cells.some(cell => this.equals(cell));
    }

    equals(cell) {
        return this.keyId === cell.keyId && this.valueId === cell.valueId;
    }
}

export {
    Cell
}