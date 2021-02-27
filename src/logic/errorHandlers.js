import React from 'react';
import ReactDOM from 'react-dom';

import { ErrorText } from '../components/displayText';

/**
 * 
 * @param {string} notes notes about error cause if any
 */
export const displayErrorMessage = async (notes) => {
    const dexSpace = document.querySelector('#pokedex');

    // display a loading message
    const loadingDisplay = <ErrorText notes={notes} />
    ReactDOM.render(loadingDisplay, dexSpace);
};

