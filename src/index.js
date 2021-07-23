var Canvas = require('canvas');
var express = require('express');
var fs = require('fs');

var Font = Canvas.Font;
var Image = Canvas.Image;

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // set up ejs for templating
app.set('port', (process.env.PORT || 5500));
app.use(express.static(__dirname + '/public'));

app.get('/:txt', function(request, response) {
	var text = request.params.txt;

	fs.readFile(__dirname + '/images/placard_syuchusen.jpg', function(err, data){
	    if (err) throw err;

	    var img = new Image;
	    img.src = data;
	    var canvas = Canvas.createCanvas(img.width, img.height);
	    var ctx = canvas.getContext('2d');
	    ctx.drawImage(img, 0, 0, img.width, img.height);

	    var textMeasure;

	    ctx.font = '60px "Rounded Mgen+ 1c"';
	    ctx.textAlign = 'center';
		ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';

	    var tmpText = '';
	    var textPosY = 210;

	    for (var i = 0, len = text.length; i < len; i++) {
	    	tmpText += text[i];
	    	textMeasure = ctx.measureText(tmpText);

	    	if (textMeasure.width >= 370) {
	    		ctx.fillText(tmpText, canvas.width / 2, textPosY);

	    		tmpText = '';
	    		textPosY += 60;
	    	}
	    }

	    if (tmpText.length !== 0) {
	    	ctx.fillText(tmpText, canvas.width / 2, textPosY);
	    	tmpText = '';
	    }

			response.render('index.ejs',{imgBase64:canvas.toDataURL(),imgDL:canvas.toDataURL("image/png")});

	    /*
	    var base64 = canvas.toDataURL('image/png');
	    response.send(base64, {'Content-Type': 'image/png'}, 200);
	    */
	});
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});