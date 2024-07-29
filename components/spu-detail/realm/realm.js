
import { CellStatusHandler } from "../../../handler/cell-status-handler";
import { CellStatusHolder } from "../../../handler/cell-status-holder";
import { FenceGroup } from "../../../models/view/fence-group";
import { ViewItem } from "../../../models/view/view-item";
import { ViewItemHandler } from "../../../handler/view-item-handler";
import { Cell } from "../../../models/view/cell";

Component({
  data: {
    viewItem: {},
    fenceGroup: {},
    cellStatusHolder: {},
    viewItemHandler: {},
    cellStatusHandler: {}
  },

  properties: {
    spu: Object
  },

  observers: {
    'spu': function (spu) {
      this.initData(spu);
    }
  },

  lifetimes: {
    /**
     * 在组件实例进入页面节点树时执行
     * 在 observers 之后执行
     */
    attached: function () {
      this.initRender();
    },
  },

  methods: {
    /**
     * 初始化数据对象
     * 
     * @param {*} spu 
     * @returns 
     */
    initData(spu) {
      if (!spu) {
        return;
      }

      // 创建相关对象模型
      let viewItem = ViewItem.instance(spu);
      let fenceGroup = FenceGroup.instance(spu);
      let cellStatusHolder = CellStatusHolder.instance(fenceGroup.fences.length);

      // 创建处理器
      let viewItemHandler = ViewItemHandler.instance(viewItem, cellStatusHolder);
      let cellStatusHandler = CellStatusHandler.instance(fenceGroup, spu, viewItemHandler, cellStatusHolder);

      // 数据绑定
      this.data.fenceGroup = fenceGroup;
      this.data.viewItem = viewItem;
      this.data.cellStatusHolder = cellStatusHolder;
      this.data.viewItemHandler = viewItemHandler;
      this.data.cellStatusHandler = cellStatusHandler;
    },

    /**
     * 初始化渲染
     */
    initRender() {
      this.data.cellStatusHandler.initStatus();
      this.bindFenceGroupData(this.data.fenceGroup);
      this.bindViewItemData(this.data.viewItem);
    },

    // ================================================= events =================================================

    /**
     * 规格点击事件
     * 
     * @param {*} event 
     */
    onCellTap(event) {
      // fenceGroup
      let tapCell = Cell.instance(event.detail.cell);
      this.data.cellStatusHandler.tapCells([tapCell]);
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

    // ================================================= bindData =================================================

    bindFenceGroupData(fenceGroup) {
      this.setData({
        fenceGroup: fenceGroup
      });
    },

    bindViewItemData(viewItem) {
      this.setData({
        viewItem: viewItem
      });

      // 刷新详情页数据
      this.triggerEvent('getdata', { viewItem: viewItem }, { bubbles: true, composed: true });
    }

  }

})