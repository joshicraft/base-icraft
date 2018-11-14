// let sharp = require('sharp')
var fs = require('fs')
    , gm = require('gm').subClass({imageMagick: true})

exports.handler = function (event, content, cb) {
    let body = event.body,
        size = body.size,
        path = body.path + '/' || '',
        img = body.img,
        location = path + img

    const output = sharp(location)
        .resize(size.width)
        .webp({ lossless: true })
        .toBuffer()
        .then((data) => {
            console.log('sss' + data)
            cb(null, {
                statusCode: 200,
                body: "resizes"
            })
        })
}
