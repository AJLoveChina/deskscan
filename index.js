const screenshot = require('screenshot-desktop')
var Jimp = require("jimp");
var QrCode = require("qrcode-reader");

function scan(bitmap) {
    return new Promise(((resolve, reject) => {
        var qr = new QrCode();
        qr.callback = function (err, value) {
            if (err) {
                console.error(err);
                reject(err);
            }
            resolve(value.result);
            //console.log(value);
        };
        qr.decode(bitmap);
    }))
}

function decodeImage(img) {
    return new Promise(((resolve, reject) => {
        Jimp.read(img, function (err, image) {
            if (err) {
                console.error(err);
                reject(err);
            }
            resolve(image);
        });
    }))
}

function deskscan() {
    screenshot.all().then((imgs) => {
        imgs.forEach(async img => {
            let decodedImg = await decodeImage(img);
            try {
                let result = await scan(decodedImg.bitmap);
                console.log(result);
            } catch (e) {
            }
        })
    });
}

deskscan.getInfo = () => {
    return `
直接在命令行运行 deskscan 命令，deskscan会查找页面的二维码并将其解码显示出来，如果您有多个显示屏同样可用。
Github：https://github.com/AJLoveChina/deskscan`
}
module.exports = deskscan;