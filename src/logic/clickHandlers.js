import React from 'react';
import ReactDOM from 'react-dom';
import PokeCarousel from '../components/Carousel';

import { getPokeByType } from './pokeLogic';

/**
 * gen button click. onClick method for generator button
 * gets checked status of all relevant inputs, then renders the results 
 * 
 */
export const genButtonClick = async () => {
    try {
        const resultSpace = document.querySelector('#carousel');
        const typeInputs = document.querySelectorAll('input[name=type]');

        // clear old pokemon
        // TODO: display a gif here until result set loads
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

        console.log(`Found ${resultData.length} pokemon`);

        //const pokeList = <PokeList values={resultData} />;
        const pokeList = <PokeCarousel slides={resultData} />

        ReactDOM.render(
            pokeList,
            resultSpace
        );
    } catch (error) {
        console.log(`Something went wrong! Error: ${error}`);
    }
};
