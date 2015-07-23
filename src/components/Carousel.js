/*===============================================
=            Components for Carousel            =
===============================================*/
"use strict";
import React from 'react';
import Slider from 'react-slick';
import defaults from 'lodash/object/defaults';

if (process.env.BROWSER) {
  require("../style/components/Carousel.scss");
  require("../style/vendors/slick-carousel/slick.scss");
  require("../style/vendors/slick-carousel/slick-theme.scss");
}

var Carousel = React.createClass({

    getDefaultProps() {
        return {
			slides: [],
			settings: {}
		}
    },

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

		if (this.props.slides.length > 1) {
			return (
		      <Slider {..._settings}>
			  	{this.props.slides}
		      </Slider>
		    );
		} else {
			return <noscript />;
		}

	    
	}

});

Carousel.propTypes = {
    slides: React.PropTypes.array
};

module.exports = Carousel;


/*-----  End of Components for Carousel  ------*/

