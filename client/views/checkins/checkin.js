Template.checkin.helpers({ 
	checkinTimeText: function() {
		return new Date(this.submitted).toString(); 
	}
});