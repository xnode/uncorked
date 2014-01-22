Meteor.publish('wines', function() {
	return Wines.find();
});