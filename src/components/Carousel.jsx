import React from 'react';
import Carousel from '@brainhubeu/react-carousel';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

import '@brainhubeu/react-carousel/lib/style.css';

import {pokeSlideClick } from '../logic/clickHandlers';

class PokeSlide extends React.Component{
    constructor(props){
        super(props);
        this.name = props.pokemon.name;
        this.art = props.pokemon.art;
        this.types = props.pokemon.types;
        this.sprite = props.pokemon.sprite;
    }

    render(){
        return(
            <div className="slide" onClick={() => pokeSlideClick(this.name, this.art, this.types, this.sprite)}>
                <img src={this.sprite} alt={`${this.name} sprite`}/>
                <p className="slideOverlay">{this.name}</p>
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