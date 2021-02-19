const request = require('superagent');

const BasePokeAPIURL = 'https://pokeapi.co/api/v2';

/**
 * Get Pokemon by Type. makes a request to pokeAPI to get pokemon of type <type>
 * 
 * @param {string} type type of pokemon to return
 * @returns {Array} array of all pokemon of type <type>
 */
export const getPokeByType = async (type) => {
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
        console.log(`WARNING: ${promiseErrors.length} requests failed due to errors. Reason: ${promiseErrors[0].reason}`);
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
export const getBasicPokemonData = async (pokemon) => {
    const pokemonAPIResponse = JSON.parse((await request
        .get(`${BasePokeAPIURL}/pokemon/${pokemon}`)
        .accept('application/json')).text);

    const otherSprites = pokemonAPIResponse.sprites.other;
    let officialArt = false;
    if (otherSprites) {
        if (otherSprites['official-artwork']) {
            officialArt = otherSprites['official-artwork'].front_default;
        }
        else {
            console.log(`Couldn't find official art for ${pokemonAPIResponse.name} :(`);
        }
    }

    return {
        name: pokemonAPIResponse.name,
        sprite: pokemonAPIResponse.sprites.front_default,
        art: officialArt,
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
export const getPokedexData = async (pokemon) => {
    const speciesAPIResponse = JSON.parse((await request
        .get(`${BasePokeAPIURL}/pokemon-species/${pokemon}`)
        .accept('application/json')
        .set('Content-Type', 'application/json')
    ).text);

    const generationNumber = speciesAPIResponse.generation.url[speciesAPIResponse.generation.url.length - 2];
    const genus = (speciesAPIResponse.genera.filter(genusObject => genusObject.language.name === 'en'))[0].genus;
    const dexEntry = (speciesAPIResponse.flavor_text_entries.filter(textObject => textObject.language.name === 'en'))[0].flavor_text;

    const finalData = {
        number: speciesAPIResponse.order,
        color: speciesAPIResponse.color.name,
        evolutionChainUrl: speciesAPIResponse.evolution_chain.url,
        generation: generationNumber,
        dexEntry,
        genus
    };

    return finalData;
};


export const getEvolutionChain = async (evolutionChainUrl) => {
    const evoChainResponse = JSON.parse((await request
        .get(evolutionChainUrl)
        .accept('application/json')
        .set('Content-Type', 'application/json')
    ).text).chain;

    const baseSpecies = evoChainResponse.species.name;
    const evolutionsArray = [];

    // this pokemon DOES have evolutions
    let evolutions = evoChainResponse.evolves_to;
    evolutionsArray.push(...(evolutions.map(pokemon => pokemon.species.name)));

    // TODO: rewrite this in a more efficient way - recursion probably
    // TODO: add evolution methods for each evolution - seems like pokeapi might be buggy on this
    for (const evolution of evolutions) {
        if (evolution.evolves_to) {
            const secondLevelEvos = evolution.evolves_to;
            evolutionsArray.push(...(secondLevelEvos.map(pokemon => pokemon.species.name)));
            for (const secondLevelEvo of secondLevelEvos) {
                if (secondLevelEvo.evolves_to) {
                    const thirdLevelEvos = secondLevelEvo.evolves_to;
                    evolutionsArray.push(...(thirdLevelEvos.map(pokemon => pokemon.species.name)));
                }
            }
        }
    }

    evolutionsArray.unshift(baseSpecies);

    return evolutionsArray;
};
