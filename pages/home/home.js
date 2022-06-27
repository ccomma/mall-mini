// pages/home/home.js

import { Carousel } from "../../model/carousel";
import { Category } from "../../model/category";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    carouselList: [{imageUrl:'https://imgcps.jd.com/ling4/100019386660/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5f3a47329785549f6bc7a6f8/80c01a53/cr/s/q.jpg'},{imageUrl:'https://img14.360buyimg.com/pop/s1180x940_jfs/t1/125178/3/27426/83461/624e59efE96592896/c1a950159a19922e.jpg.webp'}],
    categoryList: [{name:'首页'},{name:'家电'},{name:'数码'},{name:'食品饮料'},{name:'电脑办公'},{name:'个护清洁'},{name:'女装'},{name:'宠物'},{name:'爱车'},{name:'箱包工具'},{name:'男鞋'}],
    modelList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initData();
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
  onReachBottom() { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() { },

  /**
   * 初始化数据
   */
  async initData() {
    // 轮播图
    const carouselList = await Carousel.getCarouselList();

    // 分类
    const categoryList = await Category.getTopCategoryList();
    categoryList.unshift({name:'首页'});

    // 设置数据
    this.setData({
      carouselList: carouselList,
      categoryList: categoryList
    });
  }

});
