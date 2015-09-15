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

    var text = 'どこでもドア岩本はすごくたのしいんだ。すごいよ＝＝＝＝＝＝えへへへっへへｈ従来の方式では、全てのLEDバンドを大きな電波で制御していた為、壁などの反響による誤作動や、アンテナの設置に問題がありました。';
    var textMeasure = ctx.measureText(text);

    ctx.font = '45px "Rounded Mgen+ 1c"';
    ctx.textAlign = 'center';
	ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';

    var tmpText = '';
    var textPosY = 105;

    for (var i = 0, len = text.length; i < len; i++) {
    	tmpText += text[i];
    	textMeasure = ctx.measureText(tmpText);

    	if (textMeasure.width >= 360) {
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
	    response.send('<img src="' + canvas.toDataURL() + '" />');
	});

	app.listen(app.get('port'), function() {
	  console.log("Node app is running at localhost:" + app.get('port'));
	});
});