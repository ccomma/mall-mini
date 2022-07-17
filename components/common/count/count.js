// components/count/count.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number,
      value: 1
    },
    max: {
      type: Number,
      value: 200
    },
    min: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCounterTap(event) {
      this.triggerEvent('countertap', event.detail);
    }
  }
})
