import React from 'react';
import PropTypes from 'prop-types';

/**
 * "pokedex entry" div that displays information about a certain pokemon
 */
class PokedexEntry extends React.Component{
    constructor(props){
        super(props);
        this.pokemonData = props.pokemonData;
    }

    render(){
        return(
            <div>
                <h2>{this.pokemonData.name}</h2>
                <h2>{this.pokemonData.number}</h2>
                <div id="dexImage">
                    <img src={this.pokemonData.art} alt={`${this.pokemonData.name} official art`}/>
                </div>
                <div id="dexText">
                    <p className="dropCap">{this.pokemonData.text[0]}</p>
                    <p className="continuedText">{this.pokemonData.text.slice(1)}</p>
                </div>
                <div id="evolutionChain">
                    {this.pokemonData.evolutionChain}
                </div>
                <div id="dexSidebar">
                    <p>{this.pokemonData.genus}</p>
                    <p>{this.pokemonData.color}</p>
                    <p>{this.pokemonData.generation}</p>
                    <p>{this.pokemonData.types}</p>
                </div>
            </div>
        );
    }
}

export default PokedexEntry;