// pages/home/home.js

import {Carousel} from "../../models/carousel";
import {Category} from "../../models/category";
import {Item} from "../../models/item";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 分类
    categoryList: [{ name: '首页' }, { name: '家电' }, { name: '数码' }, { name: '食品饮料' }, { name: '电脑办公' }, { name: '个护清洁' }, { name: '女装' }, { name: '宠物' }, { name: '爱车' }, { name: '箱包工具' }, { name: '男鞋' }],
    // 轮播图
    carouselList: [{ imageUrl: 'https://imgcps.jd.com/ling4/100019386660/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5f3a47329785549f6bc7a6f8/80c01a53/cr/s/q.jpg' }, { imageUrl: 'https://img14.360buyimg.com/pop/s1180x940_jfs/t1/125178/3/27426/83461/624e59efE96592896/c1a950159a19922e.jpg.webp' }],
    // 瀑布流分页数据
    itemPaging: {},
    // 底部加载文字类型
    loadingType: 'loading'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initData();

    // 瀑布流数据
    this.data.itemPaging = Item.getPaging();
    this.renderWaterFlowData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.renderWaterFlowData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() { },

  /**
   * 初始化数据
   */
  async initData() {
    // 轮播图
    let carouselList = await Carousel.getList();

    // 分类
    let categoryList = await Category.getTopList();
    categoryList.unshift({ id: -1, name: '首页' });

    // 设置数据
    this.setData({
      carouselList: carouselList,
      categoryList: categoryList
    });
  },

  async renderWaterFlowData() {
    // let pagingResult = await this.data.itemPaging.next();
    // if (!pagingResult) {
    //   return;
    // }
    // wx.lin.renderWaterFlow(pagingResult.list);
    // if (!pagingResult.hasNext) {
    //   this.setData({
    //     loadingType: 'end'
    //   })
    // }

    let demo = { id: '-1', image: 'https://img12.360buyimg.com/shaidan/jfs/t1/80869/33/20210/448300/62b96e0cE0bd0ee62/ecad9a7724d40903.jpg.webp', name: '凯度（CASDON）凯度蒸烤箱电蒸箱家用 台式蒸烤一体机 SV3080DEB-B7', price: 2299.10 }
    let demoList = [];
    for (let i = 0; i < 10; i++) {
      demoList.push(demo);
    }
    wx.lin.renderWaterFlow(demoList);
  }

});
