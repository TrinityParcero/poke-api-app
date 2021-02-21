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
        let typeDisplay = '';
        if(this.pokemonData.types.length > 1){
            for(let i = 0; i < this.pokemonData.types.length; i++){
                typeDisplay +=(this.pokemonData.types[i]);
                if(this.pokemonData.types[i+1]){
                    typeDisplay += (' | ');
                }
            }
        }
        else{
            typeDisplay = this.pokemonData.types[0];
        }
    
        return(
            <div id="pokedexParent">
                <h2>{`#${this.pokemonData.number} ${this.pokemonData.name.toUpperCase()}`}</h2>
                <div id="dexSidebar">
                    <h3>GENUS</h3>
                    <p>{this.pokemonData.genus}</p>
                    <h3>COLOR</h3>
                    <p>{this.pokemonData.color}</p>
                    <h3>GENERATION</h3>
                    <p>{this.pokemonData.generation}</p>
                    <h3>TYPES</h3>
                    <p>{typeDisplay}</p>
                </div>
                <div id="dexImage">
                    <div className="backCircle"></div>
                    <img src={this.pokemonData.art} alt={`${this.pokemonData.name} official art`}/>
                </div>
                <div id="dexText">
                    <p className="dropCap">{this.pokemonData.text[0]}</p>
                    <p className="continuedText">{this.pokemonData.text.slice(1)}</p>
                </div>
                <div id="evolutionChain">
                    <h4>EVOLUTION CHAIN</h4>
                    {this.pokemonData.evolutionChain}
                </div>
                
            </div>
        );
    }
}

export default PokedexEntry;