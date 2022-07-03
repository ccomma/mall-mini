
class Cell {

    /** 属性值id */
    id

    /** 属性值名称 */
    title;


    /**
     * 构建一个 Cell 对象
     * 
     * @param {object} spec 规格
     * @returns {Cell} 属性单元
     */
    static instance(spec) {
        let cell = new Cell();
        cell.id = spec.valueId;
        cell.title = spec.value;
        return cell;
    }

}

export {
    Cell
}