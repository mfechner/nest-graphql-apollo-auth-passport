const keypair = require("keypair");
const fs = require("fs");

const keySize = 512;
const keyDirectory = 'keys';

const pair = keypair({
  bits: keySize
});
console.log(pair);

if(!fs.existsSync(keyDirectory)) {
    fs.mkdirSync(keyDirectory);
}
// @TODO do not overwrite keys, find a way to rotate them
fs.writeFileSync('keys/private.pem', pair.private);
fs.writeFileSync('keys/public.pem', pair.public);
