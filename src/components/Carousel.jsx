import React from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

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
            <div className="slide">
                <img src={pokemon.sprite} alt={`${pokemon.name} sprite`}/>
                <p className="slideOverlay">{pokemon.name}</p>
            </div>
            );

        return(
            <Carousel arrows slides={slides} slidesPerPage={10} itemWidth={130} slidesPerScroll={3}/>
        );
    }
}

export default PokeCarousel;