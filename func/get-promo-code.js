let axios = require('axios')

const CODES = [
    {
        title: '10% off all websites',
        code: '10WEB4U'
    }
]

exports.handler = async (event, content, cb) => {

    let data = JSON.parse(event.body)
    try {
        let promo = CODES.find(code => code.code === data.code)
        cb(null, {
            statusCode: 200,
            body: promo
        })
    } catch(err){
        cb("can't find the code", {
            statusCode: 500
        })
    }

}