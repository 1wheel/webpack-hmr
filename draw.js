var d3 = require("./d3v4+jetpack.js");


var width = 960
var height = 960

var canvas = d3.select('canvas').node()
var ctx = canvas.getContext('2d');

ctx.beginPath()
ctx.moveTo(0, height)
ctx.lineTo(width/2, 0)
ctx.stroke()


console.log('drawing')


// ctx.fillStyle = "#" + formatHex(i) + "0000";
// ctx.fill();
// ctx.stroke()
