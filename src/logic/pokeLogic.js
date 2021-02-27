import request from 'superagent';

import { PokeData } from '../pokeData';

const BasePokeAPIURL = 'https://pokeapi.co/api/v2';
const HyphenatedNames = PokeData.hyphenatedNames;

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
        .set('Cache-Control', 'public')
        .set('Cache-Control', 'max-age=18000')
        .accept('application/json');
    if (!response.body) {
        throw new Error(`Bad response getting pokemon by type ${type}`);
    }
    else if (!response.body.pokemon) {
        throw new Error(`No pokemon in response for type ${type}`);
    }

    // remove mega evolutions and special forms
    // TODO: fix whatever makes them break when clicked and re-add them to result set
    const pokeOfType = response.body.pokemon.filter(pokemon =>
        (!pokemon.pokemon.name.includes('-')) || (HyphenatedNames.includes(pokemon.pokemon.name))
    );

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
 * 
 * @param {string} pokemon name of pokemon to get data for
 * @returns {object} pokemon data
 */
export const getBasicPokemonData = async (pokemon) => {
    const pokemonAPIResponse = JSON.parse((await request
        .get(`${BasePokeAPIURL}/pokemon/${pokemon}`)
        .set('Cache-Control', 'public')
        .set('Cache-Control', 'max-age=18000')
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
 * 
 * @param {string} pokemon name of pokemon to get data for
 * @returns {object} pokemon data
 */
export const getPokedexData = async (pokemon) => {
    const speciesAPIResponse = JSON.parse((await request
        .get(`${BasePokeAPIURL}/pokemon-species/${pokemon}`)
        .accept('application/json')
        .set('Cache-Control', 'public')
        .set('Cache-Control', 'max-age=18000')
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

/**
 * Get Evolution Chain. returns the names and sprites of pokemon in evolution chain at <evolutionChainUrl> 
 * 
 * @param {string} evolutionChainUrl url to request api to get further info on evolution chain
 * @param {object} startPokemon data of pokemon currently being displayed
 */
export const getEvolutionChain = async (evolutionChainUrl, startPokemon) => {
    const evoChainResponse = JSON.parse((await request
        .get(evolutionChainUrl)
        .accept('application/json')
        .set('Cache-Control', 'public')
        .set('Cache-Control', 'max-age=18000')
        .set('Content-Type', 'application/json')
    ).text).chain;

    const baseSpecies = evoChainResponse.species.name;

    const evolutionChain = {};

    // base level will always exist
    evolutionChain[0] = [];

    const startName = startPokemon.name;
    const startSprite = startPokemon.sprite;
    const startTypes = startPokemon.types;
    const startArt = startPokemon.art;

    if (baseSpecies === startName) {
        evolutionChain[0].push({
            name: startName,
            sprite: startSprite,
            types: startTypes,
            art: startArt
        });
    }
    else {
        const basePokeData = await (getBasicPokemonData(baseSpecies));

        evolutionChain[0].push(basePokeData);
    }

    // first level of evolutions
    let evolutions = evoChainResponse.evolves_to;
    for (const evolution of evolutions) {
        if (!evolutionChain[1]) {
            evolutionChain[1] = [];
        }
        const firstEvoName = evolution.species.name;
        if (firstEvoName === startName) {
            evolutionChain[1].push({
                name: startName,
                sprite: startSprite,
                types: startTypes,
                art: startArt
            });
        }
        else {
            const firstEvoData = await (getBasicPokemonData(firstEvoName));
            evolutionChain[1].push(firstEvoData);
        }

        // second level of evolutions
        if (evolution.evolves_to) {
            const secondLevelEvos = evolution.evolves_to;
            for (const secondLevelEvo of secondLevelEvos) {
                if (!evolutionChain[2]) {
                    evolutionChain[2] = [];
                }
                const secondLevelName = secondLevelEvo.species.name;
                if (secondLevelName === startName) {
                    evolutionChain[2].push({
                        name: startName,
                        sprite: startSprite,
                        types: startTypes,
                        art: startArt
                    });
                }
                else {
                    const secondEvoData = await (getBasicPokemonData(secondLevelName));
                    evolutionChain[2].push(secondEvoData);
                }
            }
        }
    }
    return evolutionChain;
};
