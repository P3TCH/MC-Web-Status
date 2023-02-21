var port = 8080;

var express = require('express');
const path = require('path')
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const { emitWarning } = require('process');
const { application } = require('express');
var request = require('request');
let token = '';
let apikey = '';
let url = '';

app.use(cors())

app.use('/', express.static(__dirname + '/'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));

app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/index.html');
})

app.get('/server', function (req, res, next) {
    res.sendFile(__dirname + '/server.html');
})

app.post('/players', jsonParser, function (req, res, next) {
    console.log(req.body);
    if (req.body.token == token) {

        let options = {
            'method': 'GET',
            'url': url + '/players',
            'headers': {
                'API-Key': apikey
            },
            form: {

            }
        };

        request(options, function (error, response) {
            if (error) console.log(error);
            try{
                console.log(response.body);
                res.send(response.body);
            }catch(e){
                console.log(e);
            }

        });
    }else{
        res.send({ "status": "failed" });
    }
})

app.post('/loginServer', jsonParser, function (req, res, next) {
    console.log(req.body);
    if (req.body.token == token) {
        let options = {
            'method': 'POST',
            'url': url + '/login',
            'headers': {
              'API-Key': apikey,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "username": req.body.username,
            })
        };
        request(options, function (error, response) {
        if (error) throw new Error(error);
         try{
            console.log(response.body);
            res.send({ "status": "success", "data": response.body });
        }catch(e){
            console.log(e);
        }
        });
    }else{
        res.send({ "status": "failed" });
    }
})

app.post('/logoutServer', jsonParser, function (req, res, next) {
    console.log(req.body);
    if (req.body.token == token) {
        let options = {
            'method': 'POST',
            'url': url + '/logout',
            'headers': {
              'API-Key': apikey,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "username": req.body.username,
            })
        };
        request(options, function (error, response) {
        if (error) throw new Error(error);
         try{
            console.log(response.body);
            res.send({ "status": "success", "data": response.body });
        }catch(e){
            console.log(e);
        }
        });
    }else{
        res.send({ "status": "failed" });
    }
});

app.post('/login', jsonParser, function (req, res, next) {
    console.log(req.body);
    if ((req.body.username == "admin" && req.body.password == "admin")) {
        res.send({ "status": "success", "token": token });
    } else {
        res.send({ "status": "failed" });
    }
})

app.post('/authen', jsonParser, function (req, res, next) {
    if (req.body.token == token) {
        res.send({ "status": "success" });
    } else {
        res.send({ "status": "failed" });
    }
})

app.listen(port, function () {
    console.log(`web server listening on port ${port}`)
})
