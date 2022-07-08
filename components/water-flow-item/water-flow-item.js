Component({
  data: {},
  properties: {
    data: Object
  },
  // 监听
  observers: {
    data: function (data) {
      // 数据处理
    }
  },
  methods: {
    onItemTap(event) {
      let pid = event.currentTarget.dataset.pid;
      this.router.navigateTo({
        url: `/pages/item-detail/item-detail?pid=${pid}`
      })
    }
  }
})