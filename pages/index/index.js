/*
 * @Descripttion: 首页部分
 * @Author: wy
 * @Date: 2021年06月08日
 * @LastEditTime: 2021年06月13日
 */
Page({
	data: {
		// 轮播图
		swiperList: [],
	},
	//options(Object)
	onLoad: function (options) {
		let reqTask = wx.request({
			url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
			data: {},
			header: { 'content-type': 'application/json' },
			method: 'GET',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				this.setData({
					swiperList:result.data.message,
				});
			},
			fail: () => {},
			complete: () => {},
		});
	},
	onReady: function () {},
	onShow: function () {},
	onHide: function () {},
	onUnload: function () {},
	onPullDownRefresh: function () {},
	onReachBottom: function () {},
	onShareAppMessage: function () {},
	onPageScroll: function () {},
	//item(index,pagePath,text)
	onTabItemTap: function (item) {},
});
