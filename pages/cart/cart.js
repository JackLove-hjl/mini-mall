import { showModal, showToast } from "../../utils/util.js"
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        allChecked: false,
        totalPrice: 0,
        totalNum: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function() {
        const address = wx.getStorageSync("address");
        const cart = wx.getStorageSync("cart") || [];
        this.setData({ address })
        this.setCart(cart)
    },
    //*点击添加收货地址
    handleChooseAddress() {
        // wx.getStorageSync("address");

        //*获取收货地址
        wx.chooseAddress({
            success: (result) => {
                result.all = result.provinceName + result.cityName + result.countyName + result.detailInfo
                wx.setStorageSync("address", result);
            }
        });

    },
    //*监听商品的复选框点击
    handleItemChange(e) {
        const goods_id = e.currentTarget.dataset.id
        let { cart } = this.data
        let index = cart.findIndex(v => v.goods_id === goods_id)
        cart[index].checked = !cart[index].checked
        this.setCart(cart)

    },

    //*设置购物车状态
    setCart(cart) {
        let allChecked = true
        let totalPrice = 0
        let totalNum = 0
        cart.forEach(v => {
            if (v.checked) {
                totalPrice += v.num * v.goods_price
                totalNum += v.num
            } else {
                allChecked = false
            }
        })
        allChecked = cart.length != 0 ? allChecked : false
        this.setData({
            cart,
            totalPrice,
            totalNum,
            allChecked
        })
        wx.setStorageSync("cart", cart);
    },
    handleItemAllCheck() {
        let { cart, allChecked } = this.data
        allChecked = !allChecked
        cart.forEach(v => v.checked = allChecked)
        this.setCart(cart)
    },
    //*监听+ -按钮点击
    handleItemNumEdit(e) {
        const { opration, id } = e.currentTarget.dataset
        let { cart } = this.data
            //*找到需要修改的索引
        const index = cart.findIndex(v => v.goods_id === id)
        if (cart[index].num === 1 && opration === -1) {
            showModal({ content: '您是否要删除该商品?' }).then(res => {
                if (res.confirm) {
                    cart.splice(index, 1)
                    this.setCart(cart)
                }
            })
        } else {
            cart[index].num += opration
            this.setCart(cart)
        }

    },
    //*监听结算的点击
    async handlePaybtn() {
        const { address, totalNum } = this.data
        if (!address.userName) {
            await showToast({ title: '您还没有选择收货地址' })
            return
        }
        if (totalNum === 0) {
            await showToast({ title: '您还没有选购商品' })
            return
        }
        wx.navigateTo({
            url: '/pages/pay/pay'
        });

    }


})