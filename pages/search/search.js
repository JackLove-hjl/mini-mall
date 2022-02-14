import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods: [],
        isFocus: false,
        inputValue: ''
    },
    TimeId: -1,
    //*输入框值改变触发事件
    handleInput(e) {
        const { value } = e.detail
        if (!value.trim()) {
            this.setData({
                goods: [],
                isFocus: false
            })
            return
        }
        this.setData({ isFocus: true })
        clearTimeout(this.TimeId)
        this.TimeId = setTimeout(() => [
            this.qsearch(value)
        ], 500)

    },
    //*发送请求获取搜索结果
    async qsearch(query) {
        const goods = await request({ url: "/goods/qsearch", data: { query } })
        this.setData({
            goods
        })
    },
    //*点击取消按钮
    handleCencel() {
        this.setData({
            inputValue: '',
            isFocus: false,
            goods: []
        })
    }
})