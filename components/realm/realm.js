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

      // 如果只有一个 sku，直接默认选择这个 sku
      if (item.skuList.length === 1) {
        let tapCells = item.skuList[0].specs.map(spec => Cell.instance(spec));
        fenceGroup.select(tapCells);
      }

      // 数据绑定
      this.bindInitData(fenceGroup);
    }
  },
  methods: {
    /**
     * 规格点击事件
     * 
     * @param {*} event 
     */
    onCellTap(event) {
      let tapCell = Cell.instance(event.detail.cell);
      this.data.fenceGroup.select([tapCell]);
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