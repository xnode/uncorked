Template.wineItem.helpers({
	niceYear: function() {
		if (this.year) {
			return this.year;
		} else {
			return '0000';
		}
	},

	ownWine: function() {
		return Meteor.user() && this.creatorId == Meteor.userId();
	}
});