Template.winesList.helpers({
	wines: function() {
		return Wines.find();
	}	
});