/**
 * Created by rizky on 12/11/15.
 */

var express = require('express');
var path = require('path');
var routes = require('./routes/route');
var app = express();
var bodyParser = require('body-parser');
var compression = require('compression');

// middlewares
app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.raw({ type: 'image/jpg' }));
app.use(bodyParser.text({type:'text/html'}));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(express.static(path.join(__dirname, '/ascii')));
app.use(express.static(path.join(__dirname, '/images')));
app.use('/', routes);

// run server
var server = app.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server listening at http://%s:%s', host, port);
});
