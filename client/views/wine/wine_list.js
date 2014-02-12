Template.winesList.helpers({
	wines: function() {
		return Wines.find({}, { sort: { country: 1, producer: 1, name: 1, year: -1} });
	}	
});