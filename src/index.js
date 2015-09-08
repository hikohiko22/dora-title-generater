var fs = require('fs');
var express = require('express');
var app = express();

var Canvas = require('canvas');
//var canvas = new Canvas(200,200);
//var ctx = canvas.getContext('2d');

fs.readFile(__dirname + '/pronama.png', function(err, data){
    if (err) throw err;

    // データをcanvasのcontextに設定
    var img = new Image;
    img.src = data;
    var canvas = new Canvas(img.width, img.height);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
});

//ctx.font = '30px Impact';
//ctx.rotate(.1);
//ctx.fillText("Hello World!", 50, 100);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.send('<img src="' + canvas.toDataURL() + '" />');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});