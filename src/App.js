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
                    <CheckboxSelector category="type" values={PokeData.types} />
                    <div id="generator">
                        <div id="generated"></div>
                        <button id="genButton" onClick={genButtonClick}>generate</button>
                    </div>
                </main>
                <footer>
                    <p>Trinity Parcero 2021 | PokéAPI created by Paul Hallett | Pokemon® Nintendo</p>
                </footer>
            </div>
        );
    }
}

export default App;