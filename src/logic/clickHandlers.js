import React from 'react';
import ReactDOM from 'react-dom';
import PokeList from '../components/PokemonList';

const { getPokeByType } = require('./pokeLogic');

/**
 * 
 */
const genButtonClick = async () => {
    try {
        const genText = document.querySelector('#generated');
        const typeInputs = document.querySelectorAll('input[name=type]');

        // clear old pokemon
        // TODO: display a gif here until result set loads
        ReactDOM.render('', genText);

        const getPokesByTypePromises = [];
        for (const input of typeInputs) {
            if (input.checked) {
                getPokesByTypePromises.push(getPokeByType(input.value));
            }
        }
        const resultData = (await Promise.all(getPokesByTypePromises))[0];

        console.log(`Found ${resultData.length} pokemon`);

        const pokeList = <PokeList values={resultData} />;

        ReactDOM.render(
            pokeList,
            genText
        );
    } catch (error) {
        console.log(`Something went wrong! Error: ${error.stack}`);
    }
};

export default genButtonClick;