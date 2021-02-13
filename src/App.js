import React from 'react';
import CheckboxSelector from './components/CheckboxSelector';

const Types = [
    'grass',
    'fire',
    'water',
    'flying',
    'normal',
    'rock',
    'bug',
    'dragon',
    'steel',
    'dark',
    'electric',
    'fighting',
    'ground',
    'ice',
    'poison',
    'psychic',
    'ghost',
    'fairy'
];

class App extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <h1>PokéAPI App</h1>
                    <p>Just a little app serving up data from the PokéAPI</p>
                </header>

                <CheckboxSelector category="type" values={Types} />

                <footer>
                    <p>Trinity Parcero 2021 | PokéAPI created by Paul Hallett | Pokemon® Nintendo</p>
                </footer>
            </div>
        );
    }
}

export default App;