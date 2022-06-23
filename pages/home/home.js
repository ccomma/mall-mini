// pages/home/home.js

import { Carousel } from "../../model/carousel";
import { Category } from "../../model/category";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    carouselA: {},
    carouselList: [],
    topCategoryList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
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
    const carouselList = await Carousel.getCarouselList();
    const topCategoryList = await Category.getTopCategoryList();
    this.setData({
      carouselA: carouselList[1],
      carouselList: carouselList,
      topCategoryList: topCategoryList
    });
  }

});
