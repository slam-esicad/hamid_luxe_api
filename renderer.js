$('#content').hide()

document.getElementById('submit').addEventListener('click', () => {

	let title_result = document.getElementById('title_result')
	let content_result = document.getElementById('content')
	let startdate = document.getElementById('startdate').value
	let enddate = document.getElementById('enddate').value

	console.log(enddate)

	fetch('http://localhost:8000/api/car/' + (document.getElementById('reg_number').value == null ? 'null' : document.getElementById('reg_number').value), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Origin': 'http://localhost:8000'
		},
		mode: 'cors'
	}).then(response => {
		return response.json();
	}).then(data => {
		console.log(data)

		if(data === null) {
			title_result.textContent = "Aucune voiture trouvée, veuillez revérifier l'immatriculation"
		} else {
			$('#content').show(1000)
			console.log(data.img)
			title_result.textContent = data.brand.name + " " + data.model

			document.getElementById('r_img').src = "http://localhost:8000/uploads/" + data.img
			document.getElementById("r_model").textContent = data.brand.name + " " + data.model
			document.getElementById('r_year').textContent = data.year
			document.getElementById('r_km').textContent = data.km
			document.getElementById('r_regNumber').textContent = data.reg_number
			document.getElementById('r_energy').textContent = data.energy
			document.getElementById('r_tank').textContent = data.tank
			document.getElementById('r_horsepower').textContent = data.horsepower
			document.getElementById('r_gearbox').textContent = data.gearbox
			document.getElementById('r_doors').textContent = data.doors
			document.getElementById('r_color').textContent = data.color
			document.getElementById('r_dayprice').textContent = data.dayprice
			document.getElementById('r_buyprice').textContent = data.buyprice

			if(startdate != null && enddate != null) {
				fetch('http://localhost:8000/api/car/' + document.getElementById('reg_number').value + '/' + startdate + '/' + enddate, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Origin': 'http://localhost:8000'
					},
					mode: 'cors'
				}).then(response => {
					return response.json();
				}).then(dataAvailable => {
					if(data.selled) {
						console.log("vendue")
						document.getElementById('selled').className = 'ui red label'
						document.getElementById('selled').textContent = 'Vendue'
					} else {
						if(dataAvailable.available) {
							console.log('dispo')
							document.getElementById('selled').className = 'ui green label'
							document.getElementById('selled').textContent = "Disponible"
						} else if(!dataAvailable.available) {
							console.log('location')
							document.getElementById('selled').className = 'ui orange label'
							document.getElementById('selled').textContent = "En location"
						}
					}
				})
			}
		}
	})
})