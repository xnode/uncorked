Meteor.publish('wines', function() {
	return Wines.find();
});

Meteor.publish('checkins', function() {
	return Checkins.find();
});