import { ArrayUtil } from "../utils/array-util";
import { Cell } from "./cell";

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
     * 初始化 cells
     */
    _initCells() {
        // build cells
        let cells = this.specs.map(spec => Cell.instance(spec));
        // 去重
        this.cells = ArrayUtil.distinctObjectArray(cells, cell => cell.id);
    }

}

export {
    Fence
}