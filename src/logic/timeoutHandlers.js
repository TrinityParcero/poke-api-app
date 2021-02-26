import React from 'react';
import ReactDOM from 'react-dom';

import { TimeoutText } from '../components/displayText';

/**
 * 
 * @param {string} pokemon name
 * @param {string} notes notes about error cause if any
 */
export const pokeSlideClickTimeout = async (pokemon, notes) => {
    const dexSpace = document.querySelector('#pokedex');

    // display a loading message
    const loadingDisplay = <TimeoutText notes={notes} />
    ReactDOM.render(loadingDisplay, dexSpace);
};

/**
 * 
 * @param {string} notes notes about error cause if any
 */
export const genButtonClickTimeout = async (notes) => {
    const dexSpace = document.querySelector('#pokedex');

    // display a loading message
    const loadingDisplay = <TimeoutText notes={notes} />
    ReactDOM.render(loadingDisplay, dexSpace);
};

