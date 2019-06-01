let buttons = document.querySelectorAll('button')
let resultat = document.querySelector('.textResult')
let textPoint = document.querySelector('.textPoint')

let point = 0

for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', () => {
		let player = buttons[i].innerHTML
		let bot = buttons[Math.floor(Math.random() * buttons.length)].innerHTML
		let result = ""
		

		if(player == "Pierre" && bot == "Ciseaux" || player == "Feuille" && bot == "Pierre" || player == "Ciseaux" && bot == "Feuille") {
			result = "Gagné"
			point = point + 1
		} else if (player == "Pierre" && bot == "Feuille" || player == "Feuille" && bot == "Ciseaux" || player == "Ciseaux" && bot == "Pierre"){
			result = "Perdu"
			point = 0
		} else if(player == bot) {
			resultat.innerHTML = `C'est incroyable ! Egalité contre <b>${bot}</b>`

			if (point < 0) {
				point = 0
			} else if(point > 0) {
				point = point - 1
			} else if(point > 5) {
				point = point - 2
			}

		}

		if(result == "Gagné" && bot == "Feuille" || result == "Gagné" && bot == "Pierre") {
			resultat.innerHTML = `Vous avez <b>gagné</b><br>Contre la <b>${bot}</b>`
		} else if(result == "Gagné" && bot == "Ciseaux") {
			resultat.innerHTML = `Vous avez <b>gagné</b><br>Contre le <b>${bot}</b>`
		}

		if(result == "Perdu" && bot == "Feuille" || result == "Perdu" && bot == "Pierre") {
			resultat.innerHTML = `Vous avez <b>perdu</b><br>Contre la <b>${bot}</b>`
		} else if(result == "Perdu" && bot == "Ciseaux") {
			resultat.innerHTML = `Vous avez <b>perdu</b><br>Contre le <b>${bot}</b>`
		}

		textPoint.innerHTML = `Point : ${point}`

	})
}