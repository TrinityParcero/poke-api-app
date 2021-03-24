import React from 'react';
import PropTypes from 'prop-types';

/**
 * set of paired inputs and labels of type <inputType> for <values> within a fieldset with legend <category>
 * intended for use with either radio buttons or checkbox inputs
 */
export class SelectorFieldset extends React.Component {
    constructor(props){
        super(props);
        this.inputType = props.inputType;
        this.category = props.category;
        this.values = props.values;
        this.name = props.name;
    }

    render(){
        return (
            <fieldset className={this.category} id={this.name}>
                <legend>{this.name}</legend>
                {this.values.map(inputValue =>
                    <PairedInputAndLabel id={`${this.name}_${inputValue}`} value={inputValue} name={this.name} inputType={this.inputType}/>
                )}
            </fieldset>
        );
    }
}

/**
 * creates input of type <inputType> from <name> with <value> and associated label
 * intended for either radio or checkbox type inputs, other types might get funky
 */
class PairedInputAndLabel extends React.Component {
    constructor(props) {
        super(props);
        this.value = props.value;
        this.inputType = props.inputType;
        this.name = props.name;
        this.id = props.id;
    }

    render() {
        // this is so the className attribute is nice and consistently camelCased
        const inputTypePascal = `${this.inputType[0].toUpperCase()}${this.inputType.slice(1)}`;
        return (
            <div className={`paired${inputTypePascal}AndLabel`}>
                <input type={this.inputType} id={this.id} value={this.value} name={this.name}/>
                <label htmlFor={this.id}>{this.value}</label>
            </div>                     
        );
    }
}

/**
 * creates select (dropdown) element of <name> with <values> and paired label element
 */
export class PairedSelectAndLabel extends React.Component{
    constructor(props) {
        super(props);
        this.values = props.values;
        this.name = props.name;
        this.size = props.size;
    }
    render() {
        return (
            <div className='pairedSelectAndLabel'>
                <label htmlFor={this.name}>{this.name}</label>
                <select id={this.name} name={this.name} size={this.size} multiple>
                    {this.values.map(inputValue =>
                        <option value={inputValue}>{inputValue}</option>
                    )}
                </select>
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
