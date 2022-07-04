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
    bindInitData(fenceGroup) {
      this.setData({
        fenceGroup: fenceGroup
      });
    },
    onCellTap(event) {
      let cell = event.detail.cell;
      let tapCell = Cell.instance({keyId: cell.keyId, valueId: cell.valueId});
      this.data.fenceGroup.select(tapCell);
      this.bindInitData(this.data.fenceGroup);
    }
  }
})