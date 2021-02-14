const request = require('superagent');

const BasePokeAPIURL = 'https://pokeapi.co/api/v2';

/**
 * Get Pokemon by Type. makes a request to pokeAPI to get pokemon of type <type>
 * 
 * @param {string} type type of pokemon to return
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
        pokeDataPromises.push(getPokemonData(pokemon.pokemon.name));
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
 * Get Pokemon Data. returns name and front sprite of given pokemon
 * TODO: add caching?
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
    getPokeByType
};