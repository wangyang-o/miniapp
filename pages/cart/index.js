// pages/cart/index.js
import {
	getSetting,
	chooseAddress,
	openSetting,
	showModal,
	showToast,
} from '../../utils/asyncWx.js';
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		//收货地址
		address: {},
		//购物车
		cart: [],
		// 全选状态
		allChecked: true,
		//总价
		totalPrice: 0,
		//总数量
		totalNum: 0,
	},
	//添加收货地址事件
	async addressChoose() {
		try {
			const scope = await getSetting();
			if (scope === false) {
				await openSetting();
			}
			let address = await chooseAddress();
			address.all =
				address.provinceName +
				address.cityName +
				address.countyName +
				address.detailInfo;
			wx.setStorageSync('address', address);
		} catch (err) {
			console.log(err);
		}
	},
	//更新购物车数据
	setCart(cart) {
		let totalPrice = 0;
		let totalNum = 0;
		let allChecked = true;
		cart.forEach((v) => {
			if (v.checked) {
				totalPrice += v.num * v.goods_price;
				totalNum += v.num;
			} else {
				allChecked = false;
			}
		});
		allChecked = cart.length ? allChecked : false;
		this.setData({
			cart,
			allChecked,
			totalPrice,
			totalNum,
		});
		wx.setStorageSync('cart', cart);
	},
	 //商品选择状态改变
	 handleItemChange(e) {
        const { id } = e.currentTarget.dataset;
        const { cart } = this.data;
        const index = cart.findIndex(v => v.goods_id === id);
        cart[index].checked = !cart[index].checked;
        this.setCart(cart)
    },
    // 全选按钮改变
    handleItemAllChange() {
        const { allChecked, cart } = this.data;
        cart.forEach(v => v.checked = !allChecked);
        this.setCart(cart)
    },
    //数量改变
    async numChange(e) {
        const { id, opration } = e.currentTarget.dataset;
        const { cart } = this.data;
        const index = cart.findIndex(v => v.goods_id === id);
        if (cart[index].num === 1 && opration === -1) {
            const res = await showModal('是否删除商品')
            if (res.confirm) {
                cart.splice(index, 1);
                this.setCart(cart)
                return
            }
        }
        cart[index].num += opration
        this.setCart(cart)
    },
    //结算
    async allPlay() {
        const { totalNum, address } = this.data;
        if (!address.userName) {
            await showToast('未填联系方式')
        } else if (totalNum === 0) {
            await showToast('未选择商品')
        } else {
            wx.navigateTo({
                url: '/pages/pay/index',
            })
        }

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
		//收货地址接收
		const address = wx.getStorageSync('address');
		this.setData({
			address,
		});
		//购物车接收
		const cart = wx.getStorageSync('cart') || [];
		this.setCart(cart);
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
