Template.winePage.helpers({
	checkins: function() {
		return Checkins.find({wineId:this._id});
	}
})