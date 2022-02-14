//*记录异步请求次数
let ajaxTimes = 0;
export const request = (params) => {
    //*显示加载中图标
    ajaxTimes++
    wx.showLoading({
        title: '加载中',
        mask: true
    });

    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                ajaxTimes--
                if (ajaxTimes === 0) {
                    //*关闭加载中图标
                    wx.hideLoading();
                }


            }
        });
    })
}