/*
 * @Descripttion: 首页部分
 * @Author: wy
 * @Date: 2021年06月08日
 * @LastEditTime: 2021年06月13日
 */
import { request } from '../../request/index';
Page({
	data: {
		// 轮播图
		swiperList: [],
		// 导航菜单
		categoryList: [],
		// 楼层
		floorList: [],
	},
	async getSwiperListData() {
		const swiper = await request({ url: '/home/swiperdata' });
		const new_swiper = swiper.map((item) => ({
			...item,
			navigator_url: item.navigator_url.replace(/main/, 'index'),
		}));
		this.setData({ swiperList: new_swiper });
	},
	async getCategoryListData() {
		const category = await request({ url: '/home/catitems' });
		this.setData({ categoryList: category });
	},
	async getFloorListData() {
		const floor = await request({ url: '/home/floordata' });
		const new_floor = floor.map((item) => {
			return {
				...item,
				product_list: item.product_list.map((item1) => {
					return {
						...item1,
						navigator_url: item1.navigator_url.replace('?', '/index?'),
					};
				}),
			};
		});
		this.setData({
			floorList: new_floor,
		});
	},
	onLoad: function (options) {
		this.getSwiperListData();
		this.getCategoryListData();
		this.getFloorListData();
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
