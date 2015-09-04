new Chartist.Line('.ct-chart', {
  series: [[
    {x: 1, y: 11000},
    {x: 2, y: 5000},
    {x: 4, y: 300},
    {x: 8, y: 12.5},
    {x: 16, y: 1.25},
    {x: 32, y: 0.25},
    {x: 100, y: 0.0625},
  ]]
}, {
  axisX: {
    type: Chartist.AutoScaleAxis,
    onlyInteger: true,
    scale: 'log2'
  }, 
  axisY: {
    type: Chartist.AutoScaleAxis,
    onlyInteger: false,
    scale: 'log10'
  }  
});
