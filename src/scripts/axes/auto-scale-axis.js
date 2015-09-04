/**
 * The auto scale axis uses standard linear scale projection of values along an axis. It uses order of magnitude to find a scale automatically and evaluates the available space in order to find the perfect amount of ticks for your chart.
 * **Options**
 * The following options are used by this axis in addition to the default axis options outlined in the axis configuration of the chart default settings.
 * ```javascript
 * var options = {
 *   // If high is specified then the axis will display values explicitly up to this value and the computed maximum from the data is ignored
 *   high: 100,
 *   // If low is specified then the axis will display values explicitly down to this value and the computed minimum from the data is ignored
 *   low: 0,
 *   // This option will be used when finding the right scale division settings. The amount of ticks on the scale will be determined so that as many ticks as possible will be displayed, while not violating this minimum required space (in pixel).
 *   scaleMinSpace: 20,
 *   // Can be set to true or false. If set to true, the scale will be generated with whole numbers only.
 *   onlyInteger: true,
 *   // The reference value can be used to make sure that this value will always be on the chart. This is especially useful on bipolar charts where the bipolar center always needs to be part of the chart.
 *   referenceValue: 5
 * };
 * ```
 *
 * @module Chartist.AutoScaleAxis
 */
/* global Chartist */
(function (window, document, Chartist) {
  'use strict';

  function AutoScaleAxis(axisUnit, data, chartRect, options) {
    // Usually we calculate highLow based on the data but this can be overriden by a highLow object in the options
    var highLow = options.highLow || Chartist.getHighLow(data.normalized, options, axisUnit.pos);
    this.bounds = Chartist.getBounds(chartRect[axisUnit.rectEnd] - chartRect[axisUnit.rectStart], highLow, options.scaleMinSpace || 20, options.onlyInteger);
    
    var scale = options.scale || 'linear'; 
    var match = scale.match(/^([a-z]+)(\d+)?$/);
    this.scale = {
      type : match[1],
      base : Number(match[2])
    }
    if (this.scale.type === 'log') {
      var base = this.scale.base;
      var minDecade = Math.floor(log(this.bounds.low, base));
      var maxDecade = Math.ceil(log(this.bounds.high, base));
      this.bounds.min = Math.pow(base, minDecade);
      this.bounds.max = Math.pow(base, maxDecade);
      this.bounds.values = [];
      for(var decade = minDecade; decade <= maxDecade; ++decade) {
        this.bounds.values.push(Math.pow(base, decade));
      }
    }
    
    Chartist.AutoScaleAxis.super.constructor.call(this,
      axisUnit,
      chartRect,
      this.bounds.values,
      options);
  }

  function log(val, base) {
    return Math.log(val) / Math.log(base);
  }
  
  function projectValue(value) {
    var v = +Chartist.getMultiValue(value, this.units.pos);
    if (this.scale.type === 'log') {
      var max = this.bounds.max;
      var min = this.bounds.min;
      var base = this.scale.base;
      return this.axisLength / log(max / min, base) * log(v / min, base);
    }
    return this.axisLength * (v - this.bounds.min) / this.bounds.range;      
  }

  Chartist.AutoScaleAxis = Chartist.Axis.extend({
    constructor: AutoScaleAxis,
    projectValue: projectValue
  });

}(window, document, Chartist));
