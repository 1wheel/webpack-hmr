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
ctx.globalCompositeOperation = 'lighter'

var points = d3.range(1000).map(function(d, i){
  return [randomL(), randomR(), i % 2 ? randomL() : randomR()]
})

if (window.t) window.t.stop()
window.points = points
window.t = d3.timer(function(d){
  ctx.clearRect(0, 0, width, height)

  drawOutline()

  points.forEach(function(p, i){
    p.forEach(function(d, i){
      var dx = .0005 + Math.abs(height/2 - d.y)/10
      var dist = Math.abs(height/2 - d.y)
      var dx = d.s*(dist + Math.abs(d.s))/100
      d.x += clamp(-1, dx, 1)
      if ( d.isL && d.x > width/2){
        d.s = -d.s
        d.x = width/2
      }
      if (!d.isL && d.x < width/2){
        d.s = -d.s
        d.x = width/2
      }
      if (d.x < 0 || d.x > width){
        d.s = -d.s
      }

      d.y = XtoY(d.x)
    })

    var dist = calcCenterDist(p)
    var isAbove = calcIsAbove(p)

    ctx.fillStyle = ['rgba(', 
      dist < 1000 &&  isAbove ? 0 : 255, ',', 
      dist < 1000 && !isAbove ? 0 : 255, ',', 
      255, ',', 
      dist < 10 ? .004 : .004, ')'].join('')

    drawTriangle(p)
  })

})


function randomL(){
  var x = width/4 + Math.random()*20 - 10
  return {x:x, y: XtoY(x), isL: true, s: (.5 - Math.random())}
}

function randomR(){
  var x = width/4 + Math.random()*20 - 10 + width/2
  return {x:x, y: XtoY(x), isL: false, s: (.5 -Math.random())}
}

function XtoY(x){
  return x < width/2 ? height - x*2 : x*2 - height
}


function calcIsAbove(p){
  return height/2*3 - p[0].y - p[1].y - p[2].y > 0
}

function calcCenterDist(p){
  return Math.abs(height/2 - p[0].y) + Math.abs(height/2 - p[1].y) + Math.abs(height/2 - p[2].y)
}

function clamp(a, b, c){
  return b < a ? a : b > c ? c : b
}