new Chartist.Line('.ct-chart', {
  series: [[
    {x: 1, y: 11000},
    {x: 2, y: 5000},
    {x: 4, y: 300},
    {x: 8, y: 12.5},
    {x: 16, y: 1.25},
    {x: 32, y: 0.25},
    {x: 100, y: 0.0625}
  ]]
}, {
  axisX: {
    type: Chartist.AutoScaleAxis,
    onlyInteger: true,
    //scalingTransformation: Chartist.Transformations.logBase(2)
    // Rather than the built-in linear and logarithmic transformations, you can also add your own:
    scalingTransformation: {
      f: function(value) {
        return Math.sqrt(value);
      },
      inv: function(value) {
        return value * value;
      }
    }
  },
  axisY: {
    type: Chartist.AutoScaleAxis,
    onlyInteger: false,
    scalingTransformation: Chartist.Transformations.logBase(10)
  }
});
