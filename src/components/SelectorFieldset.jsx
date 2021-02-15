import React from 'react';
import PropTypes from 'prop-types';

/**
 * set of paired inputs and labels of type <inputType> for <values> within a fieldset with legend <category>
 */
class SelectorFieldset extends React.Component {
    constructor(props){
        super(props);
        this.inputType = props.inputType;
        this.category = props.category;
        this.values = props.values;
    }

    render(){
        return (
            <fieldset id={this.category}>
                <legend>{this.category}</legend>
                {this.values.map(inputValue =>
                    <PairedInputAndLabel id={`${this.category}_${inputValue}`} value={inputValue} category={this.category} inputType={this.inputType}/>
                )}
            </fieldset>
        );
    }
}

/**
 * creates input of type <inputType> from <category> with <value> and associated label
 */
class PairedInputAndLabel extends React.Component {
    constructor(props) {
        super(props);
        this.value = props.value;
        this.inputType = props.inputType;
        this.category = props.category;
        this.id = props.id;
    }

    render() {
        // this is so the className attribute is nice and consistently camelCased
        const inputTypePascal = `${this.inputType[0].toUpperCase()}${this.inputType.slice(1)}`;
        return (
            <div className={`paired${inputTypePascal}AndLabel`}>
                <input type={this.inputType} id={this.id} value={this.value} name={this.category}/>
                <label htmlFor={this.id}>{this.value}</label>
            </div>                     
        );
    }
}

PairedInputAndLabel.propTypes = {
    value: PropTypes.string,
    category: PropTypes.string,
    id: PropTypes.string,
    inputType: PropTypes.string
};

SelectorFieldset.propTypes = {
    category: PropTypes.string,
    values: PropTypes.array,
    inputType: PropTypes.string
};

export default SelectorFieldset;