import { Matrix } from "../../utils/matrix";
import { CellStatusHolder } from "./cell-status-holder";
import { Fence } from "./fence";

class FenceGroup {

    /** 商品spu */
    item = {};

    /** sku列表 */
    skuList = [];

    /** 属性行列表 */
    fences = [];


    /**
     * 构建一个 FenceGroup 对象
     * 
     * @param   {object}     item item 对象
     * @returns {FenceGroup} 栅栏组
     */
    static instance(item) {
        let fenceGroup = new FenceGroup();
        fenceGroup.item = item;
        fenceGroup.skuList = item.skuList;
        fenceGroup._initFences(item.skuList);
        return fenceGroup;
    }

    /**
     * 点击 cell，更新全部 cell 状态
     * 
     * @param {[Cell]} tapCells 点击的 cell 数组
     */
    reverseSelect(tapCells) {
        // 1.反转已选
        tapCells.forEach(tapCell => {
            CellStatusHolder.reverseSelect(tapCell);
        });

        // 2.初始化未选
        CellStatusHolder.clearUnselect();
        this.fences.forEach(fence => {
            // 重新添加这行的未选 cell
            CellStatusHolder.initUnselect(fence.id, this.skuList);
        });

        // 3.重新设置全部 cell 状态
        this.fences.flatMap(fence => fence.cells)
            .forEach(cell => cell.status = CellStatusHolder.getStatus(cell));
    }

    /**
     * 初始化 fences
     */
    _initFences(skuList) {
        // 获取规格矩阵
        let specs = skuList.map(sku => sku.specs);
        // 转置矩阵，把每一行转换为 fence
        this.fences = Matrix.transpose(specs).map(row => Fence.instance(row));
    }

}

export {
    FenceGroup
}