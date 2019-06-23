const express = require("express");
const {
    Required,
    Not,
    Truthy,
    Blank,
    Equals,
    In,
    suValidate
} = require("../index");

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express();

var jsonParser = bodyParser.json()
app.use(cookieParser())

app.post(
    "/article/:id",
    jsonParser,
    suValidate({
        params: {
            id: [Required, Equals('123')]
        },
        query: {
        },
        body: {
            author:[Required,In(['Admin','Customer'])],
            immediately:[Truthy],
        },
        header: {
            'csrf-token':[Not(Blank)]
        },
        cookies:{
            visited:[Truthy]
        }
    }),
    function (req, res, next) {
        console.log(req.validateData);
        res.send('hello')
        next();
    }
);

app.listen(3000);
