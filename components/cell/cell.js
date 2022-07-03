Component({
  data: {},
  properties: {
    cell: Object
  },
  methods: {
    onTap(event) {
      // 子组件向父组件回传参数
      this.triggerEvent('celltap', {
        cell: this.properties.cell
      }, {
        // 开启冒泡
        bubbles: true,
        // 跨越组件边界
        composed: true
      });
    }
  }
})