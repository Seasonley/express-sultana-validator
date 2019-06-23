const { 
    In,
    Not,
    Range,
    GreaterThan,
    LessThan,
    Equals,
    Blank,
    Truthy,
    Required,
    InstanceOf,
    SubclassOf,
    Then,
    If,
    Length,
    Contains,
    Each,
    Pattern,
    validate} = require('sultana-validator')

function suValidate(options, fn) {
    return async function vail(req, res, next) {

        var res = {isValid:true,origin:{}},key,flag;
        if (options.params) {
            res.origin.params=req.params
        }
        if (options.query) { 
            res.origin.query=req.query
        }
        if (options.body) {
            res.origin.body=req.body
        }
        if (options.header) {
            for(key in options.header){
                res.origin.header[key]=req.header(key)
            }
        }
        if(options.cookies){
            res.origin.cookie=req.cookies
        }

        for ( key in ['params','query','body','header']) {
            [ flag,res[key] ]= validate(options[key], res.origin[key]); 
            if(!flag){
                res.isValid=flag
                res[key] = res[key][1];
            }else{
                delete res[key]
            }
        }

        if (fn) fn(req, res, next, res);
        else {
            req.validateData = res;
            next();
        }
    };
}
module.exports = {
    In,
    Not,
    Range,
    GreaterThan,
    LessThan,
    Equals,
    Blank,
    Truthy,
    Required,
    InstanceOf,
    SubclassOf,
    Then,
    If,
    Length,
    Contains,
    Each,
    Pattern,
    suValidate
}