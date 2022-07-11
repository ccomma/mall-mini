import { ArrayUtil } from "../../utils/array-util";
import { Matrix } from "../../utils/matrix";
import { Fence } from "./fence";

class FenceGroup {

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
        fenceGroup._initFences(item.skuList);
        return fenceGroup;
    }

    /**
     * 初始化 fences
     */
    _initFences(skuList) {
        // 获取规格矩阵
        let specsArray = skuList.map(sku => sku.specs);
        // 转置矩阵，把每一行转换为 fence
        this.fences = Matrix.transpose(specsArray)
            // 去重
            .map(row => ArrayUtil.distinct(row, spec => spec.valueId))
            // 转换为 fence
            .map(row => Fence.instance(row));
    }

}

export {
    FenceGroup
}