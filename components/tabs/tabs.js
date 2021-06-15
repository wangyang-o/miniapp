Component({
	data: {
		currentIndex: 0,
	},
	properties: {
		titles: { type: Array, value: [] },
	},
	methods: {
		handleItemTap(e) {
			const { index } = e.currentTarget.dataset;
      console.log(index);
			this.setData({
				currentIndex: index,
			});
			this.triggerEvent('tabItemChange', { index });
		},
	},
});
