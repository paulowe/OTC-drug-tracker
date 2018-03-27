const check = () => {
	$('.add-btn').on('click', function() {
		var medArr = this.value.split('^');
		console.log(medArr);
		$.post('/api/add', {
			id: medArr[0],
			brand_name: medArr[1],
			generic_name: medArr[2],
			route: medArr[3]
		}, () => null)
	});
}
$('#searchBtn').on('click', function() {

	let searchTerm = $('#fdaSearch').val();
	console.log(searchTerm);
	$.ajax({
		url: `https://api.fda.gov/drug/label.json?search=openfda.product_type:otc+AND+brand_name:${searchTerm}&limit=5`,
		method: 'GET'}).then(
		(req, res) => {
			let obj = req.results;
			// let parsedData = [];
			Object.keys(obj).forEach(function(key) {
				let brandName = obj[key].openfda.brand_name[0];
				let genericName = obj[key].openfda.generic_name[0];
				let route = obj[key].openfda.route[0];
				// let whenUsing = obj[key].when_using[0];
				let purpose = obj[key].purpose[0];
				let doseAdmin = obj[key].dosage_and_administration[0];
				let activeIngredient = obj[key].active_ingredient[0];
				// let question = obj[key].questions[0];
				let fdaMedId = obj[key].openfda.product_ndc[0];
				let pullData = [`${fdaMedId}^${brandName}^${genericName}^${activeIngredient}`];
				console.log(pullData);
				$("#searchResults").append(
					`<tr><td>${brandName}</td><td>${genericName}</td><td>${purpose}</td><td>${doseAdmin}</td><td>${activeIngredient}</td><td><button class="add-btn btn btn-danger btn-block" id="${key}" value='${pullData}'>Click</button></td></tr><hr>`
				);
				// $(`#${key}`).data('savedMed', {brand_name: brandName, generic_name: genericName, rout: route} );
				// parsedhttps://api.fda.gov/drug/label.json?search=openfda.product_type:otc+AND+brand_name:${searchTerm}&limit=5`Data.push([brandName, genericName, route, whenUsing, purpose, doseAdmin, activeIngredient, question]);
				// parsedData.push([brandName, genericName]);
				// console.log(brandName)
			})
			check();
			// console.log(parsedData);
			// document.write(parsedData);
		})

})
