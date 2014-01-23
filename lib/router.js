Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return Meteor.subscribe('wines'); }
});

Router.map(function() {
	this.route('winesList', { path: '/' })
});