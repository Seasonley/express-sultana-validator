var express = require("express");
const request = require('supertest');
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


request(app)
  .post('/article/123')
  .set('Cookie', ['nameOne=valueOne;nameTwo=valueTwo'])
  .send('author=Admin')
  .field('name', 'my awesome avatar')
  .attach('avatar', 'test/fixtures/avatar.jpg')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });
