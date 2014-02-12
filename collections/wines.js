Wines = new Meteor.Collection('wines');
Grapes = new Meteor.Collection('grapes');
Checkins = new Meteor.Collection('checkins');
Wines.allow({
	update: function(userId, doc) {
		return userId && doc.creatorId == userId;
	},
	remove: function(userId, doc) {
		return userId && doc.creatorId == userId;
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
			submitted: new Date().getTime()
		});

		var wineId = Wines.insert(wine);
		return wineId;
	}
})

