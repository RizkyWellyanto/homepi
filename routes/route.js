/**
 * Created by rizky on 12/11/15.
 */

var express = require('express');
var path = require('path');
var router = express.Router();
var sys = require('sys');
var exec = require('child_process').exec;
var fs = require('fs');
var multiparty = require('multiparty');
var multipart = require('connect-multiparty');
var util = require('util');

var multipartyMiddleware = multipart();

router.get('/', function (req, res, next) {
    res.send("Wellyanto HomePi");
    if (typeof next === "function") {
        next();
    }
});

router.route('/ascii')
    .post(multipartyMiddleware, function (req, res, next) {
        //console.log(req.files);
        //console.log(req.files.image.path);

        var fileName = req.files.image.originalFilename;
        fileName = fileName.slice(0, -4);
        //console.log(fileName);

        // read image from request body
        fs.readFile(req.files.image.path, function (err, data) {
            // save the image into the server
            fs.writeFile("./images/" + fileName + ".jpg", data, function(err){
                if (err)
                    console.log(err);

                createAscii();
            });
            console.log("file: " + fileName + ".jpg received!");
        });

        var createAscii = function () {
            // convert the image using jp2a library
            var command = "jp2a --invert --width=300 --color --html --background=light ./images/" + fileName + ".jpg --output=./ascii/" + fileName + ".html";
            console.log("jp2a: " + fileName + ".html created!");
            function puts(error, stdout, stderr) {sys.puts(stdout);}
            exec(command, puts);

            // TODO return the html file back
            res.type("html");
            res.sendFile(fileName +'.html',{ root: path.join(__dirname ,'../ascii/')});
            //res.render(fileName +'.html',{ root: path.join(__dirname ,'../ascii/')});
            //console.log(path.join(__dirname ,'../ascii/') + fileName + ".html");
            res.send();
        };
    }
);

module.exports = router;
