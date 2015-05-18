"use strict";

import _ from "lodash";
var React = require('react');

var InnerSlider = require('./inner-slider.jsx');
var json2mq = require('json2mq');
var ResponsiveMixin = require('react-responsive-mixin');

var Slider = React.createClass({
  mixins: [ResponsiveMixin],
  getInitialState: function () {
    return {
      breakpoint: null
    };
  },
  componentDidMount: function () {
    var breakpoints = _.sortBy(_.pluck(this.props.responsive, 'breakpoint'));

    breakpoints.forEach(function (breakpoint, index) {
      var query;
      if (index === 0) {
        query = json2mq({minWidth: 0, maxWidth: breakpoint});
      } else {
        query = json2mq({minWidth: breakpoints[index-1], maxWidth: breakpoint});
      }
      this.media(query, function () {
        this.setState({breakpoint: breakpoint});
      }.bind(this));
    }.bind(this));

    // Register media query for full screen. Need to support resize from small to large
    var query = json2mq({minWidth: breakpoints.slice(-1)[0]});

    this.media(query, function () {
       this.setState({breakpoint: null});
    }.bind(this));
  },
  render: function () {
    var settings;
    var newProps;
    var jsx;
    if (this.state.breakpoint) {
      newProps = _.filter(this.props.responsive, {breakpoint: this.state.breakpoint});
      settings = _.assign({}, this.props, newProps[0].settings);
    } else {
      settings = this.props;
    }

    jsx = <InnerSlider {...settings} />;
    return jsx;
  }
});

module.exports = Slider;
