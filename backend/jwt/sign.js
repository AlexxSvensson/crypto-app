'use strict';

const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require("path");

async function sign(id, username, isAdmin) {
    const privateKEY = fs.readFileSync(path.resolve(__dirname, "./private.key"),"utf8");

    //`${id}` converts ObjectId to string
    const payload = {
        id: `${id}`,
        user: username,
        isAdmin: isAdmin
    };

    const i  = 'Mysoft corp';   
    const s  = 'some@user.com';   
    const a  = 'http://mysoftcorp.in';

    const signOptions = {
        issuer:  i,
        subject:  s,
        audience:  a,
        expiresIn:  "24h",
        algorithm:  "RS256" 
    };

    const token = await jwt.sign(payload, privateKEY, signOptions);
    return token;
}

module.exports = {sign: sign};
