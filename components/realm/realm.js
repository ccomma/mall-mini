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

      // 初始化 fenceGroup
      this.firstRenderFenceGroup(item);

      let viewItem = ViewItem.instance(item);
      let viewItemHandler = ViewItemHandler.instance(viewItem, this.data.fenceGroup.fences.length);
      // 已选择一个sku，更新 spu 展示信息
      viewItemHandler.update(item.skuList);

      this.bindViewItemData(viewItem);
      console.log(viewItem);
    }
  },
  methods: {
    /**
     * 渲染 fenceGroup
     * 
     * @param {object} item spu
     */
    firstRenderFenceGroup(item) {
      // 获取 fenceGroup
      let fenceGroup = FenceGroup.instance(item);

      // 初始化
      this.data.fenceGroupHandler = CellStatusHandler.instance(fenceGroup, item.skuList);
      this.data.fenceGroupHandler.initStatus(fenceGroup);

      // 数据绑定
      this.bindFenceGroupData(fenceGroup);
    },
    /**
     * 规格点击事件
     * 
     * @param {*} event 
     */
    onCellTap(event) {
      let tapCell = Cell.instance(event.detail.cell);
      this.data.handler.tapCells([tapCell]);
      this.bindFenceGroupData(this.data.fenceGroup);
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