var d3 = require("./d3v4+jetpack.js");


var width = 960
var height = 960

var canvas = d3.select('canvas').node()
var ctx = canvas.getContext('2d');

ctx.clearRect(0, 0, width, height)

ctx.strokeStyle = '#fff'


function drawOutline(){
  ctx.beginPath()
  ctx.moveTo(0, height)
  ctx.lineTo(width/2, 0)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(width, height)
  ctx.lineTo(width/2, 0)
  ctx.stroke()
}

function drawTriangle(p){
  ctx.beginPath()
  ctx.lineTo(p[0][0], p[0][1])
  ctx.lineTo(p[1][0], p[1][1])
  ctx.lineTo(p[2][0], p[2][1])
  ctx.fill()
}



ctx.fillStyle = 'rgba(255,255,255,.04)'

var points = d3.range(200).map(function(d, i){
  return [randomL(), randomR(), i % 2 ? randomL() : randomR()]
})

d3.timer(function(d){
  ctx.clearRect(0, 0, width, height)

  drawOutline()

  points.forEach(function(p, i){
    var p = [randomL(), randomR(), i % 2 ? randomL() : randomR()]
    drawTriangle(p)
  })

})


function randomL(){
  var x = Math.random()*width/2
  return [x, height - x*2]
}

function randomR(){
  var x = Math.random()*width/2 + width/2
  return [x, x*2- height]
}


console.log('drawing')

