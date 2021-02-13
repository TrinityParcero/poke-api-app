const request = require('superagent');

const BasePokeAPIURL = 'https://pokeapi.co/api/v2';

/**
 * Get Poke Info. retrieves data from PokeAPI relevant to params provided
 * https://pokeapi.co/
 * 
 * @param {string} type type of pokemon to return
 * @param {string} habitat habitat of pokemon to return
 */
const getPokemonByTypeHabitat = async (type, habitat) => {
    try {
        // get all pokemon of type <type> and all pokemon of habitat <habitat>
        const pokeTypeURL = `${BasePokeAPIURL}/type/${type}`;
        const pokeHabitatURL = `${BasePokeAPIURL}/pokemon-habitat/${habitat}`;

        const typePokemon = (await request
            .get(pokeTypeURL)
            .accept('application/json')
        ).body.pokemon;
        const habitatPokemon = (await request
            .get(pokeHabitatURL)
            .accept('application/json')
        ).body.pokemon_species;

        if (typePokemon.length === 0 || habitatPokemon.length === 0) {
            console.log(`Invalid input! Double check please!`);
            return {
                count: 0,
                pokemon: []
            };
        }

        // get the overlap between type and habitat
        const typeMonsNames = typePokemon.map(entry => entry.pokemon.name);
        const finalPokemonList = habitatPokemon.filter(pokemon => typeMonsNames.includes(pokemon.name));

        if (finalPokemonList.length === 0) {
            console.log(`Couldn't find any pokemon with type ${type} and habitat ${habitat} :\()`);
        }

        // get data for each of those pokemon
        const pokeDataPromises = [];
        for (const pokemon of finalPokemonList) {
            pokeDataPromises.push(getPokemonData(pokemon.name));
        }
        const fullPokemonData = await Promise.all(pokeDataPromises);

        return ({
            count: fullPokemonData.length,
            pokemon: fullPokemonData
        });


    } catch (error) {
        throw new Error(`Failed to get pokemon. Error: ${error.stack}`);
    }
};

/**
 * Get Pokemon Data. returns name and front sprite of given pokemon
 * 
 * @param {string} pokemon name of pokemon to get data for
 */
const getPokemonData = async (pokemon) => {
    const response = JSON.parse((await request
        .get(`${BasePokeAPIURL}/pokemon/${pokemon}`)
        .accept('application/json')).text);

    return {
        name: response.name,
        sprite: response.sprites.front_default
    };
};

module.exports = {
    getPokemonByTypeHabitat
};