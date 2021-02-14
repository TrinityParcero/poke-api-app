import React from 'react';

import CheckboxSelector from './components/CheckboxSelector';
import { PokeData } from './pokeData';
import genButtonClick from './logic/clickHandlers';

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
                        <CheckboxSelector category="type" values={PokeData.types} />
                        <button id="genButton" onClick={genButtonClick}>get pokemon</button>
                    </div>
                    <div id="carousel"></div>
                </main>
                <footer>
                    <p>Trinity Parcero 2021 | PokéAPI created by Paul Hallett | Pokemon® Nintendo</p>
                </footer>
            </div>
        );
    }
}

export default App;