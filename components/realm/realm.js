import { Cell } from "../models/cell";
import { FenceGroup } from "../models/fence-group";

Component({
  data: {
    fenceGroup: {}
  },
  properties: {
    item: Object
  },
  observers: {
    item: function (item) {
      if (!item) {
        return;
      }

      // 获取 fenceGroup
      let fenceGroup = FenceGroup.instance(item);

      this.defaultSelect(fenceGroup)

      // 数据绑定
      this.bindInitData(fenceGroup);
    }
  },
  methods: {
    defaultSelect(fenceGroup) {
      // 只有一个属性值得属性默认需要选中
      let oneCells = fenceGroup.fences
        .filter(fence => fence.cells.length === 1)
        .flatMap(fence => fence.cells);

      fenceGroup.reverseSelect(oneCells);
    },
    /**
     * 规格点击事件
     * 
     * @param {*} event 
     */
    onCellTap(event) {
      let tapCell = Cell.instance(event.detail.cell);
      this.data.fenceGroup.reverseSelect([tapCell]);
      this.bindInitData(this.data.fenceGroup);
    },
    /**
     * 数据绑定
     * 
     * @param {*} fenceGroup 
     */
    bindInitData(fenceGroup) {
      this.setData({
        fenceGroup: fenceGroup
      });
    }
  }
})