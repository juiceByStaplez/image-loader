$(document).ready(function(){
  var scale = 0.5;
  var canvas = document.getElementById('selectedImg');
  var ctx = canvas.getContext('2d');
  var canvasImage;



  $('#loadImg').submit(function(event) {
    event.preventDefault();
    var imgUrl = $('#img_url').val();
    var base64img = getBase64(imgUrl);
    base64img.done(function(data) {
      loadImage(data);
    });
  });

  $('#blueButton').click(function() {
    blueImage(canvasImage);
  });

function getBase64(url) {
  var base64string = '';
  var request = $.post('/img-to-base64', {imgUrl: url});
  return request;
}

function loadImage(base64) {
  var container = document.getElementById('container');
  var image = new Image();
  image.src = base64;
  image.classList.add('drag');
  var scaledHeight = image.height * scale;
  var scaledWidth = image.width * scale;
  image.setAttribute('height', scaledHeight);
  image.setAttribute('width', scaledWidth);
  container.appendChild(image);
  $(image).drags();
  $(image).on('dblclick', function(image) {
    canvasImage = new Image();
    canvasImage.src = base64;
    // resize the canvas if needed
    if(canvasImage.height > canvas.height) {
      canvas.height = canvasImage.height;
    }
    if(canvasImage.width > canvas.width) {
      canvas.width = canvasImage.width;
    }
      // clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // draw image to original height / width on canvas
      ctx.drawImage(canvasImage, 0, 0, canvasImage.width, canvasImage.height);
    });
}

function blueImage(img) {
  // get ImageData to manipulate
  var imageData = ctx.getImageData(0, 0, img.width, img.height);
  var data = imageData.data;
  // loop through pixels, raise the blue channel by 100
  for(var i = 0; i < data.length; i += 4) {
  data[i + 2] = data[i+2]+100;
  }
  ctx.putImageData(imageData, 0, 0);
}

// quick google solution for draggable elements
$.fn.drags = function(opt) {

  opt = $.extend({handle:"",cursor:"move"}, opt);

  if(opt.handle === "") {
    var $el = this;
  } else {
    var $el = this.find(opt.handle);
  }

  return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
    if(opt.handle === "") {
      var $drag = $(this).addClass('draggable');
    } else {
      var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
    }
    var z_idx = $drag.css('z-index'),
    drg_h = $drag.outerHeight(),
    drg_w = $drag.outerWidth(),
    pos_y = $drag.offset().top + drg_h - e.pageY,
    pos_x = $drag.offset().left + drg_w - e.pageX;
    $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
      $('.draggable').offset({
        top:e.pageY + pos_y - drg_h,
        left:e.pageX + pos_x - drg_w
      }).on("mouseup", function() {
        $(this).removeClass('draggable').css('z-index', z_idx);
      });
    });
            e.preventDefault(); // disable selection
          }).on("mouseup", function() {
            if(opt.handle === "") {
              $(this).removeClass('draggable');
            } else {
              $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
          });

        }
      });
