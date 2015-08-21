$(document).ready(function(){
  var imgCount = 0;
  var scale = 0.5;
  var canvas = document.getElementById('selectedImg');
  var ctx = canvas.getContext('2d');
  var imgData;

  $('#loadImg').click(function(event) {
    var container = $('.container');
    var image = container.append('<img src="http://1x1px.me/FF4D00-0.0.png" class="drag">');
    var images = container.children('img');
    var imgUrl = $('#img_url').val();
    var downloadingImage = new Image();
    downloadingImage.onload = function() {
      images[imgCount].src = this.src;
      var scaledHeight = downloadingImage.height * scale;
      var scaledWidth = downloadingImage.width * scale;
      $(images[imgCount]).attr('width', scaledWidth).attr('height', scaledHeight);
      // attach the dragging function
      $(images[imgCount]).drags();
      $(images[imgCount]).on('dblclick', function() {
        // resize the canvas if needed
        if(downloadingImage.height > canvas.height) {
          canvas.height = downloadingImage.height;
        }
        if(downloadingImage.width > canvas.width) {
          canvas.width = downloadingImage.width;
        }
        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw image to original height / width on canvas
        ctx.drawImage(downloadingImage, 0, 0, downloadingImage.width, downloadingImage.height);
      });
      imgCount++;
    }
    downloadingImage.src = imgUrl;
  });

$('#blueButton').click(function() {
  alert('This feature could not be implemented due to Cross Origin Research Sharing limitations.');
});


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
