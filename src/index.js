var Canvas = require('canvas');
var express = require('express');
var fs = require('fs');
var req = require('request');

var Font = Canvas.Font;
var Image = Canvas.Image;

var app = express();

fs.readFile(__dirname + '/images/bg.jpg', function(err, data){
    if (err) throw err;

    // データをcanvasのcontextに設定
    var img = new Image;
    img.src = data;
    var canvas = new Canvas(img.width, img.height);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);

    var text = 'どこでもドア岩本はすごくたのしいんだ。すごいよ＝＝＝＝＝＝えへへへっへへｈ従来の方式では、全ての';
    var textMeasure;

    ctx.font = '45px "Rounded Mgen+ 1c"';
    ctx.textAlign = 'center';
	ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';

    var tmpText = '';
    var textPosY = 105;

    for (var i = 0, len = text.length; i < len; i++) {
    	tmpText += text[i];
    	textMeasure = ctx.measureText(tmpText);

    	if (textMeasure.width >= 370) {
    		ctx.fillText(tmpText, canvas.width / 2, textPosY);

    		tmpText = '';
    		textPosY += 50;
    	}
    }

    if (tmpText.length !== 0) {
    	ctx.fillText(tmpText, canvas.width / 2, textPosY);
    	tmpText = '';
    }

    app.set('port', (process.env.PORT || 5000));
	app.use(express.static(__dirname + '/public'));

	app.get('/', function(request, response) {
	    req.get(url, function(error, response, body){
        if (!error && response.statusCode == 200) {
        	console.log('body');
            console.log(body);
        } else {
            console.log('error: '+ response.statusCode);
        }
	});

	app.listen(app.get('port'), function() {
	  console.log("Node app is running at localhost:" + app.get('port'));
	});
});