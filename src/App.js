import React from 'react';
import CheckboxSelector from './components/CheckboxSelector';

const valuesArray = ['0', '1', '2'];

class App extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <h1>PokéAPI App</h1>
                    <p>Just a little app serving up data from the PokéAPI</p>
                </header>
                <CheckboxSelector category="category" values={valuesArray} />
                <footer>
                    <p>Trinity Parcero 2021 | PokéAPI created by Paul Hallett | Pokemon® Nintendo</p>
                </footer>
            </div>
        );
    }
}

export default App;