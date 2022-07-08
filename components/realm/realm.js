import { Cell } from "../models/cell";
import { CellStatusHandler } from "../models/cell-status-handler";
import { FenceGroup } from "../models/fence-group";
import { ViewItem } from "../models/view-item";
import { ViewItemHandler } from "../models/view-item-handler";

Component({
  data: {
    viewItem: {},
    fenceGroup: {},
    fenceGroupHandler: {},
    viewItemHandler: {}
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

      let viewItem = ViewItem.instance(item);

      // 初始化
      let fenceGroupHandler = CellStatusHandler.instance(fenceGroup, viewItem, item);
      fenceGroupHandler.initStatus(viewItem);

      // 数据绑定
      this.data.fenceGroupHandler = fenceGroupHandler;
      this.bindFenceGroupData(fenceGroup);
      this.bindViewItemData(viewItem);
    }
  },

  methods: {
    /**
     * 规格点击事件
     * 
     * @param {*} event 
     */
    onCellTap(event) {
      // fenceGroup
      let tapCell = Cell.instance(event.detail.cell);
      this.data.fenceGroupHandler.tapCells([tapCell]);
      this.bindFenceGroupData(this.data.fenceGroup);
      this.bindViewItemData(this.data.viewItem);
    },
    
    onCounterTap(event) {
      let viewItemHandler = ViewItemHandler.instance(this.data.viewItem);
      viewItemHandler.refresh({count: event.detail.count});
      this.bindViewItemData(this.data.viewItem);
    },

    bindFenceGroupData(fenceGroup) {
      this.setData({
        fenceGroup: fenceGroup
      });
    },

    bindViewItemData(viewItem) {
      this.setData({
        viewItem: viewItem
      });
    }
  }

})