Template.wineAdd.events({
	'submit form': function(e) {
		e.preventDefault();

		var wine = {
			name: $(e.target).find('[name=name]').val(),
			producer: $(e.target).find('[name=producer]').val(),
			year: $(e.target).find('[name=year]').val(),
			country: $(e.target).find('[name=country]').val()
		}

		Meteor.call('wineadd', wine, function(error, id) {
			if (error)
				alert(error.reason); // DEBUG
			Router.go('winePage', {_id: id});
		});
	}
});