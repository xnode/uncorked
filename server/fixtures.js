if (Wines.find().count() === 0) {
	Wines.insert({
		name: 'Rosenberg Pinot Noir',
		country: 'Austria',
		year: 2009,
		type: 'redwine'
	});
	Wines.insert({
		name: 'Serenata Merlot',
		country: 'Chile',
		type: 'redwine'	
	});
	Wines.insert({
		name: 'Lindeman\'s Bin 99 Pinot Noir',
		country: 'Australia',
		year: 2013,
		type: 'redwine'	
	});
}