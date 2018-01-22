// Sets global variables.
var fgImage = null;
var bgImage = null;
var fgCanvas;
var bgCanvas;

// Defines and prints foreground image on left canvas.
function loadfgImage() {
  var input = document.getElementById("fgImage");
  fgImage = new SimpleImage(input);
  fgCanvas = document.getElementById("foreground");
  fgImage.drawTo(fgCanvas);
}

// Defines and prints background image on right canvas.
function loadbgImage() {
  var input = document.getElementById("bgImage");
  bgImage = new SimpleImage(input);
  bgCanvas = document.getElementById("background");
  bgImage.drawTo(bgCanvas);
}

// Checks if images are loaded, calls to create composite and prints it.
function GS() {
  if (fgImage == null || ! fgImage.complete()) {
    alert("Foreground image not loaded yet.");
  }
  if (bgImage == null || ! bgImage.complete()) {
    alert("Background image not loaded yet.");
  }
  var compositeimage = Merge();
  compositeimage.drawTo(composite)
}

// Clears all three canvas
function del () {
  Remove(fgCanvas);
  Remove(bgCanvas);
  Remove(composite);
}


function Merge() {
  var compositeimage = new SimpleImage(fgImage.getWidth(),fgImage.getHeight());
  var threshold = 240;
  for (var pixel of fgImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (pixel.getGreen() > threshold) {
      var backgroundpixel = bgImage.getPixel(x,y)
      compositeimage.setPixel(x,y,backgroundpixel);
    }
    else {
      compositeimage.setPixel(x,y,pixel);
    }
  }
  return compositeimage
}

function Remove(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}
