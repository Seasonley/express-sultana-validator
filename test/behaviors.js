var express = require("express");
var {
    Required,
    Not,
    Truthy,
    Blank,
    Equals,
    In,
    suValidate
} = require("../index");
var app = express();

app.post(
    "/article/:id",
    suValidate({
        get: {
            id: [Required, Equals('123')]
        },
        post: {
        },
        payload: {
            author:[Required,In(['Admin','Customer'])],
            immediately:[Truthy]
        },
        header: {
            'cookie':[Not(Blank)]
        }
    }),
    function (req, res, next) {
        console.log(req.validateData);
        res.send('')
        next();
    }
);

app.listen(3000);
