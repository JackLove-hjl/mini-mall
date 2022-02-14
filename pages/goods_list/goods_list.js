import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                value: "综合",
                isActive: true
            },
            {
                id: 1,
                value: "销量",
                isActive: false
            },
            {
                id: 2,
                value: "价格",
                isActive: false
            }
        ],
        goodsList: []
    },
    QueryParams: {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10
    },
    titalPages: 1,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.QueryParams.cid = options.cid || ''
        this.QueryParams.query = options.query || ''
        this.getGoodsList()
    },

    async getGoodsList() {
        const res = await request({ url: "/goods/search", data: this.QueryParams })
            //*获取页面总条数
        const total = res.total
        this.totalPages = Math.ceil(total / this.QueryParams.pagesize)

        if (this.data.goodsList) {
            this.setData({
                //!使用数组解构二者均不可为空,否则会报错
                goodsList: [...this.data.goodsList, ...res.goods]
            })
        } else {
            this.setData({
                goodsList: [...res.goods]
            })
        }
        //*关闭下拉刷新窗口(若没有下拉窗口,直接关闭也不会报错)
        wx.stopPullDownRefresh()


    },
    handletabsItemChange(e) {
        const { index } = e.detail
        let { tabs } = this.data
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
        this.setData({
            tabs
        })
    },
    //*上滑触底加载数据
    onReachBottom() {
        //*判断有没有下一页数据
        if (this.QueryParams.pagenum >= this.totalPages) {
            wx.showToast({
                title: '已经到底了',
                icon: 'none'
            });

        } else {
            this.QueryParams.pagenum++;
            this.getGoodsList()
        }
    },
    //*下拉刷新
    onPullDownRefresh() {
        this.setData({
            goodsList: []
        })
        this.QueryParams.pagenum = 1
        this.getGoodsList()
    }


})