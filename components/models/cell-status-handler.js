import { CellStatusConstant } from "../../constants/common-constant";
import { Cell } from "./cell";
import { CellStatusHolder } from "./cell-status-holder";

class CellStatusHandler {

    skuList = [];

    fenceGroup = {};
    // fenceMap = new Map();
    // cellMap = new Map();


    static instance(fenceGroup, skuList) {
        let handler = new CellStatusHandler();
        handler.skuList = skuList;
        handler.fenceGroup = fenceGroup;

        // init map
        // fenceGroup.fences.forEach(fence => {
        //     handler.fenceMap.set(fence.id, fence);
        //     fence.cells.forEach(cell => handler.cellMap.set(cell.unionId(), cell));
        // });

        return handler;
    }

    initStatus() {
        // 不点击，直接渲染，初始化时渲染出一开始就禁用的 cell
        this.tapCells([]);

        // 只有一个非禁用属性值的属性默认需要选中
        this.fenceGroup.fences.forEach(fence => {
            // 该 fence 的未选 cell 数组
            let unSelectCells = fence.cells.filter(cell => cell.status === CellStatusConstant.UNSELECT);
            // 只有一个则必选
            if (unSelectCells.length === 1) {
                CellStatusHolder.putSelect(unSelectCells[0]);
                this.render(unSelectCells[0]);
            }
        });
    }

    /**
     * 点击 cell，更新全部 cell 状态
     * 
     * @param {[Cell]} tapCells 点击的 cell 数组
     */
    tapCells(tapCells) {
        // 1.反转已选
        this._reverseSelect(tapCells);

        // 2.初始化未选
        this.initUnselect();

        // 3.渲染状态至 cell 中
        this.renderAll();
    }

    /**
     * 初始化未选状态 map
     * ! 逻辑较为复杂，减少调用次数
     * 
     * @param {[]} skuList sku 数组
     */
    initUnselect() {
        CellStatusHolder.clearUnselect();
        this.fenceGroup.fences.forEach(fence => {
            // 获取该 fence 中的非禁用的 cell 数组
            this._calculateUnselectCells(fence.id)
                // 未选择的 cell 加入 unselectMap
                .forEach(cell => CellStatusHolder.putUnselect(cell));
        });
    }

    renderAll() {
        // 重新设置全部 cell 状态
        this.fenceGroup.fences.flatMap(fence => fence.cells)
            .forEach(cell => this.render(cell));
    }

    render(cell) {
        cell.status = CellStatusHolder.getStatus(cell);
    }

    // ==================================== private ====================================

    /**
     * 反选
     * 若原已选中，取消选择；若原未选中，则选中
     * 
     * @param {[Cell]} cells cells
     */
    _reverseSelect(cells) {
        // 反转已选
        cells.forEach(cell => {
            // 原来已选择该 cell => 取消选择
            if (CellStatusHolder.isSelected(cell)) {
                CellStatusHolder.deleteSelect(cell.keyId);
                return true;
            }

            // 未选 => 添加为已选
            if (CellStatusHolder.isUnselect(cell)) {
                CellStatusHolder.putSelect(cell);
                return true;
            }

            // 禁用状态 => 不处理
        });
    }

    /**
     * 获取该 fence 内非禁用的（可选择的）规格数组
     * 
     * @returns {[]} 非禁用的（可选择的）规格数组
     */
    _calculateUnselectCells(keyId) {
        // 其他 fence 的已选 cell
        let otherSelectedCells = CellStatusHolder.selectedList().filter(sCell => sCell.keyId !== keyId);

        // 筛选出其他 fence 已选规格的 sku
        return this.skuList.filter(sku => sku.stock > 0 && this._hasAllSpec(sku, otherSelectedCells))
            // 这些 sku 中 keyId 是该 fence 的 spec 即为该 fence 中未被禁用的 cell
            .flatMap(sku => sku.specs)
            // 过滤掉已选择的 spec
            .filter(spec => spec.keyId === keyId && !CellStatusHolder.isSelected(spec))
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
    _hasAllSpec(sku, specs) {
        return specs.every(spec => sku.specs.some(skuSpec => spec.keyId === skuSpec.keyId && spec.valueId === skuSpec.valueId));
    }

}

export {
    CellStatusHandler
}