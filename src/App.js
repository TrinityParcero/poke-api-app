import React from 'react';
import { HouseDoor } from 'react-bootstrap-icons';

import SelectorFieldset from './components/SelectorFieldset';
import { PokeData } from './pokeData';
import { genButtonClick } from './logic/clickHandlers';

class App extends React.Component {
    render() {
        return (
            <div>
                <main>
                    <h1>POKÉ(API)DEX</h1>
                    <div id="homeLink">
                        <a href="https://trinity-parcero.web.app/" target="_blank" id="homeIcon">
                            <HouseDoor color="yellow" />
                        </a>
                    </div>
                    <div id="selectors">
                        <SelectorFieldset category="type" values={PokeData.types} inputType="radio" />
                        {/* <SelectorFieldset category="type2" values={PokeData.types} inputType="radio" /> */}
                    </div>
                    <div id="pokedex">
                        {/* until a pokemon is selected, use this section to display tutorial messages */}
                        <p>Try selecting some filters, then click a pokemon!</p>
                    </div>
                    <button id="genButton" onClick={genButtonClick}>get pokemon</button>
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