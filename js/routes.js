var request = require('request');


module.exports = function(app) {
  app.get('*', function(req, res) {
    res.sendFile('public/index.html');
  });

  app.post('/img-to-base64', function(req, res) {
    loadBase64Image(req.body.imgUrl, function(image, prefix) {
      res.send(prefix+image);
    });
  });

var loadBase64Image = function (url, callback) {
    // Required 'request' module
    var request = require('request');

    // Make request to our image url
    request({url: url, encoding: null}, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            // So as encoding set to null then request body became Buffer object
            var base64prefix = 'data:' + res.headers['content-type'] + ';base64,'
                , image = body.toString('base64');
            if (typeof callback == 'function') {
                callback(image, base64prefix);
            }
        } else {
            throw new Error('Can not download image');
        }
    });
};


}
