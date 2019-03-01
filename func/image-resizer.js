// const im = require('imagemagick');
// let axios = require('axios');
//
// exports.handler = async (event, content, cb) => {
//
//     let body = JSON.parse(event.body)
//     // console.log(body)
//     let ext = body.ext.substr(1, body.ext.length)
//     // console.log(body)
//     const operation = event.queryStringParameters ? event.queryStringParameters.operation : null;
//     let data = JSON.parse(event.body);
//             im.resize({
//                 srcPath: body.img,
//                 width: body.w
//
//             })
//     // return await operate(data);
//     // switch (operation) {
//     //     case 'ping':
//     //         return sendRes(200, 'pong');
//     //     case 'convert':
//     //         return await operate(data);
//     //     default:
//     //         return sendRes(401, `Unrecognized operation "${operation}"`);
//     //
//     // }
// }
//     // axios.get(body.img)
//     //     .then(function (response) {
//     //         im.resize({
//     //             srcPath: body.img,
//     //             width: body.w,
//     //
//     //         })
//              // console.log(response.data);
//             // const pipeline = sharp()
//             //     .rotate()
//             //     .resize(300,300)
//             //     .jpeg({
//             //         quality: 10,
//             //     })
//             //     .toBuffer()
//             //     .then( data => {
//             //         // console.log(data)
//             //         cb({
//             //             statusCode: 200,
//             //             body: {
//             //                 img: data,
//             //                 message: "Hello, World"
//             //             }
//             //         })
//             //     })
//             //     .catch( err => {
//             //         console.log(err)
//             //         cb(err)
//             //     });
//             //
//             // request(body.img).pipe(pipeline)
//
//             // let img = sharp({ url: body.img, encoding: null })
//             //     img
//             //     .resize(body.w)
//             //     // .toFormat(ext)
//             //
//             //     .jpeg({
//             //         quality: 10,
//             //     })
//             //     .toBuffer()
//             //
//             //     .then( data => {
//             //         // console.log(data)
//             //         cb({
//             //             statusCode: 200,
//             //             body: {
//             //                 img: data,
//             //                 message: "Hello, World"
//             //             }
//             //         })
//             //     })
//             //     .catch( err => {
//             //          console.log(err)
//             //         cb(err)
//             //     } );
//         // })
// //         .catch(function (error) {
// //              console.log(error);
// //             cb(error)
// // });
//
//
//
// const sendRes = (status, body) => {
//     var response = {
//         statusCode: status,
//         headers: {
//             "Content-Type": "text/html"
//         },
//         body: body
//     };
//     return response;
// }
//
// const operate = async (body) => {
//     const customArgs = body.customArgs.split(',') || [];
//     let outputExtension = 'png';
//     let inputFile = null, outputFile = null;
//
//     try {
//         if (body.base64Image) {
//             inputFile = '/tmp/inputFile.png';
//             const buffer = new Buffer(body.base64Image, 'base64');
//             fs.writeFileSync(inputFile, buffer);
//             customArgs.unshift(inputFile); // customArgs should be like [inputFile, options, outputfile]
//         }
//
//         outputFile = `/tmp/outputFile.${outputExtension}`;
//         customArgs.push(outputFile);
//
//         await performConvert(customArgs);
//         let fileBuffer = new Buffer(fs.readFileSync(outputFile));
//         fs.unlinkSync(outputFile);
//         return sendRes(200, '<img src="data:image/png;base64,' + fileBuffer.toString('base64') + '"//>');
//
//     } catch (e) {
//         console.log(`Error:${e}`);
//         return sendRes(500, e);
//     }
// }
//
// const performConvert = (params) => {
//     return new Promise(function (res, rej) {
//         im.convert(params, (err) => {
//             if (err) {
//                 console.log(`Error${err}`);
//                 rej(err);
//             } else {
//                 res('operation completed successfully');
//             }
//         });
//     });
// }