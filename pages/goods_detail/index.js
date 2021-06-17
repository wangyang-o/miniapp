// pages/goods_detail/index.js
import { request } from '../../request/index';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		goodsDeatilData: {},
		isCollect: false,
	},
	async getGoodsDetailData(id) {
		const res = await request({
			url: '/goods/detail',
			data: id,
		});
		this.goodsInfo = {
			goods_name: res.goods_name,
			goods_price: res.goods_price,
			pics: res.pics,
			goods_id: id.goods_id,
			num: 0,
			isChecked: true,
		};
		this.setData({
			goodsDeatilData: {
				goods_name: res.goods_name,
				goods_price: res.goods_price,
				// iphone部分手机不识别webp图片格式
				goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg'),
				pics: res.pics,
			},
		});
	},
	// 点击轮播图放大预览
	handlePreviewImg(e) {
		const current = e.currentTarget.dataset.url;
		// 1.先构造要预览的图片数组
		const urls = this.data.goodsDeatilData.pics.map((item) => item.pics_mid);
		wx.previewImage({
			current, // 当前显示图片的http链接
			urls, // 需要预览的图片http链接列表
		});
	},
	// 点击加入购物车
	handleCartAdd() {
		let cart = wx.getStorageSync('cart') || [];
		let index = cart.findIndex((item) => {
			return item.goods_id === this.goodsInfo.goods_id;
		});
		if (index === -1) {
			// 不存在
			this.goodsInfo.num = 1;
			cart.push(this.goodsInfo);
			wx.showToast({
				title: '添加购物车成功',
				icon: 'success',
				mask: true,
			});
		} else {
			// 存在
			cart[index].num++;
			wx.showToast({
				title: '商品数量+1',
				icon: 'success',
				mask: true,
			});
		}
		wx.setStorageSync('cart', cart);
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		let pages = getCurrentPages();
		let currentPage = pages[pages.length - 1];
		console.log(currentPage);
		let options = currentPage.options;
		this.getGoodsDetailData(options);
		// 1.获取缓存中的购物车数据
		let collect = wx.getStorageSync('collect') || [];
		// 2.判断该商品是否存在于缓存数组中
		// some() 方法用于检测数组中的元素是否满足指定条件（函数提供）
		let isCollect = collect.some((item) => {
			return item.goods_id === options.goods_id;
		});
		this.setData({
			goodsInfo: options.goods_id,
			isCollect,
		});
	},

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
	onPullDownRefresh: function () {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {},
});
