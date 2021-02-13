import React from 'react';
import PropTypes from 'prop-types';

class PokeList extends React.Component{
    constructor(props){
        super(props);
        this.values = props.values;
    }

    render(){
        return(
            <ul>
                {this.values.map(pokemon =>
                    <PokeListEntry sprite={pokemon.sprite} name={pokemon.name}/>
                )}
            </ul>
        );
    }
}

class PokeListEntry extends React.Component{
    constructor(props){
        super(props);
        this.sprite = props.sprite;
        this.name = props.name;
    }

    render(){
        return(
            <li>
                <img src={this.sprite} alt={`${this.name} sprite`} height="50px" />
                {this.name}
            </li>
        );
    }
}

export default PokeList;