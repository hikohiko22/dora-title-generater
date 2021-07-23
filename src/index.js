var Canvas = require('canvas');
var express = require('express');
var fs = require('fs');

var Font = Canvas.Font;
var Image = Canvas.Image;

var app = express();

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

			var submit ='<p style="font-size:2rem" >東京2020プラカードジェネレーター</p><p><input style="font-size:1.25rem" placeholder="プラカードに表示" type="text" id="message" name="namae"><button onclick="buttonClick()" value="送信する">送信</button><script>function buttonClick(){var href = document.getElementById("message"); var value= href.value; location.href = "http://127.0.0.1:5500/" + value; }</script>'
			var imgTag = '<br><br><img src="' + canvas.toDataURL() + '" />'
			var download = '<br><a style="font-size:2rem" href="' + canvas.toDataURL("image/png") + '" download >download</a>'
			var tweet = "<br><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>ツイートしてね：<a href='https://twitter.com/share' data-url='http://webnonotes.com/' data-text='東京2020プラカードジェネレータ'  class='twitter-share-button'>Tweet</a>"
			var html = submit + imgTag + download + tweet + "<br><p>利用素材:<a href='https://www.irasutoya.com/2021/07/blog-post_23.html'>プラカードのイラスト（吹き出し付き）</a><br>参考:<a href='https://github.com/pepoipod/dora-title-generater'>dora-title-generater</a></p>"
	    response.send(html);

	    /*
	    var base64 = canvas.toDataURL('image/png');
	    response.send(base64, {'Content-Type': 'image/png'}, 200);
	    */
	});
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});