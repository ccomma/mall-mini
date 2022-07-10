import { Cell } from "../models/cell";
import { CellStatusHandler } from "../models/cell-status-handler";
import { CellStatusHolder } from "../models/cell-status-holder";
import { FenceGroup } from "../models/fence-group";
import { ViewItem } from "../models/view-item";
import { ViewItemHandler } from "../models/view-item-handler";

Component({
  data: {
    viewItem: {},
    fenceGroup: {},
    cellStatusHolder: {},
    viewItemHandler: {},
    fenceGroupHandler: {}
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

      let cellStatusHolder = CellStatusHolder.instance(fenceGroup.fences.length);

      let viewItemHandler = ViewItemHandler.instance(viewItem, cellStatusHolder);

      let fenceGroupHandler = CellStatusHandler.instance(fenceGroup, item, viewItemHandler, cellStatusHolder);
      fenceGroupHandler.initStatus(viewItem);

      // 数据绑定
      this.data.cellStatusHolder = cellStatusHolder;
      this.data.viewItemHandler = viewItemHandler;
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
    
    /**
     * 数量选择器点击事件
     * 
     * @param {*} event 
     */
    onCounterTap(event) {
      this.data.viewItemHandler.refresh({count: event.detail.count});
      this.bindViewItemData(this.data.viewItem);
    },

    /**
     * 确认按钮
     * 
     * @param {*} event 
     */
    onConfirmTap(event) {
      if (this.data.cellStatusHolder.isAllSelected()) {
        // ? 是否请求获取库存进行判断
        this.triggerEvent('confirmtap')
      }
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