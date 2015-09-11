var fs = require('fs');
var express = require('express');
var app = express();

var Canvas = require('canvas');
var Image = Canvas.Image;

fs.readFile(__dirname + '/images/bg.jpg', function(err, data){
    if (err) throw err;

    // データをcanvasのcontextに設定
    var img = new Image;
    img.src = data;
    var canvas = new Canvas(img.width, img.height);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);

    var text = 'どこでもドア';
    var textMeasure = ctx.measureText(text);

    ctx.font = 'bold 30px Century Gothic,"Hiragino Kaku Gothic ProN"';
    ctx.textAlign = 'center';

	ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
	ctx.fillText(text, canvas.width / 2, 100);

	console.log(canvas.width, textMeasure.width);

    app.set('port', (process.env.PORT || 5000));
	app.use(express.static(__dirname + '/public'));

	app.get('/', function(request, response) {
	    response.send('<img src="' + canvas.toDataURL() + '" />');
	});

	app.listen(app.get('port'), function() {
	  console.log("Node app is running at localhost:" + app.get('port'));
	});
});