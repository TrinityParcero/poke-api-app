import React from 'react';
import ReactDOM from 'react-dom';

import { ErrorText } from '../components/displayText';

/**
 * 
 * @param {string} notes notes about error cause if any
 */
export const displayErrorMessage = async (notes) => {
    const topDex = document.querySelector('#pokedexTop');
    const topDexStyle = window.getComputedStyle(topDex, null).display;
    const bottomDex = document.querySelector('#pokedexBottom');

    // display a loading message
    const loadingDisplay = <ErrorText notes={notes} />

    if (topDexStyle !== 'none') {
        ReactDOM.render(loadingDisplay, topDex);
    } else {
        ReactDOM.render(loadingDisplay, bottomDex);
    }
};

