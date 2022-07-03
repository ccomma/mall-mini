import { FenceGroup } from "../models/fence-group";

Component({
  data: {
    fences:[]
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
        fences: fenceGroup.fences
      });
    }
  }
})