Component({
  data: {},
  properties: {},
  methods: {
    /**
     * 前往店铺
     * 
     * @param {*} event 
     */
    onGoToShop(event) {
      this.triggerEvent('gotoshop');
    },
    /**
     * 前往客服
     * 
     * @param {*} event 
     */
    onGoToChat(event) {
      this.triggerEvent('gotochat');
    },
    /**
     * 前往购物车
     * 
     * @param {*} event 
     */
    onGoToCart(event) {
      this.triggerEvent('gotocart');
    },
    /**
     * 加入购物车
     * 
     * @param {*} event 
     */
    onAddToCart(event) {
      this.triggerEvent('addtocart');
    },
    /**
     * 立即购买
     * 
     * @param {*} event 
     */
    onBuy(event) {
      this.triggerEvent('buy');
    }
  }
})