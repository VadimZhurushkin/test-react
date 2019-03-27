const testFolder = './src/';
const sass = require('sass');
var path = require('path')
var fs = require('fs');

function recFindByExt(base, ext, files, result) {
    files = files || fs.readdirSync(base);
    result = result || [];

    files.forEach(
        function (file) {
            var newbase = path.join(base, file);
            if (fs.statSync(newbase).isDirectory()) {
                result = recFindByExt(newbase, ext, fs.readdirSync(newbase), result)
            } else {
                if (file.substr(-1 * (ext.length + 1)) == '.' + ext) {
                    result.push(newbase);
                    sass.render({
                            file: newbase
                        },
                        function (error, result) {
                            if (!error) {
                                // No errors during the compilation, write this result on the disk
                                let file = newbase.replace('.' + ext, '.css');
                                fs.writeFile(file, result.css, function (err) {
                                    if (!err) {
                                        console.log(file);
                                    }
                                });
                            }
                        })


                }
            }
        }
    )
    return result
}

let files = recFindByExt(testFolder, 'scss');

console.dir(files);
