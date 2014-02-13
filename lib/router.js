Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return [ Meteor.subscribe('wines'), Meteor.subscribe('checkins') ]; }
});

Router.map(function() {
	this.route('winesList', { path: '/' }),
	this.route('winePage', { 
		path: '/wines/:_id',
		data: function() { 
			return Wines.findOne(this.params._id); 
		},
		waitOn: function() {
			return Meteor.subscribe('checkins', this.params._id);
		}
	});

	this.route('wineAdd', { 
		path: '/wine/add'
	});

	this.route('wineEdit', {
		path: '/wines/:_id/edit',
		data: function() { return Wines.findOne(this.params._id); }
	})
});

var requireLogin = function() {
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
			this.stop();
		}
	}
}

Router.before(requireLogin, { only: ['wineAdd', 'wineEdit']});
Router.before(function() { Errors.clearSeen(); });