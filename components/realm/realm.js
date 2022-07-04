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

      this.bindInitData(FenceGroup.instance(item));
    }
  },
  methods: {
    onCellTap(event) {
      this.data.fenceGroup.select(Cell.instance(event.detail.cell));
      this.bindInitData(this.data.fenceGroup);
    },
    bindInitData(fenceGroup) {
      this.setData({
        fenceGroup: fenceGroup
      });
    }
  }
})