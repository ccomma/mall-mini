// components/common/badge-button/badge-button.js
Component({
  externalClasses: ["icon", "out-class"],

  /**
   * 组件的属性列表
   */
  properties: {

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
    onTap(event) {
      this.triggerEvent("btntap", {}, { bubbles: !0, composed: !0 });
    }
  }
})
