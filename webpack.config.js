let path = require('path');
module.exports = {
    entry: './app/src/main-web.js',
    output: {
        filename: 'main-web-build.js',
        path: path.resolve(__dirname, './app/src/')
    }
}
