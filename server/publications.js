Meteor.publish('wines', function() {
	return Wines.find();
});

Meteor.publish('checkins', function(wineId) {
	return Checkins.find({wineId: wineId});
});