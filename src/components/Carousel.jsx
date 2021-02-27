import React from 'react';
import Carousel from '@brainhubeu/react-carousel';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

import '@brainhubeu/react-carousel/lib/style.css';

import {pokeSlideClick } from '../logic/clickHandlers';

const Red = "#d32d11";
const Blue = "#251a66";

/**
 * color active. sets color of div with <id> to red
 * 
 * @param {string} id 
 */
const colorActive = (id) =>{
    const targetDiv = document.getElementById(id);
    targetDiv.style.backgroundColor = Red;
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

class PokeSlide extends React.Component{
    constructor(props){
        super(props);
        this.pokemon = props.pokemon;
    }

    render(){
        return(
            <div className="slide" onClick={() => pokeSlideClick(this.pokemon)}>
                <img src={this.pokemon.sprite} alt={`${this.pokemon.name} sprite`} 
                    onMouseOver={() => colorActive(`${this.pokemon.name}Bg`)} 
                    onMouseLeave={() => colorInactive(`${this.pokemon.name}Bg`)}
                />
                <div className="backCircle" id={`${this.pokemon.name}Bg`}></div>
                <p className="slideOverlay">{this.pokemon.name}</p>
            </div>
        );
    }
}

/**
 * creates a carousel with the given slides
 * each slide should include <caption> and <image>
 */
class PokeCarousel extends React.Component{
    constructor(props){
        super(props);
        this.slides = props.slides;
    }

    // https://reactjsexample.com/a-react-way-react-component-that-does-not-suck/
    render(){
        const slides = this.slides.map(pokemon =>
                <PokeSlide pokemon={pokemon}></PokeSlide>
            );

        return(
            <Carousel addArrowClickHandler arrowLeft={<ArrowLeft className="icon-example" name="arrow-left" />} arrowRight={<ArrowRight className="icon-example" name="arrow-right"/>} slides={slides} slidesPerPage={10} itemWidth={130} slidesPerScroll={3}/>
        );
    }
}

Carousel.propTypes = {
    slides: PropTypes.array
};

export default PokeCarousel;