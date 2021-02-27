import React from 'react';
import ReactDOM from 'react-dom';

import PokeCarousel from '../components/Carousel';
import DexEntry from '../components/DexEntry';
import { LoadText } from '../components/displayText';

import { displayErrorMessage } from './errorHandlers';
import {
    getPokeByType,
    getPokedexData,
    getEvolutionChain
} from './pokeLogic';

/**
 * Pokeslide click. onClick method for each pokemon slide in carousel
 * renders a dexEntry based on <pokemonData>
 * 
 * @param {string} name pokemon name
 * @param {string} art link to pokemon art
 * @param {array} types pokemon types
 * @param {string} sprite link to pokemon sprite
 */
export const pokeSlideClick = async (pokemon) => {
    try {
        const dexSpace = document.querySelector('#pokedex');

        const name = pokemon.name;
        const types = pokemon.types;
        const art = pokemon.art;

        console.log(`You clicked ${name}`);

        // display a loading message
        const loadingDisplay = <LoadText value={name} dataType='pokemon' />
        ReactDOM.render(loadingDisplay, dexSpace);

        // the pokeAPI is a little weird - pokemon data is split between a few endpoints
        const additionalData = await getPokedexData(name);
        const evolutionChain = await getEvolutionChain(additionalData.evolutionChainUrl, pokemon);

        const typesMapped = types.map(entry => entry.type.name);

        const fullDexData = {
            name: name,
            number: additionalData.number,
            art: art,
            text: additionalData.dexEntry,
            types: typesMapped,
            genus: additionalData.genus,
            generation: additionalData.generation,
            color: additionalData.color,
            evolutionChain
        };

        const dexEntry = <DexEntry pokemonData={fullDexData} />

        ReactDOM.render(dexEntry, dexSpace);
        return;

    } catch (error) {
        console.log(`Something went wrong on pokeSlide click. Error: ${error}`);
        displayErrorMessage(error);
    }
};

/**
 * GenButton click. onClick method for generator button
 * gets checked status of all relevant inputs, then renders the results 
 * 
 */
export const genButtonClick = async () => {
    try {
        const resultSpace = document.querySelector('#carousel');
        const pokedexSpace = document.querySelector('#pokedex');
        const typeInputs = document.querySelectorAll('input[name=type]');

        // display a loading message
        const loadingDisplay = <LoadText value={''} dataType='' />
        ReactDOM.render(loadingDisplay, pokedexSpace);

        // clear old pokemon from carousel
        ReactDOM.render('', resultSpace);

        const getPokesByTypePromises = [];
        for (const input of typeInputs) {
            if (input.checked) {
                getPokesByTypePromises.push(getPokeByType(input.value));
            }
        }

        // user hadn't selected anything - return
        if (getPokesByTypePromises.length === 0) {
            console.log('Try selecting something first!');
            return;
        }

        const resultData = (await Promise.all(getPokesByTypePromises))[0];

        let loadedMessage;

        // if we got no results, warn the user that somethings up
        if (resultData.length < 1) {
            loadedMessage = <h3 className='loadText'>Uh oh! No results for those selections.</h3>;
        }
        else {
            loadedMessage = <h3 className='loadText'>{`Found ${resultData.length} pokemon!`}</h3>
        }

        // replace loading text with results message
        ReactDOM.render(loadedMessage, pokedexSpace);
        console.log(`Found ${resultData.length} pokemon`);

        const carousel = <PokeCarousel slides={resultData} />

        ReactDOM.render(
            carousel,
            resultSpace
        );
        return;

    } catch (error) {
        console.log(`Something went wrong on genButton click! Error: ${error}`);
        displayErrorMessage(error);
    }
};
