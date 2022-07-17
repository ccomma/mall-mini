import { CellStatusConstant } from "../../../constants/common-constant";

Component({
  data: {},
  properties: {
    cell: Object
  },
  methods: {
    onTap(event) {
      let cell = this.properties.cell;
      if (cell.status === CellStatusConstant.FORBIDDEN) {
        return;
      }
      
      // 子组件向父组件回传参数
      this.triggerEvent('celltap', {
        cell: cell
      }, {
        // 开启冒泡
        bubbles: true,
        // 跨越组件边界
        composed: true
      });
    }
  }
})