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

}

export {
    Cell
}