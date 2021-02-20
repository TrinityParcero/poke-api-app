import React from 'react';
import PropTypes from 'prop-types';

/**
 * Load Text. displays a loading message and gif
 * 
 */
class LoadText extends React.Component{
    constructor(props){
        super(props);
        this.value = props.value;
        this.dataType = props.dataType;
    }

    render(){
        return(
            <div className="loadText">
                <h3>{`Loading ${this.value} ${this.dataType} data!`}</h3>
                <img src='..\images\load.gif' alt='pokeball rolling gif' height='100px'/>
            </div>
        );
    }
}

LoadText.propTypes = {
    value: PropTypes.string,
    dataTyp: PropTypes.string
};

export default LoadText;