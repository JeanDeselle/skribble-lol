import champions from "./champions.js";

export function fillTabChamp() {
	fetch(
		"https://ddragon.leagueoflegends.com/cdn/12.6.1/data/fr_FR/champion.json"
	)
		.then((res) => {
			res.json().then((data) => {
				// console.log(data.data);
				for (const champ in data.data) {
					const nom = data.data[champ].id;
					const src = data.data[champ].image.full;
					const link =
						"http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/";
					champions.push({
						name: data.data[champ].id,
						url: link+src,
					});
				}
				localStorage.setItem("championsLol", JSON.stringify(champions));
	
			});
		})
		.catch((err) => {
			console.log(err);
		});
}
