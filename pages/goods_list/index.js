// pages/goods_list/index.js
import { request } from '../../request/index';
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		titles: [
			{ id: 0, name: '综合', isActive: true },
			{ id: 1, name: '销量', isActive: false },
			{ id: 2, name: '价格', isActive: false },
		],
		currentIndex: 0,

		goodsList: [],
	},
	//获取商品列表参数
	goodParams: {
		query: '',
		cid: '',
		pagenum: 1,
		pagesize: 10,
	},
	//总页数
	maxPagenum: 1,
	//Tabs切换
	handleTabItemChange(e) {
		const index = e.detail.index;
		console.log(index);
		const titles = this.data.titles;
		titles.forEach((v, i) =>
			i == index ? (v.isActive = true) : (v.isActive = false),
		);
		this.setData({
			titles,
		});
	},
	//获取商品列表数据
	async getGoodsList() {
		const res = await request({ url: '/goods/search', data: this.goodParams });
		this.maxPagenum = Math.ceil(res.total / this.goodParams.pagesize);
		this.setData({
			goodsList: [...this.data.goodsList, ...res.goods],
		});
		wx.stopPullDownRefresh();
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.goodParams.cid = options.cid || '';
		this.goodParams.query = options.query || '';
		this.getGoodsList();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
		this.goodParams.pagenum = 1;
		this.data.goodsList = [];
		this.getGoodsList();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		if (this.goodParams.pagenum >= this.maxPagenum) {
			wx.showToast({ title: '没有下一页数据' });
		} else {
			this.goodParams.pagenum++;
			this.getGoodsList();
		}
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {},
});
