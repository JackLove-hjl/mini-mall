import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //*左侧菜单数据
        leftMenuList: [],
        //*右侧商品数据
        rightContent: [],
        //*被点击的左侧菜单索引
        currentIndex: 0,
        //*右侧滚动条距离顶部距离
        scrollTop: 0
    },
    Cates: [],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //*缓存技术
        //*1.获取本地存储数据
        const Cates = wx.getStorageSync("cates");
        //*2.不存在则发送数据
        if (!Cates) {
            this.getCates()
        } else {
            //*有旧数据 且没有过期就是用旧数据
            if (Date.now() - Cates.time > 10000) {
                this.getCates()
            } else {
                this.Cates = Cates.data
                    //*构造左侧大菜单数据
                let leftMenuList = this.Cates.map(v => v.cat_name)

                //*构造右侧商品数据
                let rightContent = this.Cates[0].children

                this.setData({
                    leftMenuList,
                    rightContent
                })
            }
        }


    },
    //*获取分类数据
    async getCates() {
        // request({
        //     url: "/categories"
        // }).then(res => {
        //     this.Cates = res.data.message

        //     //*把接口数据存入本地存储
        //     wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });


        //     //*构造左侧大菜单数据
        //     let leftMenuList = this.Cates.map(v => v.cat_name)

        //     //*构造右侧商品数据
        //     let rightContent = this.Cates[0].children

        //     this.setData({
        //         leftMenuList,
        //         rightContent
        //     })
        // })

        //*使用es77的esync  await发送请求
        const res = await request({ url: "/categories" })
        this.Cates = res

        //*把接口数据存入本地存储
        wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });


        //*构造左侧大菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name)

        //*构造右侧商品数据
        let rightContent = this.Cates[0].children

        this.setData({
            leftMenuList,
            rightContent
        })
    },

    //*左侧菜单点击事件
    handleItemTap(e) {
        const { index } = e.currentTarget.dataset
            //*根据不同索引渲染右侧内容
        let rightContent = this.Cates[index].children
        this.setData({
            currentIndex: index,
            rightContent,
            scrollTop: 0
        })
    }

})