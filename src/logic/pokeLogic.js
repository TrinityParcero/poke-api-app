const request = require('superagent');

const BasePokeAPIURL = 'https://pokeapi.co/api/v2';

/**
 * Get Pokemon by Type. makes a request to pokeAPI to get pokemon of type <type>
 * 
 * @param {string} type type of pokemon to return
 * @returns {Array} array of all pokemon of type <type>
 */
const getPokeByType = async (type) => {
    console.log(`Getting pokemon of type ${type}`);
    const pokeTypeURL = `${BasePokeAPIURL}/type/${type}`;
    const response = await request
        .get(pokeTypeURL)
        .accept('application/json');
    if (!response.body) {
        throw new Error(`Bad response getting pokemon by type ${type}`);
    }
    else if (!response.body.pokemon) {
        throw new Error(`No pokemon in response for type ${type}`);
    }
    const pokeOfType = response.body.pokemon;
    // get data for each of those pokemon
    const pokeDataPromises = [];
    for (const pokemon of pokeOfType) {
        pokeDataPromises.push(getBasicPokemonData(pokemon.pokemon.name));
    }

    const finishedPromises = await Promise.allSettled(pokeDataPromises);
    const promiseErrors = finishedPromises.filter(promise => promise.status === "rejected");
    if (promiseErrors.length > 0) {
        console.log(`WARNING: ${promiseErrors.length} requests failed due to errors.`);
    }
    const fullPokemonData = finishedPromises.map(promise =>
        promise.value
    ).filter(value => value !== undefined);

    // remove special cases with no sprites - special forms, etc.
    const filteredPokemonData = fullPokemonData.filter(pokemon => pokemon.sprite !== null);
    return filteredPokemonData;
};

/**
 * Get Basic Pokemon Data. returns name and front sprite of given pokemon
 * TODO: add caching?
 * 
 * @param {string} pokemon name of pokemon to get data for
 * @returns {object} pokemon data
 */
const getBasicPokemonData = async (pokemon) => {
    const pokemonAPIResponse = JSON.parse((await request
        .get(`${BasePokeAPIURL}/pokemon/${pokemon}`)
        .accept('application/json')).text);

    return {
        name: pokemonAPIResponse.name,
        sprite: pokemonAPIResponse.sprites.front_default,
        types: pokemonAPIResponse.types
    };
};

/**
 * Get Pokedex Data. returns data we need to construct "Pokedex" page for a given <pokemon>
 * TODO: add caching?
 * 
 * @param {string} pokemon name of pokemon to get data for
 * @returns {object} pokemon data
 */
const getPokedexData = async (pokemon) => {
    const speciesAPIResponse = JSON.parse((await request
        .get(`${BasePokeAPIURL}/pokemon-species/${pokemon}`)
        .accept('application/json')).text);

    const generationNumber = speciesAPIResponse.generation.url[speciesAPIResponse.generation.url.length - 2];
    const genus = (speciesAPIResponse.genera.filter(genusObject => genusObject.language.name === 'en')).genus;

    return {
        number: speciesAPIResponse.order,
        color: speciesAPIResponse.color.name,
        evolutionChainUrl: speciesAPIResponse.evolution_chain.url,
        generation: generationNumber,
        dexEntry: speciesAPIResponse.flavor_text_entries[0].flavor_text,
        genus
    }
}

module.exports = {
    getPokeByType,
    getPokedexData
};