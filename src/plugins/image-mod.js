import gm from "gm";
const im = gm.subClass({ imageMagick: true });

export default {
    resize (data) {

        let size = data.size,
            path = data.path + '/' || '',
            img = data.img,
            location = path + img
        var buf = fs.readFileSync(location);
        let datas = im(buf, 'ig.webp')
            .resize(240, 240)
            .noProfile()
            .write('/path/to/resize.webp', function (err) {
                if (!err) console.log('done');
            });

        console.log(datas)
    }
}

