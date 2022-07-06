import { Item } from "../../models/item";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      skuList: [{
        specs: [{
          keyId: 1,
          key: '颜色',
          valueId: 1,
          value: '金属灰'
        },{
          keyId: 2,
          key: '图案',
          valueId: 4,
          value: '七龙珠'
        },{
          keyId: 3,
          key: '尺寸',
          valueId: 7,
          value: '小号 S'
        },{
          keyId: 4,
          key: '款式',
          valueId: 10,
          value: '短袖'
        }],
        stock: 100
      },{
        specs: [{
          keyId: 1,
          key: '颜色',
          valueId: 2,
          value: '青芒色'
        },{
          keyId: 2,
          key: '图案',
          valueId: 5,
          value: '灌篮高手'
        },{
          keyId: 3,
          key: '尺寸',
          valueId: 8,
          value: '中号 M'
        },{
          keyId: 4,
          key: '款式',
          valueId: 10,
          value: '短袖'
        }],
        stock: 100
      },{
        specs: [{
          keyId: 1,
          key: '颜色',
          valueId: 2,
          value: '青芒色'
        },{
          keyId: 2,
          key: '图案',
          valueId: 6,
          value: '圣斗士'
        },{
          keyId: 3,
          key: '尺寸',
          valueId: 9,
          value: '大号 L'
        },{
          keyId: 4,
          key: '款式',
          valueId: 10,
          value: '短袖'
        }],
        stock: 100
      },{
        specs: [{
          keyId: 1,
          key: '颜色',
          valueId: 3,
          value: '橘黄色'
        },{
          keyId: 2,
          key: '图案',
          valueId: 4,
          value: '七龙珠'
        },{
          keyId: 3,
          key: '尺寸',
          valueId: 7,
          value: '小号 S'
        },{
          keyId: 4,
          key: '款式',
          valueId: 10,
          value: '短袖'
        }],
        stock: 100
      },{
        specs: [{
          keyId: 1,
          key: '颜色',
          valueId: 3,
          value: '橘黄色'
        },{
          keyId: 2,
          key: '图案',
          valueId: 4,
          value: '七龙珠'
        },{
          keyId: 3,
          key: '尺寸',
          valueId: 9,
          value: '大号 L'
        },{
          keyId: 4,
          key: '款式',
          valueId: 10,
          value: '短袖'
        }],
        stock: 0
      },{
        specs: [{
          keyId: 1,
          key: '颜色',
          valueId: 11,
          value: '远峰蓝'
        },{
          keyId: 2,
          key: '图案',
          valueId: 12,
          value: '高达'
        },{
          keyId: 3,
          key: '尺寸',
          valueId: 13,
          value: '超大号 L'
        },{
          keyId: 4,
          key: '款式',
          valueId: 14,
          value: '长袖'
        }],
        stock: 0
      }]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let pid = options.pid;
    // let item = await Item.getWithSkuList(pid);
    // this.setData({
    //   item: item
    // });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})