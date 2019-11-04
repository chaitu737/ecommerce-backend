const jwt = require('jsonwebtoken');
const shortId= require('shortid');
const crypto = require('crypto').randomBytes(256).toString('hex'); // Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)

const secret = crypto;

let generateToken = (data, cb)=>{
    try{
        let claims = {
            jwtid : shortId.generate(),
            iat:Date.now(),
            exp:Math.floor(Date.now()/1000)+(60*60*24),
            sub:'authToken',
            iss:'santhu',
            data:data
        }
        let tokenDetails = {
            token:jwt.sign(claims, secret),
            tokenSecret:secret
        }
        cb(null,tokenDetails)
    }
    catch(err){
     console.log(err)
     cb(err,null)
    }
}

let verifyClaim = (token,cb)=>{
    jwt.verify(token,secret, function(err, decoded){
        if(err){
            console.log('Error while verifying token');
            console.log(err);
            cb(err, null);
        }else{
            console.log('userverified');
            console.log(decoded);
            cb(null, decoded);
        }
    });


}
module.exports = {
    generateToken:generateToken,
    verifyClaim:verifyClaim
}