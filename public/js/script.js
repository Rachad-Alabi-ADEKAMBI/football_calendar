fetch("https://v3.football.api-sports.io/fixtures?live=all", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "71d95ba09f4094fa6f5f291f089cb27bs"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.log(err);
});
