import React from 'react';

import SelectorFieldset from './components/SelectorFieldset';
import { PokeData } from './pokeData';
import { genButtonClick } from './logic/clickHandlers';

class App extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <h1>PokéAPI App</h1>
                    <p>Just a little app serving up data from the PokéAPI</p>
                </header>
                <main>
                    <div id="selectors">
                        <SelectorFieldset category="type" values={PokeData.types} inputType="radio" />
                        {/* <SelectorFieldset category="type2" values={PokeData.types} inputType="radio" /> */}
                        <button id="genButton" onClick={genButtonClick}>get pokemon</button>
                    </div>
                    <div id="pokedex">
                        {/* until a pokemon is selected, use this section to display tutorial messages */}
                    </div>
                    <div id="carousel"></div>
                </main>
                <footer>
                    <p>Trinity Parcero 2021 | PokéAPI created by Paul Hallett | Pokemon® Nintendo</p>
                </footer>
            </div >
        );
    }
}

export default App;