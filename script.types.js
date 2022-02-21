const strongAgainst = document.querySelector(".strong-against");
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
        const dataTypes = data['damage_relations']['double_damage_to'];
        const dataFirstType = dataTypes[0];
        const dataSecondType = dataTypes[1];
        strongAgainst.textContext = dataFirstType['name'];
        console.log(dataFirstType);
    }
};

