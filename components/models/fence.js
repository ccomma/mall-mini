import { ArrayUtil } from "../../utils/array-util";
import { Cell } from "./cell";
import { CellStatusHolder } from "./cell-status-holder";

class Fence {
    /** 原始规格数组 */
    specs = [];

    /** 属性id */
    id

    /** 属性名 */
    title

    /** cell 列表（属性值） */
    cells = [];


    /**
     * 实例化
     * 
     * @param {[{
     *          keyId:   属性id;
     *          key:     属性名称;
     *          valueId: 属性值id;
     *          value:   属性值名称
     * }]} specs 转置后的规格数组
     * @return {Fence} 栅栏
     */
    static instance(specs) {
        let fence = new Fence;
        fence.id = specs[0].keyId;
        fence.title = specs[0].key;
        fence.specs = specs;
        fence._initCells();
        return fence;
    }

    /**
     * 计算该 fence 中 cells 的状态
     * 
     * @param {[]} skuList sku 数组
     */
    calculateCellStatus(skuList) {
        // 1.获取该 fence 中的非禁止状态的 cell 数组
        let availableCells = this._getAvailableCells(skuList);

        // 2.设置 cell 状态
        this.cells.forEach(cell => cell.setStatus(availableCells));
    }

    /**
     * 初始化 cells
     */
    _initCells() {
        // build cells
        let cells = this.specs.map(spec => Cell.instance(spec));
        // 去重
        this.cells = ArrayUtil.distinctObjectArray(cells, cell => cell.valueId);
    }

    /**
     * 获取该 fence 内非禁止的（可选择的）cell 数组
     * 
     * @param   {[]}     skuList sku 数组
     * @returns {[Cell]} 非禁止的（可选择的）cell 数组
     */
    _getAvailableCells(skuList) {
        // 其他 fence 的已选 cell
        let otherSelectedCells = CellStatusHolder.selectedList().filter(sCell => sCell.keyId !== this.id);

        // 这一行命中的 skuList
        let availableSkuList = skuList.filter(sku =>
            // 每个已选择的 cell 都得在一个 sku 中命中
            otherSelectedCells.every(sCell => sku.specs.some(spec => sCell.equals(spec)))
        );

        // 该行非禁止的 cells
        let availableCells = availableSkuList.flatMap(sku => sku.specs)
            .filter(spec => spec.keyId === this.id)
            .map(spec => Cell.instance(spec));

        // 去重，不去重也不影响
        return ArrayUtil.distinctObjectArray(availableCells, cell => cell.valueId);
    }

}

export {
    Fence
}