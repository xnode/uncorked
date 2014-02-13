Template.wineEdit.events({
	'submit form': function(e) {
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
				Errors.throw(error);
			} else {
				Router.go('winePage', {_id: currentWineId});
			}
		});
	},

	'click .delete': function(e) {
		e.preventDefault();
		if (confirm("Delete this wine?")) {
			var currentWineId = this._id;
			Wines.remove(currentWineId);
			Router.go('winesList');
		}
	}
})