
import { CellStatusHandler } from "../../../service/cell-status-handler";
import { CellStatusHolder } from "../../../service/cell-status-holder";
import { FenceGroup } from "../../../models/view/fence-group";
import { ViewItem } from "../../../models/view/view-item";
import { ViewItemHandler } from "../../../service/view-item-handler";
import { Cell } from "../../../models/view/cell";

Component({
  data: {
    viewItem: {},
    fenceGroup: {},
    cellStatusHolder: {},
    viewItemHandler: {},
    fenceGroupHandler: {}
  },

  properties: {
    spu: Object
  },

  observers: {
    spu: function (spu) {
      if (!spu) {
        return;
      }

      // 获取 fenceGroup
      let fenceGroup = FenceGroup.instance(spu);

      let viewItem = ViewItem.instance(spu);

      let cellStatusHolder = CellStatusHolder.instance(fenceGroup.fences.length);

      let viewItemHandler = ViewItemHandler.instance(viewItem, cellStatusHolder);

      let fenceGroupHandler = CellStatusHandler.instance(fenceGroup, spu, viewItemHandler, cellStatusHolder);
      fenceGroupHandler.initStatus();

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
      this.data.viewItemHandler.refresh({ count: event.detail.count });
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
        this.triggerEvent('confirmtap');
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

      this.triggerEvent('getdata', { viewItem: viewItem }, { bubbles: true, composed: true });
    }
  }

})