#! /usr/bin/env node
let deskscan = require('../index.js');
let arguments = process.argv.splice(2);

let name = arguments[0];
if (/\-info$/.test(name) || /\-h/.test(name)) {
    return console.log(deskscan.getInfo());
}

deskscan();