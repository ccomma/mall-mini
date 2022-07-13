import { ShoppingTypeConstant } from "../../constants/common-constant";
import { Item } from "../../models/item";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      itemName: '【海外名品】【100%正品|已质检】高级联名限量版衣服',
      image: 'https://img12.360buyimg.com/n1/jfs/t1/218841/29/10294/238788/61d82744Ec7eecae7/ea10f975e09d5743.jpg',
      imageList: ['https://img12.360buyimg.com/n1/jfs/t1/218841/29/10294/238788/61d82744Ec7eecae7/ea10f975e09d5743.jpg', 'https://img12.360buyimg.com/n1/jfs/t1/157867/24/24911/216189/61d82746E1b987814/4bed4d80ade7370a.jpg', 'http://img11.360buyimg.com//n0/jfs/t1/91576/31/21045/230194/61d8274cEea559838/f6c6389c6d69c1b2.jpg', 'https://img14.360buyimg.com/n1/jfs/t1/126962/13/21249/216535/61d82748Ee8b442e7/af37082e488aedbe.jpg'],
      price: 35,
      skuList: [{
        specs: [{
          keyId: 1,
          key: '颜色',
          valueId: 1,
          value: '白色',
          image: 'https://img12.360buyimg.com/n1/jfs/t1/218841/29/10294/238788/61d82744Ec7eecae7/ea10f975e09d5743.jpg'
        }, {
          keyId: 2,
          key: '图案',
          valueId: 4,
          value: '七龙珠'
        }, {
          keyId: 3,
          key: '尺寸',
          valueId: 7,
          value: '小号 S'
        }, {
          keyId: 4,
          key: '款式',
          valueId: 10,
          value: '短袖'
        }],
        image: 'https://img12.360buyimg.com/n1/jfs/t1/218841/29/10294/238788/61d82744Ec7eecae7/ea10f975e09d5743.jpg',
        stock: 100,
        price: 35
      }, {
        specs: [{
          keyId: 1,
          key: '颜色',
          valueId: 2,
          value: '黑色',
          image: 'https://img12.360buyimg.com/n1/jfs/t1/157867/24/24911/216189/61d82746E1b987814/4bed4d80ade7370a.jpg'
        }, {
          keyId: 2,
          key: '图案',
          valueId: 5,
          value: '灌篮高手'
        }, {
          keyId: 3,
          key: '尺寸',
          valueId: 8,
          value: '中号 M'
        }, {
          keyId: 4,
          key: '款式',
          valueId: 10,
          value: '短袖'
        }],
        image: 'https://img12.360buyimg.com/n1/jfs/t1/157867/24/24911/216189/61d82746E1b987814/4bed4d80ade7370a.jpg',
        stock: 100,
        price: 45
      }, {
        specs: [{
          keyId: 1,
          key: '颜色',
          valueId: 2,
          value: '黑色',
          image: 'https://img12.360buyimg.com/n1/jfs/t1/157867/24/24911/216189/61d82746E1b987814/4bed4d80ade7370a.jpg'
        }, {
          keyId: 2,
          key: '图案',
          valueId: 6,
          value: '圣斗士'
        }, {
          keyId: 3,
          key: '尺寸',
          valueId: 9,
          value: '大号 L'
        }, {
          keyId: 4,
          key: '款式',
          valueId: 10,
          value: '短袖'
        }],
        image: 'https://img12.360buyimg.com/n1/jfs/t1/157867/24/24911/216189/61d82746E1b987814/4bed4d80ade7370a.jpg',
        stock: 100,
        price: 46
      }, {
        specs: [{
          keyId: 1,
          key: '颜色',
          valueId: 3,
          value: '橘色',
          image: 'http://img11.360buyimg.com//n0/jfs/t1/91576/31/21045/230194/61d8274cEea559838/f6c6389c6d69c1b2.jpg'
        }, {
          keyId: 2,
          key: '图案',
          valueId: 4,
          value: '七龙珠'
        }, {
          keyId: 3,
          key: '尺寸',
          valueId: 7,
          value: '小号 S'
        }, {
          keyId: 4,
          key: '款式',
          valueId: 10,
          value: '短袖'
        }],
        image: 'http://img11.360buyimg.com//n0/jfs/t1/91576/31/21045/230194/61d8274cEea559838/f6c6389c6d69c1b2.jpg',
        stock: 100,
        price: 55,
        memberPrice: 45
      }, {
        specs: [{
          keyId: 1,
          key: '颜色',
          valueId: 3,
          value: '橘色',
          image: 'http://img11.360buyimg.com//n0/jfs/t1/91576/31/21045/230194/61d8274cEea559838/f6c6389c6d69c1b2.jpg'
        }, {
          keyId: 2,
          key: '图案',
          valueId: 4,
          value: '七龙珠'
        }, {
          keyId: 3,
          key: '尺寸',
          valueId: 9,
          value: '大号 L'
        }, {
          keyId: 4,
          key: '款式',
          valueId: 10,
          value: '短袖'
        }],
        image: 'http://img11.360buyimg.com//n0/jfs/t1/91576/31/21045/230194/61d8274cEea559838/f6c6389c6d69c1b2.jpg',
        stock: 0,
        price: 56
      }, {
        specs: [{
          keyId: 1,
          key: '颜色',
          valueId: 11,
          value: '粉色',
          image: 'https://img14.360buyimg.com/n1/jfs/t1/126962/13/21249/216535/61d82748Ee8b442e7/af37082e488aedbe.jpg'
        }, {
          keyId: 2,
          key: '图案',
          valueId: 12,
          value: '高达'
        }, {
          keyId: 3,
          key: '尺寸',
          valueId: 13,
          value: '超大号 L'
        }, {
          keyId: 4,
          key: '款式',
          valueId: 14,
          value: '长袖'
        }],
        image: 'https://img14.360buyimg.com/n1/jfs/t1/126962/13/21249/216535/61d82748Ee8b442e7/af37082e488aedbe.jpg',
        stock: 0,
        price: 65
      }]
    },
    showRealm: false,
    shoppingType: ''
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

  },

  /**
   * 前往店铺
   * 
   * @param {*} event 
   */
  onGoToShop(event) {
  },
  /**
   * 前往客服
   * 
   * @param {*} event 
   */
  onGoToChat(event) {
  },
  /**
   * 前往购物车
   * 
   * @param {*} event 
   */
  onGoToCart(event) {
    this.router.navigateTo({
      url: '/pages/cart/cart'
    })
  },
  /**
   * 加入购物车
   * 
   * @param {*} event 
   */
  onAddToCart(event) {
    this.setData({
      showRealm: true,
      shoppingType: ShoppingTypeConstant.CART
    });
  },
  /**
   * 立即购买
   * 
   * @param {*} event 
   */
  onBuy(event) {
    this.setData({
      showRealm: true,
      shoppingType: ShoppingTypeConstant.BUY
    });
  },
  /**
   * 购买
   * 
   * @param {*} event 
   */
  onConfirmTap(event) {
    // 根据点击类型加入购物车还是账单页（转换为 CartItem 进行算价）
    // 加入购物车
    if (this.data.shoppingType === ShoppingTypeConstant.CART) {

    }
    // 购买，跳转至账单页
    else {

    }
  }

})