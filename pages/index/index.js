//*小程序中路径要写全
import { request } from "../../request/index.js";

Page({
    data: {
        //*轮播图数组
        swiperList: [],
        //*导航数组
        catesList: [],
        //*楼层数据
        floorList: [],
        swiperNavigatorUrl: [],
        floorNavigatorUrl: []
    },
    //页面开始加载触发
    onLoad: function(options) {
        //*发送异步请求获取轮播图数据
        this.getSwiperList()
        this.getCatesList()
        this.getFloorList()


    },
    onShow() {

    },
    getSwiperList() {
        request({
            url: "/home/swiperdata"
        }).then(res => {
            let url = res.map(v => {
                return v.navigator_url.replace(/main/, "goods_detail")
            })
            this.setData({
                swiperList: res,
                swiperNavigatorUrl: url
            })
        })
    },
    getCatesList() {
        request({
            url: "/home/catitems"
        }).then(res => {
            this.setData({
                catesList: res
            })
        })
    },
    getFloorList() {
        request({
            url: "/home/floordata"
        }).then(res => {
            let url = res.map(v => {
                return v.product_list.map(item => {
                    return item.navigator_url.replace(/goods_list/, 'goods_list/goods_list')
                })
            })
            this.setData({
                floorList: res,
                floorNavigatorUrl: url
            })
        })
    },

});