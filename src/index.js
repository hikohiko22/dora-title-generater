var fs = require('fs');
var express = require('express');
var app = express();

var Canvas = require('canvas');
var Image = Canvas.Image;
var Font = Canvas.Font;

fs.readFile(__dirname + '/images/bg.jpg', function(err, data){
    if (err) throw err;

    // データをcanvasのcontextに設定
    var img = new Image;
    img.src = data;
    var canvas = new Canvas(img.width, img.height);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);

    var text = 'どこでもドア岩本';
    var textMeasure = ctx.measureText(text);

    console.log(textMeasure.width, textMeasure.height);

    ctx.font = '45px "Rounded Mgen+ 1c"';
    ctx.textAlign = 'center';

	ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
	ctx.fillText(text, canvas.width / 2, 110);

	text = 'hogehohgoe';

	ctx.fillText(text, canvas.width / 2, 110);

	console.log(textMeasure.width, textMeasure.height);

    app.set('port', (process.env.PORT || 5000));
	app.use(express.static(__dirname + '/public'));

	app.get('/', function(request, response) {
	    response.send('<img src="' + canvas.toDataURL() + '" />');
	});

	app.listen(app.get('port'), function() {
	  console.log("Node app is running at localhost:" + app.get('port'));
	});
});