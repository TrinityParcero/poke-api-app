import React from 'react';
import { HouseDoor, JournalText } from 'react-bootstrap-icons';

import SelectorFieldset from './components/SelectorFieldset';
import { PokeData } from './pokeData';
import { genButtonClick } from './logic/clickHandlers';

class App extends React.Component {
    render() {
        return (
            <div>
                <main>
                    <div id="leftChunk">
                        <h1>POKÉ(API)DEX</h1>
                        <div id="homeLink">
                            <a href="https://trinity-parcero.web.app/" target="_blank" id="homeIcon">
                                <HouseDoor color="#ffb84b" title="to main portfolio page" />
                            </a>
                        </div>
                        <div id="aboutLink">
                            <a href="https://github.com/TrinityParcero/poke-api-app/blob/main/README.md" target="_blank" id="aboutIcon">
                                <JournalText color="#ffb84b" title="to about page" />
                            </a>
                        </div>
                        <div id="pokedexTop" className="pokedex">
                            <p className='loadText'>Pick a type, then click the 'get pokemon' button!</p>
                        </div>
                        <div id="selectors">
                            <SelectorFieldset category="type" values={PokeData.types} inputType="radio" />
                            <button id="genButton" onClick={genButtonClick}>get pokemon</button>
                        </div>
                    </div>
                    <div id="pokedexBottom" className="pokedex">
                        <p className='loadText'>Pick a type, then click the 'get pokemon' button!</p>
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