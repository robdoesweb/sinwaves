var pi = Math.PI;

var a = {
  x: 0,
  y: 0,
  w: window.innerWidth,
  h: window.innerHeight,
  ctx: {},
  canvas: {},
  ncanvas: {},
  wiggle: 0,
  offSet: 2,
  
  frame: function() {
    a.setDelta();
    a.draw();
    a.animationFrame = window.requestAnimationFrame(a.frame);
  },
  
  init: function() {
     a.ncanvas = document.createElement('canvas');
     a.ncanvas.height = a.h;
     a.ncanvas.width = a.w;
     a.ncanvas.id = "myCanvas";
     document.body.appendChild(a.ncanvas);
     a.canvas = document.getElementById("myCanvas");
     if (a.canvas.getContext){
        //setup context
        a.ctx = a.canvas.getContext('2d');
        //fill background
        a.ctx.fillStyle = "#222"
        a.ctx.fillRect(0,0,a.w,a.h);
        a.frame();
    }
  },
  
    draw: function() {
      a.ctx.fillStyle = "#9999FF";
      a.ctx.strokeStyle = "#EEE";
      a.ctx.lineWidth = 0.5;
      a.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
      a.ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
      a.wiggle += 10;
      // for (var i = 0; i <= 1000; i++) {
      //   a.x = i;
      //   a.y = 100 + 10 * Math.sin(a.x + a.wiggle);
      //   a.ctx.moveTo(a.x,a.y);
      //   a.ctx.lineTo(a.x+5, a.y+5);
      //   a.ctx.stroke();
      // }
      a.x += a.offSet * pi/2;
      a.wiggle += 2;
      a.y = 100 + 50 * Math.sin(a.x);
      //a.ctx.moveTo(a.x,a.y);
      a.ctx.lineTo(a.x + 5, a.y + 5);
      a.ctx.stroke();
      if (a.x >= window.innerWidth) {
        a.x = 0;
        a.ctx.moveTo(a.x,a.y);
        a.offSet += 3;
        }
  },
  
  setDelta: function() {
     a.now = Date.now();
     a.delta = (a.now - a.then) / 1000;
     a.then = a.now;
  }
}

//handle window resizing
window.onresize = function (e) {
  a.ncanvas.width = window.innerWidth;
  a.ncanvas.height = window.innerHeight;
  a.draw();
}

a.init();