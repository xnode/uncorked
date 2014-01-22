Template.wineItem.helpers({
	niceYear: function() {
		if (this.year) {
			return this.year;
		} else {
			return '0000';
		}
	}	
});