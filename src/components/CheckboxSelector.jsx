import React from 'react';
import PropTypes from 'prop-types'

/**
 * set of paired checkboxes+labels for <values> within a fieldset with legend <category>
 */
class CheckboxSelector extends React.Component {
    constructor(props){
        super(props);
        this.category = props.category;
        this.values = props.values;
    }

    render(){
        return (
            <fieldset>
                <legend>{this.category}</legend>
                {this.values.map(inputValue =>
                    <PairedCheckboxAndLabel id={`${this.category}_${inputValue}`} value={inputValue} category={this.category}/>
                )}
            </fieldset>
        );
    }
}

/**
 * checkbox input and associated label
 */
class PairedCheckboxAndLabel extends React.Component {
    constructor(props) {
        super(props);
        this.value = props.value;
        this.category = props.category;
        this.id = props.id;
    }

    render() {
        return (
            <div>
                <input type="checkbox" id={this.id} value={this.value} name={this.category}/>
                <label htmlFor={this.id}>{this.value}</label>
            </div>                     
        );
    }
}

CheckboxSelector.propTypes = {
    category: PropTypes.string,
    values: PropTypes.array
};

export default CheckboxSelector;