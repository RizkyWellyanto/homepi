/**
 * Created by rizky on 12/11/15.
 */

var express = require('express');
var path = require('path');
var router = express.Router();
var sys = require('sys');
var execSync = require('child_process').execSync;
var fs = require('fs');
var multiparty = require('multiparty');
var multipart = require('connect-multiparty');
var util = require('util');

var multipartyMiddleware = multipart();

router.get('/', function (req, res, next) {
    res.send("Welcome to Wellyanto HomePi");
    if (typeof next === "function") {
        next();
    }
});

router.route('/ascii')
    .get(function (req, res, next) {
        res.sendFile('ascii.html', {root: path.join(__dirname, '../')});
    });

router.route('/ascii')
    .post(multipartyMiddleware, function (req, res, next) {
        // check whether image is undefined or not
        if (req.files.image) {
            var fileName = req.files.image.originalFilename;
            fileName = fileName.slice(0, -4);

            // read image from request body
            fs.readFile(req.files.image.path, function (err, data) {
                // save the image into the server
                fs.writeFile("./images/" + fileName + ".jpg", data, function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    // create ascii when ready
                    createAscii();
                });
                console.log("file: " + fileName + ".jpg received!");
            });
        }
        else {
            console.log("Image is undefined!");
            res.send("Image is undefined!");
        }

        // call jp2a library from shell using execSync
        var createAscii = function (next) {
            var command = "jp2a --invert --width=300 --color --html --background=light ./images/" + fileName + ".jpg --output=./ascii/" + fileName + ".html";
            console.log("jp2a: " + fileName + ".html created!");
            execSync(command, sendHTML());
        }

        // send the created html file to the client
        var sendHTML = function (next) {
            res.type("html");
            setTimeout(function () {
                res.sendFile(fileName + '.html', {root: path.join(__dirname, '../ascii/')});
            }, 100); // sometimes the html is not ready yet, thus wait 0.1 second
            console.log("response: " + fileName + ".html sent!");
        }
    });

module.exports = router;
