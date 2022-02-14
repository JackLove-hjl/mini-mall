import { showModal, showToast } from "../../utils/util.js"
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        totalPrice: 0,
        totalNum: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function() {
        const address = wx.getStorageSync("address");
        let cart = wx.getStorageSync("cart") || [];
        //*checked为true的购物车数组   
        cart = cart.filter(v => v.checked)
        this.setData({ address })
        wx.set
        let totalPrice = 0
        let totalNum = 0
        cart.forEach(v => {
            totalPrice += v.num * v.goods_price
            totalNum += v.num
        })
        this.setData({
            cart,
            totalPrice,
            totalNum,
            address
        })
    },
    handlePay() {
        let cart = wx.getStorageSync("cart");
        let newCart = cart.filter(v => !v.checked)
        wx.setStorageSync("cart", newCart);
        wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 1500
        })
        setTimeout(() => {
            wx.navigateBack({
                delta: 1
            });

        }, 1500)

    }

})