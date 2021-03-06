Wines = new Meteor.Collection('wines');
Grapes = new Meteor.Collection('grapes');
Checkins = new Meteor.Collection('checkins');

Wines.allow({
	update: ownsDocument,
	remove: ownsDocument
});

Wines.deny({
	update: function(userId, wine, fieldNames) {
		return (_.without(fieldNames, 'name', 'year', 'country', 'producer').length > 0);
	}	
});

Meteor.methods({
	wineadd: function(wineAttributes) {
		var user = Meteor.user();
		var sameWine = Wines.findOne({ name: wineAttributes.name, 
			producer: wineAttributes.producer, year: wineAttributes.year, country: wineAttributes.country });
		// TODO: also check almost same wines and suggest unless users says otherwise.

		if (!user)
			throw new Meteor.error(401, "You need to be logged in in order to add wines.");

		if (!wineAttributes.name || !wineAttributes.producer || !wineAttributes.country)
			throw new Meteor.error(422, "Please fill name, producer and country");

		if (sameWine)
			throw new Meteor.error(302, "Wine exists already", sameWine._id);

		var wine = _.extend(_.pick(wineAttributes, 'name', 'producer', 'year', 'country'), {
			creatorId: user._id,
			submitted: new Date().getTime(),
			checkins: 0,
			score: 0
		});

		var wineId = Wines.insert(wine);
		return wineId;
	},

	checkin: function(checkinAttributes) {
		var user =  Meteor.user();
		var wine = Wines.findOne(checkinAttributes.wineId);

		if (!user)
			throw new Meteor.Error(401, "You need to login to checkin");
		if (!wine)
			throw new Meteor.Error(422, 'You must checkin to a wine.');
		
		checkin = _.extend(_.pick(checkinAttributes, 'wineId'), { 
			userId: user._id,
			username: user.username,
			submitted: new Date().getTime()
		});
		Wines.update(checkin.wineId, {$inc: {checkinCount: 1}});
		
		return Checkins.insert(checkin);
	}
})

