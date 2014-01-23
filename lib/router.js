Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return Meteor.subscribe('wines'); }
});

Router.map(function() {
	this.route('winesList', { path: '/' }),
	this.route('winePage', { 
		path: '/wines/:_id',
		data: function() { return Wines.findOne(this.params._id); }
	});
});