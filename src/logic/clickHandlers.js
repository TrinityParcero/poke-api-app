const { getPokeByType } = require('./pokeLogic');

const genButtonClick = async () => {
    try {
        const genButton = document.querySelector('#genButton');
        const genBox = document.querySelector('#generator');
        const genText = document.querySelector('#generated');

        const typeInputs = document.querySelectorAll('input[name=type]');

        const getPokesByTypePromises = [];
        for (const input of typeInputs) {
            if (input.checked) {
                getPokesByTypePromises.push(getPokeByType(input.value));
            }
        }
        const result = await Promise.all(getPokesByTypePromises);
        genText.innerHTML = JSON.stringify(result);
    } catch (error) {
        console.log(`Something went wrong! Error: ${error.stack}`);
    }
};

module.exports = {
    genButtonClick
};