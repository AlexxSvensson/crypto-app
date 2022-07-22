'use strict';
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require("path");


async function verify(token) {
    const publicKEY = fs.readFileSync(path.resolve(__dirname, "./private.key"),"utf8");

    const i  = 'Mysoft corp';   
    const s  = 'some@user.com';   
    const a  = 'http://mysoftcorp.in';

    const verifyOptions = {
        issuer:  i,
        subject:  s,
        audience:  a,
        // expiresIn:  "2h",
        algorithms:  ["RS256"]
    };
    const legit = await jwt.verify(token, publicKEY, verifyOptions);
    return legit;
}

module.exports = {verify: verify};
