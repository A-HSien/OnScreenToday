"use strict";

import React, { Component } from "react";
import Slider from './vendors/react-slick';

// import * as slickCustomized from 'styles/components/carousel.less';
import defaults from 'lodash/object/defaults';

if (process.env.BROWSER) {
  require("slick-carousel/slick/slick.css");
  require("slick-carousel/slick/slick-theme.css");
}


class Carousel extends Component {
	
	getDefaultProps() {
        return {
			slides: [],
			settings: {}
		}
    }

    render () {
		var _settings = defaults({}, this.props.settings, {
			dots: false,
			infinite: true,
			arrows: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			responsive: [ { breakpoint: 558, settings: { slidesToShow: 1, arrows: false,  dots: true, focusOnSelect: true, draggable: false} },
				{ breakpoint: 768, settings: { slidesToShow: 1 } }, 
				{ breakpoint: 1024, settings: { slidesToShow: 1 } } 
			]
		});

	    return (
	      <Slider {..._settings}>
		  	{this.props.slides}
	      </Slider>
	    );
	}
}

export default Carousel;