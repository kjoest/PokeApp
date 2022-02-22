/*const strongAgainst = document.querySelector(".strong-against");
const weakAgainst = document.querySelector(".weak-against");


let pokemonId = {
    fetchPokemonId: function (name) {
        fetch(
            "https://pokeapi.co/api/v2/" + "type/" + name
        )
            .then((response) => response.json())
            .then((data) => this.displayType(data));
    },
    displayType: function (data) {
        const dataTypes = data['damage_relations']['double_damage_from'];
        const dataFirstType = dataTypes[0];
        const dataSecondType = dataTypes[1];
        weakAgainst.textContext = dataFirstType;
        weakAgainst.textContent= dataSecondType['name'];
        console.log(dataFirstType);
    },

    search: function () {
        this.fetchPokemon(document.querySelector(".search-bar").value)
    }
};

document
    .querySelector(".search button")
    .addEventListener("click", function () {
        pokemonId.search();
    });

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            pokemonId.search();
        }
    });*/