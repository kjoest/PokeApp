const mainCard = document.querySelector('.card');
const mainBody = document.querySelector('body');
const pokeTypeOne = document.querySelector(".poke-first-type");
const pokeTypeTwo = document.querySelector(".poke-second-type");
const strongAgainst = document.querySelector(".strong-against");
const weakAgainst = document.querySelector(".weak-against");

const TYPES = [
    'normal', 'fighting', 'flying',
    'poison', 'ground', 'rock',
    'bug', 'ghost', 'steel',
    'fire', 'water', 'grass',
    'electric', 'psychic', 'ice',
    'dragon', 'dark', 'fairy'
];

const resetCard = () => {
    mainCard.classList.remove('hide');
    for (const type of TYPES) {
        mainCard.classList.remove(type);
    }
}

const resetBody = () => {
    mainBody.classList.remove('hide');
    for (const type of TYPES) {
        mainBody.classList.remove(type);
    }
}

let pokemon = {
    fetchPokemon: function (name, id) {
        Promise.all([
            fetch("https://pokeapi.co/api/v2/" + "pokemon/" + name.toLowerCase()).then((response) => response.json()).then((data) => this.displayPokemon(data))
            /*fetch("https://pokeapi.co/api/v2/" + "type/1").then((response) => response.json()).then((data) => this.displayPokemon(data)),*/
        ]);
    },
    displayPokemon: function (data) {

        resetCard();
        resetBody();

        const { name } = data;
        const { id } = data;
        const { height } = data;
        const { weight } = data;
        const dataTypes = data['types'];
        const dataFirstType = dataTypes[0];
        const dataSecondType = dataTypes[1];
        pokeTypeOne.textContent = dataFirstType['type']['name'];

        if (dataSecondType) {
            pokeTypeTwo.textContent = dataSecondType['type']['name'];
        } else {
            pokeTypeTwo.textContent = '';
        }

        console.log(dataFirstType);

        mainCard.classList.add(dataFirstType['type']['name']);

        if (dataSecondType) {
            mainBody.classList.add(dataSecondType['type']['name']);
        }

        document.querySelector(".icon").src =
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png";
        document.querySelector(".poke-name").innerText = name;
        document.querySelector(".poke-id").innerText = "ID: " + id;
        document.querySelector(".poke-height").innerText = "Height: " + height;
        document.querySelector(".poke-weight").innerText = "Weight: " + weight;
    },
    /*displayPokemonTypes: function(data) {
        const dataDamageTypes = data['damage_relations']['double_damage_to'];
        const dataFirstDamageType = dataDamageTypes[0];
        const dataSecondDamageType = dataDamageTypes[1];
        strongAgainst.textContent = dataFirstDamageType['name'];
        weakAgainst.textContext = dataDamageTypes['name'];
        console.log(dataFirstDamageType);
    },*/

    search: function () {
        this.fetchPokemon(document.querySelector(".search-bar").value);
    }
};

document
    .querySelector(".search button")
    .addEventListener("click", function () {
        pokemon.search();
    });

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            pokemon.search();
        }
    });

pokemon.fetchPokemon("10095");