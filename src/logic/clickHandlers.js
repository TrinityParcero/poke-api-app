import React from 'react';
import ReactDOM from 'react-dom';

import PokeCarousel from '../components/Carousel';
import DexEntry from '../components/DexEntry';
import { LoadText } from '../components/displayText';

import { displayErrorMessage } from './errorHandlers';
import {
    getPokeByType,
    getPokeByColor,
    getPokeByGen,
    getPokedexData,
    getEvolutionChain
} from './pokeLogic';

/**
 * Pokeslide click. onClick method for each pokemon slide in carousel
 * renders a dexEntry based on <pokemonData>
 * 
 * @param {object} pokemon pokemon object containing basic info 
 */
export const pokeSlideClick = async (pokemon) => {
    try {
        const topDex = document.querySelector('#pokedexTop');
        const topDexStyle = window.getComputedStyle(topDex, null).display;
        const bottomDex = document.querySelector('#pokedexBottom');
        let displaySpace = bottomDex;
        if (topDexStyle !== 'none') {
            displaySpace = topDex;
        }

        const name = pokemon.name;
        const art = pokemon.art;

        console.log(`You clicked ${name}`);

        // display a loading message
        const loadingDisplay = <LoadText value={name} dataType='pokemon' />
        ReactDOM.render(loadingDisplay, displaySpace);

        // the pokeAPI is a little weird - pokemon data is split between a few endpoints
        const additionalData = await getPokedexData(name);
        const evolutionChain = await getEvolutionChain(additionalData.evolutionChainUrl, pokemon);

        const fullDexData = {
            name: name,
            number: additionalData.number,
            art: art,
            text: additionalData.dexEntry,
            type: pokemon.type,
            genus: additionalData.genus,
            generation: additionalData.generation,
            color: additionalData.color,
            evolutionChain
        };

        const dexEntry = <DexEntry pokemonData={fullDexData} />

        ReactDOM.render(dexEntry, displaySpace);
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
        // figure out which carousel and dex space is active - based on screen size
        const topCarousel = document.querySelector('#topCarousel');
        const bottomCarousel = document.querySelector('#bottomCarousel');
        const topCarouselStyle = window.getComputedStyle(topCarousel, null).display;
        let resultSpace = bottomCarousel;
        if (topCarouselStyle !== 'none') {
            resultSpace = topCarousel;
        }
        const topDex = document.querySelector('#pokedexTop');
        const topDexStyle = window.getComputedStyle(topDex, null).display;
        const bottomDex = document.querySelector('#pokedexBottom');
        let displaySpace = bottomDex;
        if (topDexStyle !== 'none') {
            displaySpace = topDex;
        }

        // get inputs
        const typeInput = Array.from(document.querySelectorAll('input[name=type]'));
        const secondaryTypeInput = Array.from(document.querySelectorAll('input[name=secondaryType]'));
        const colorInput = Array.from(document.querySelectorAll('input[name=color]'));
        const genInput = Array.from(document.querySelectorAll('input[name=generation]'));

        const selectedType = typeInput.filter(input => input.checked);
        const selectedSecondary = secondaryTypeInput.filter(input => input.checked);
        const selectedColors = colorInput.filter(input => input.checked);
        const selectedGens = genInput.filter(input => input.checked);

        // display a loading message
        const loadingDisplay = <LoadText value={''} dataType='' />
        ReactDOM.render(loadingDisplay, displaySpace);

        // clear old pokemon from carousel
        ReactDOM.render('', resultSpace);

        let resultPokemon;
        // find an input with selection, get dataset then filter based on other inputs
        if (selectedType.length > 0) {
            console.log(`Selected type: ${selectedType[0].value}`);
            resultPokemon = await getPokeByType(selectedType[0].value);
            if (selectedSecondary.length > 0) {
                console.log(`Selected secondary type: ${selectedSecondary[0].value}`);
                resultPokemon = resultPokemon.filter(pokemon => pokemon.type.includes(selectedSecondary[0].value));
            }
            // for these ones we have to get pokedex data - color and gen are not included in basic api response
            if (selectedColors.length > 0 || selectedGens.length > 0) {
                const pokeDataPromises = [];
                for (const pokemon of resultPokemon) {
                    pokeDataPromises.push(getPokedexData(pokemon.name));
                }
                let resultPokesFiltered = await Promise.all(pokeDataPromises);

                if (selectedColors.length > 0) {
                    const colorValues = selectedColors.map(input => input.value);
                    console.log(`Selected colors: ${colorValues}`);
                    resultPokesFiltered = resultPokesFiltered.filter(pokemon => colorValues.includes(pokemon.color));
                }
                if (selectedGens.length > 0) {
                    const genValues = selectedGens.map(input => input.value);
                    console.log(`Selected gens: ${genValues}`);
                    resultPokesFiltered = resultPokesFiltered.filter(pokemon => genValues.includes(pokemon.generation));
                }
                // filter resultPokemon to only contain resultPokesFiltered pokemon
                const finalNameList = resultPokesFiltered.map(pokemon => pokemon.name);
                resultPokemon = resultPokemon.filter(pokemon => finalNameList.includes(pokemon.name));
            }
        }
        else if (selectedColors.length > 0) {
            const colorValues = selectedColors.map(input => input.value);
            console.log(`Selected colors: ${colorValues}`);
            const pokeDataPromises = [];
            for (const value of colorValues) {
                pokeDataPromises.push(getPokeByColor(value));
            }
            const promiseResults = await Promise.all(pokeDataPromises);
            resultPokemon = promiseResults.flat();

            // filter by gen if applicable, requires pokedex data
            if (selectedGens.length > 0) {
                const dexDataPromises = [];
                for (const pokemon of resultPokemon) {
                    dexDataPromises.push(getPokedexData(pokemon.name));
                }
                let resultPokesFiltered = await Promise.all(dexDataPromises);
                const genValues = selectedGens.map(input => input.value);
                console.log(`Selected gens: ${genValues}`);
                resultPokesFiltered = resultPokesFiltered.filter(pokemon => genValues.includes(pokemon.generation));

                // filter resultPokemon to only contain resultPokesFiltered pokemon
                const finalNameList = resultPokesFiltered.map(pokemon => pokemon.name);
                resultPokemon = resultPokemon.filter(pokemon => finalNameList.includes(pokemon.name));
            }
        }
        else if (selectedGens.length > 0) {
            const genValues = selectedGens.map(input => input.value);
            console.log(`Selected colors: ${genValues}`);
            const pokeDataPromises = [];
            for (const value of genValues) {
                pokeDataPromises.push(getPokeByGen(value));
            }
            const promiseResults = await Promise.all(pokeDataPromises);
            resultPokemon = promiseResults.flat();
        }
        else {
            // user didn't make any selections, return
            console.log('You have to click something first, pal');
            const userFailDisplay = <h3>Try selecting a type first!</h3>;
            ReactDOM.render(userFailDisplay, displaySpace);
            return;
        }

        let loadedMessage;
        // if we got no results, warn the user that somethings up
        if (resultPokemon.length < 1) {
            loadedMessage = <h3 className='loadText'>Uh oh! No results for those selections.</h3>;
        }
        else {
            loadedMessage = <h3 className='loadText'>{`Found ${resultPokemon.length} pokemon!`}</h3>
        }

        // replace loading text with results message
        ReactDOM.render(loadedMessage, displaySpace);
        console.log(`Found ${resultPokemon.length} pokemon`);

        const carousel = <PokeCarousel slides={resultPokemon} />

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
