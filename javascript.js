let param = [];
let url = [];
let urlAbi = [];
let totalNum = 151;
let paramArray = [];
let paramArrayName = [];
let eachCon = [];

//main code
$(document).ready(function() { 
  	for (let i = 1; i < totalNum + 1; i++) {
		param[i] = i;
		url[i] = "https://pokeapi.co/api/v2/pokemon/" + param[i];
		paramArray.push(i);
		getApi(url[i], i);
	}

	let form = document.getElementById("pokeForm");
	form.addEventListener('submit', function(event){
		event.preventDefault();
		let input = document.getElementById("pokeInput").value;

		 if(isNaN(input)){
		 	let newInput = input.toLowerCase();
			let compareName = paramArrayName.indexOf(newInput) + 1;
			console.log(newInput + " is not a number");
			if(compareName <= 0){
				alert("Please type in proper Pokemon Name or Pokemon Index Number to search");
			}
			scrollTo(compareName);
		 }else{
			console.log(input + " is a number");
			let compare = paramArray.indexOf(Number(input)+1);
			if(compare <= 0){
				alert("Please type in proper Pokemon Name or Pokemon Index Number to search");
			}
			scrollTo(compare);
		 }
	});
});

function getApi(url, id){
	fetch(url)
	.then(function(response) {
	  return response.json()})
	.then(function(data){
	  	console.log(data);
	  	createDiv();
		displayPokeImg(data, id); 	
	});
}

function createDiv(){
	for(let i = 1; i < totalNum +1; i ++){
		let containers = document.createElement("DIV");
		containers.setAttribute("id", i);
		let pokeWrapper = document.getElementById("pokeContainer");	
		pokeWrapper.appendChild(containers);
	}
}

function displayPokeImg(data, idInput){

	//save all pokemon names to an array
	paramArrayName.push(data.name);

	// create container and name for each pokemon
	let container = document.createElement("DIV");
	container.className = "container";
	let index = document.createElement("H3");
	index.className = "indexNum";
	index.innerHTML = "#" + data.id;
	let space = document.createElement("IMG");
	space.className = "pokemonImg";
	space.setAttribute("src", data.sprites.front_default);
	let name = document.createElement("H1");
	name.className = "pokeName";
	name.innerHTML= data.name.toUpperCase();
	let type1 = document.createElement("H3");
	type1.className = "pokemonTypes";
	type1.innerHTML = data.types[0].type.name;
	compareBgColor(data.types[0].type.name, type1);


	//check if there's a second type => if yes, append type 2
	container.appendChild(index);
	container.appendChild(space);
	container.appendChild(name);
	container.appendChild(type1);
	if(data.types.length>1){
		let type2 = document.createElement("H3");
		type2.className = "pokemonTypes";
		type2.innerHTML = data.types[1].type.name;
		container.appendChild(type2);
		compareBgColor(data.types[1].type.name, type2);
	}else{
		let blank = document.createElement("DIV");
		container.appendChild(blank);
	}

	//add eventlistener -> show the abilities of the pokemon
	let numClick = 1;
	let containerWrapper = document.getElementById(idInput);
	containerWrapper.appendChild(container);
	container.addEventListener('click', function(){
		let newElem;
		if(numClick%2){
			newElem = expand(containerWrapper, data);
			numClick +=1;
			containerWrapper.appendChild(newElem);
		}		
	},false);
}

// the function uses while clicking a container for the pokemon 
function expand(container, data){
	let info = document.createElement("DIV");
	info.setAttribute("class", "expandContainer");
	info.style.display = "grid";
	let abilityTitle = document.createElement("H3");
	abilityTitle.innerHTML = data.name.toUpperCase() + " Abilities";
	info.appendChild(abilityTitle);

	let abilities = data.abilities;
	console.log(abilities);
	for(let i = 0; i < abilities.length; i++){
		let contentIn = document.createElement("H3");
		contentIn.innerHTML = data.abilities[i].ability.name;
		info.appendChild(contentIn);
	}
	return info;
}

function scrollTo(input){
	let element = document.getElementById(input);
	element.scrollIntoView();
	console.log(input);
}


// check the background for each type
let allColor = ["#a9b821", "#715748", "#7038f9", "#f8d030", "#f7c9e3", "#c03028", "#f07f31", "#a98ff0", "#705798", "#78c84f", "#e0c069", "#9ad7d8", "#aaa878", "#a140a1", "#f95788", "#b7a038", "#b8b8d0", "#6890f0"];
let allPokeTypes = ["bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water"];
function compareBgColor(type, whichType){
	let compareType = allPokeTypes.indexOf(type);
	for(let i = 0; i < allPokeTypes.length; i++){
		if(compareType == i){
			whichType.style.backgroundColor = allColor[i];
		}
	}
}





