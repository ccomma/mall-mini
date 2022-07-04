import { CellStatus } from "../../constants/common-constant";
import { ArrayUtil } from "../../utils/array-util";
import { Matrix } from "../../utils/matrix";
import { Cell } from "./cell";
import { Fence } from "./fence";

class FenceGroup {

    /** 商品spu */
    item = {};

    /** sku列表 */
    skuList = [];

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
        let specs = this.skuList.map(sku => sku.specs);
        // 转置矩阵，把每一行转换为 fence
        this.fences = Matrix.transpose(specs).map(row => Fence.instance(row));
    }

    _resetSelectedCellMap(tapCell) {
        // 原来已选择该cell，取消选择
        if (tapCell.hasSelected(this.selectedCellMap)) {
            this.selectedCellMap.delete(tapCell.keyId);
        }
        // 非反选情况直接重新 set 覆盖
        else {
            this.selectedCellMap.set(tapCell.keyId, tapCell);
        }
    }

    _calculateStatus() {
        let selectedCells = [...this.selectedCellMap.values()];

        this.fences.forEach(fence => {
            // 1.计算出这一行状态不为禁止的 cell 数组
            // 这一行命中的 skuList
            let selectedSkuList = this.skuList.filter(sku =>
                // 每个已选择的 cell 都得在一个 sku 中命中
                selectedCells.filter(sCell => sCell.keyId !== fence.id)
                    .every(sCell => sku.specs.some(spec => sCell.equals(spec)))
            );

            // 该行非禁止的 cells
            let availableCells = selectedSkuList.flatMap(sku => sku.specs)
                .filter(spec => spec.keyId === fence.id)
                .map(spec => Cell.instance(spec));
            // 去重
            availableCells = ArrayUtil.distinctObjectArray(availableCells, cell => cell.valueId);

            // 2.设置该行是否禁止
            fence.cells.forEach(cell => {
                let exist = availableCells.some(aCell => cell.equals(aCell));
                cell.status = exist ? CellStatus.UNSELECT : CellStatus.FORBIDDEN;
            });

            // 3.设置该行的选中状态
            let selectedCell = fence.cells.find(cell => cell.hasSelected(this.selectedCellMap));
            if (selectedCell) {
                selectedCell.status = CellStatus.SELECTED;
            }
        });
    }

}

export {
    FenceGroup
}