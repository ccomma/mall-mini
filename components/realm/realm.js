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

      // 初始化 fenceGroup
      this.firstRenderFenceGroup(item);

      // 初次渲染 viewItem
      this.firstRenderViewItem(item);
    }
  },

  methods: {
    /**
     * 初次渲染 fenceGroup
     * 
     * @param {object} item spu
     */
    firstRenderFenceGroup(item) {
      // 获取 fenceGroup
      let fenceGroup = FenceGroup.instance(item);

      // 初始化
      let fenceGroupHandler = CellStatusHandler.instance(fenceGroup, item.skuList);
      fenceGroupHandler.initStatus(fenceGroup);

      // 数据绑定
      this.data.fenceGroupHandler = fenceGroupHandler;
      this.bindFenceGroupData(fenceGroup);
    },

    /**
     * 初次渲染 viewItem
     * 
     * @param {object} item spu
     */
    firstRenderViewItem(item) {
      let viewItem = ViewItem.instance(item);
      let viewItemHandler = ViewItemHandler.instance(viewItem, this.data.fenceGroup.fences.length);
      // 已选择一个sku，更新 spu 展示信息
      viewItemHandler.update(item.skuList);

      // 数据绑定
      this.data.viewItemHandler = viewItemHandler;
      this.bindViewItemData(viewItem);
    },

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

      // viewItem
      this.data.viewItemHandler.update(CellStatusHandler.skuList);
      this.bindViewItemData(this.data.viewItem);
    },

    bindFenceGroupData(fenceGroup) {
      this.setData({
        fenceGroup: fenceGroup
      });
    },

    bindViewItemData(viewItem) {
      console.log(viewItem);
      this.setData({
        viewItem: viewItem
      });
    }
  }

})