import { Cell } from "../models/cell";
import { CellStatusHandler } from "../models/cell-status-handler";
import { FenceGroup } from "../models/fence-group";

Component({
  data: {
    fenceGroup: {},
    handler: {}
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

      this.data.handler = CellStatusHandler.instance(fenceGroup);
      // 初始化
      this.data.handler.initStatus(fenceGroup);

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
      this.data.handler.tapCells([tapCell]);
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