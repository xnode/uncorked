Template.wineEdit.events({
	'form submit': function(e) {
		e.preventDefault();
		var currentWineId = this._id;

		var wineProperties = {
			name: $(e.target).find('[name=name]').val(),
			producer: $(e.target).find('[name=producer]').val(),
			year: $(e.target).find('[name=year]').val(),
			country: $(e.target).find('[name=country]').val()
		}

		Wines.update(currentWineId, {$set: wineProperties}, function(error) {
			if (error) {
				throw error;
			} else {
				Router.go('winePage', {_id: currentWineId});
			}
		});
	},

	'click delete': function(e) {
		var currentWineId = this._id;
		Wines.remove(currentWineId);
		Router.go('winesList');
	}
})