import React from 'react';
import { HouseDoor, JournalText } from 'react-bootstrap-icons';

import { SelectorFieldset, PairedSelectAndLabel } from './components/InputHelpers';
import { PokeData } from './pokeData';
import { genButtonClick, swapColor } from './logic/clickHandlers';

const Yellow = "#ffb84b";
const Blue = "#6bafc9";

class App extends React.Component {
    render() {
        return (
            <div>
                {/* 
                    these divs are for creating the page border - a border
                    around the body element itself gets weird with changing page size
                */}
                <div id="left"></div>
                <div id="right"></div>
                <div id="top"></div>

                <h1>POKÉ(API)DEX</h1>
                <div id="homeLink">
                    <p class="linkLabel">portfolio</p>
                    <a href="https://trinity-parcero.web.app/" target="_blank" id="homeIcon">
                        <HouseDoor id="houseDoor" title="to main portfolio page"
                            onMouseOver={() => swapColor('houseDoor', Blue, false)}
                            onMouseLeave={() => swapColor('houseDoor', Yellow, false)} />
                    </a>
                </div>
                <div id="aboutLink">
                    <p class="linkLabel">github</p>
                    <a href="https://github.com/TrinityParcero/poke-api-app/blob/main/README.md" target="_blank" id="aboutIcon">
                        <JournalText id="journalText" title="to about page"
                            onMouseOver={() => swapColor('journalText', Blue, false)}
                            onMouseLeave={() => swapColor('journalText', Yellow, false)}
                        />
                    </a>
                </div>
                <div id="leftChunk">
                    <div id="pokedexTop" className="pokedex">
                        <p className='loadText'>Pick a type, then click the 'get pokemon' button!</p>
                    </div>
                    <div id="topCarousel" class="carousel"></div>
                    <div id="selectors">
                        <SelectorFieldset name="type" category="type" values={PokeData.types} inputType="radio" />
                        <SelectorFieldset name="secondaryType" category="type" values={PokeData.types} inputType="radio" />
                        <SelectorFieldset name="generation" category="gen" values={PokeData.generations} inputType="checkbox" />
                        <SelectorFieldset name="color" category="color" values={PokeData.colors} inputType="checkbox" />
                        <button id="genButton" onClick={genButtonClick}>GET POKÉMON</button>
                    </div>
                </div>
                <div id="pokedexBottom" className="pokedex">
                    <p className='loadText'>Pick a type, then click the 'get pokemon' button!</p>
                </div>
                <div id="bottomCarousel" class="carousel"></div>
                <footer>
                    <p>Trinity Parcero 2021 | PokéAPI created by Paul Hallett | Pokemon® Nintendo</p>
                </footer>
            </div >
        );
    }
}

export default App;