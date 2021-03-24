import React from 'react';
import {ArrowRight} from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

import {pokeSlideClick} from '../logic/clickHandlers';

const Yellow = "#ffb84b";
const Blue = "#6bafc9";

/**
 * color active. sets color of div with <id> to yellow
 * 
 * @param {string} id 
 */
const colorActive = (id) =>{
    const targetDiv = document.getElementById(id);
    targetDiv.style.backgroundColor = Yellow;
};

/**
 * color inactive. sets color of div with <id> to blue
 * 
 * @param {string} id 
 */
const colorInactive = (id) =>{
    const targetDiv = document.getElementById(id);
    targetDiv.style.backgroundColor = Blue;
};

/**
 * an individual element of an evolution chain with sprite and bg circle
 */
class ChainElement extends React.Component{
    constructor(props){
        super(props);
        this.evolutionLevel = props.evolutionLevel;
        this.pokemon = props.pokemon;
    }

    render(){

        return(
            <span>
                <img src={this.pokemon.sprite} alt={`${this.pokemon.name} sprite`}
                    onMouseOver={() => colorActive(`${this.pokemon.name}evoBg`)} 
                    onMouseLeave={() => colorInactive(`${this.pokemon.name}evoBg`)}
                    onClick={() => pokeSlideClick(this.pokemon)}
                /> 
                <div id={`${this.pokemon.name}evoBg`} className={`backCircle backCircleEvo${this.evolutionLevel}`}></div>
            </span>
        );
    }
}

/**
 * handles display of pokemon evolution chain
 */
class EvolutionChain extends React.Component{
    constructor(props){
        super(props);
        this.evolutionData = props.evolutionData;
    }

    render(){
        let firstLevel = false;
        if(this.evolutionData[1]){
            firstLevel = true;
        }
        let secondLevel = false;
        if(this.evolutionData[2]){
            secondLevel = true;
        }

        let firstLevelDiv = <div></div>;
        let secondLevelDiv = <div></div>;
        if(firstLevel){
            firstLevelDiv = 
            <div className="evoFirst">
                {/* <ArrowRight className="evoArrow"/> */}
                {this.evolutionData[1].map(pokemon => 
                    <ChainElement pokemon={pokemon} evolutionLevel="1"/>
                )}
            </div>;
            if(secondLevel){
                secondLevelDiv = 
                <div className="evoSecond">
                    {/* <ArrowRight className="evoArrow"/> */}
                    {this.evolutionData[2].map(pokemon => 
                        <ChainElement pokemon={pokemon} evolutionLevel="2"/>
                    )}
                </div>;
            }
        }

        return(
            <div>
                <div className="evoBase">
                    {this.evolutionData[0].map(pokemon => 
                        <ChainElement pokemon={pokemon} evolutionLevel="0"/>
                    )}
                </div>
                {firstLevelDiv}
                {secondLevelDiv}
            </div>
        );
    }
}

EvolutionChain.propTypes = {
    evolutionData: PropTypes.object
};

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
                    <p>{this.pokemonData.genus}</p> <br/>
                    <h3>COLOR</h3>
                    <p>{this.pokemonData.color}</p> <br/>
                    <h3>GENERATION</h3>
                    <p>{this.pokemonData.generation}</p> <br/>
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
                    <EvolutionChain evolutionData={this.pokemonData.evolutionChain}/>
                </div>
                
            </div>
        );
    }
}

PokedexEntry.propTypes = {
    pokemonData: PropTypes.object
};

export default PokedexEntry;