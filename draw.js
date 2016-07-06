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
  ctx.lineTo(p[0].x, p[0].y)
  ctx.lineTo(p[1].x, p[1].y)
  ctx.lineTo(p[2].x, p[2].y)
  ctx.fill()
}



ctx.fillStyle = 'rgba(255,255,255,.04)'

var points = d3.range(1000).map(function(d, i){
  return [randomL(), randomR(), i % 2 ? randomL() : randomR()]
})

var t = d3.timer(function(d){
  ctx.clearRect(0, 0, width, height)

  drawOutline()

  points.forEach(function(p, i){
    p.forEach(function(d){
      var dx = (height/2 - d.y)*(height/2 - d.y)/100000
      // if (!i) console.log(dx)
      d.x += d.s < 0 ? -dx - .02 : dx + .02
      // console.log(d.x)
      if ( d.isL && d.x > width/2) d.x = 0
      if (!d.isL && d.x < width/2) d.x = width
      d.y = XtoY(d.x)
    })

    var dist = calcCenterDist(p)
    var opacity = (.15 - dist/1500)
    if (opacity < .001) return
    opacity = .1
    ctx.fillStyle = 'rgba(0,255,255,' + opacity +')'
    drawTriangle(p)
  })

  // t.stop() 
})
// console.log(points.map(calcCenterDist))


function randomL(){
  var x = Math.random()*width/2
  return {x:x, y: XtoY(x), isL: true, s: Math.random()}
}

function randomR(){
  var x = Math.random()*width/2 + width/2
  return {x:x, y: XtoY(x), isL: false, s: -Math.random()}
}

function XtoY(x){
  return x < width/2 ? height - x*2 : x*2 - height
}


function calcCenterDist(p){
  return Math.sqrt(
      (height/2 - p[0].y)*(height/2 - p[0].y) +
      (height/2 - p[1].y)*(height/2 - p[1].y) +
      (height/2 - p[2].y)*(height/2 - p[2].y)
    )
}
