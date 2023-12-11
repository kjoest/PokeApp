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

//Function to fetch type details
async function fetchTypeDetails(typeName) {
    const apiUrl = `https://pokeapi.co/api/v2/type/${typeName.toLowerCase()}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}

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

// Function to convert height from decimetres to feet
function convertHeightToFeet(height) {
    const feet = height * 0.328084; // 1 decimetre is approximately 0.328084 feet
    return feet.toFixed(2);
}

// Function to convert weight from hectograms to pounds
function convertWeightToPounds(weight) {
    const pounds = weight * 0.220462; // 1 hectogram is approximately 0.220462 pounds
    return pounds.toFixed(2);
}

let pokemon = {
    fetchPokemon: function (name, id) {
        Promise.all([
            fetch("https://pokeapi.co/api/v2/" + "pokemon/" + name.toLowerCase()).then((response) => response.json()).then((data) => this.displayPokemon(data)),
        ]);
    },

    // displayPokemon: async function (data) {
    //     resetCard();
    //     resetBody();

    //     const { name } = data;
    //     const { id } = data;
    //     const { height } = data;
    //     const { weight } = data;
    //     const dataTypes = data['types'];
    //     const dataFirstType = dataTypes[0];
    //     const dataSecondType = dataTypes[1];
    //     pokeTypeOne.textContent = dataFirstType['type']['name'];

    //     if (dataSecondType) {
    //         pokeTypeTwo.textContent = dataSecondType['type']['name'];
    //     } else {
    //         pokeTypeTwo.textContent = '';
    //     }

    //     console.log(dataFirstType);

    //     mainCard.classList.add(dataFirstType['type']['name']);

    //     if (dataSecondType) {
    //         mainBody.classList.add(dataSecondType['type']['name']);
    //     }

    //     document.querySelector(".icon").src =
    //         "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png";
    //     document.querySelector(".poke-name").innerText = name;
    //     document.querySelector(".poke-id").innerText = "ID: " + id;
    //     document.querySelector(".poke-height").innerText = "Height: " + height;
    //     document.querySelector(".poke-weight").innerText = "Weight: " + weight;

    // // Fetch and display weaknesses and strengths
    // const type1Details = await fetchTypeDetails(dataFirstType['type']['name']);
    // const type1Weaknesses = type1Details.damage_relations.double_damage_from.map(type => type.name);
    // const type1Strengths = type1Details.damage_relations.double_damage_to.map(type => type.name);

    // let type2Weaknesses = [];
    // let type2Strengths = [];

    // if (dataSecondType) {
    //     const type2Details = await fetchTypeDetails(dataSecondType['type']['name']);
    //     type2Weaknesses = type2Details.damage_relations.double_damage_from.map(type => type.name);
    //     type2Strengths = type2Details.damage_relations.double_damage_to.map(type => type.name);
    // }

    // const allWeaknesses = [...new Set([...type1Weaknesses, ...type2Weaknesses])];
    // const allStrengths = [...new Set([...type1Strengths, ...type2Strengths])];

    // // Update HTML with weaknesses and strengths
    // weakAgainst.textContent = `Weak Against: ${allWeaknesses.join(', ')}`;
    // strongAgainst.textContent = `Strong Against: ${allStrengths.join(', ')}`;

    // // Show the card after updating details
    // mainCard.classList.remove('hide');
    // },

    // Function to convert height from decimetres to feet
// Function to convert height from decimetres to feet

    displayPokemon: async function (data) {
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
        document.querySelector(".poke-height").innerText = "Height: " + convertHeightToFeet(height) + " Ft";
        document.querySelector(".poke-weight").innerText = "Weight: " + convertWeightToPounds(weight) + " lbs";
    
        // Fetch and display weaknesses and strengths
        const type1Details = await fetchTypeDetails(dataFirstType['type']['name']);
        const type1Weaknesses = type1Details.damage_relations.double_damage_from.map(type => type.name);
        const type1Strengths = type1Details.damage_relations.double_damage_to.map(type => type.name);
    
        let type2Weaknesses = [];
        let type2Strengths = [];
    
        if (dataSecondType) {
            const type2Details = await fetchTypeDetails(dataSecondType['type']['name']);
            type2Weaknesses = type2Details.damage_relations.double_damage_from.map(type => type.name);
            type2Strengths = type2Details.damage_relations.double_damage_to.map(type => type.name);
        }
    
        const allWeaknesses = [...new Set([...type1Weaknesses, ...type2Weaknesses])];
        const allStrengths = [...new Set([...type1Strengths, ...type2Strengths])];
    
        // Update HTML with weaknesses and strengths
        weakAgainst.textContent = `Weak Against: ${allWeaknesses.join(', ')}`;
        strongAgainst.textContent = `Strong Against: ${allStrengths.join(', ')}`;
    
        // Show the card after updating details
        mainCard.classList.remove('hide');
    },

    search: function () {
        this.fetchPokemon(document.querySelector(".search-bar").value);
    }
};

document
    .querySelector(".search button")
    .addEventListener("click", function () {
        pokemon.search();
        document.querySelector(".search-bar").value = "";
    });

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            pokemon.search();
            this.value = "";
        }
    });

pokemon.fetchPokemon("10095");