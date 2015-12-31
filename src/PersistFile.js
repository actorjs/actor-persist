var fs = require("fs");
var readline = require('readline');
var os = require("os");

var PersistFile = function (file) {
    this.file = file;
};

PersistFile.prototype.read = function (id, callback) {

    var list = [];
    readline
        .createInterface({
            input: fs.createReadStream(this.file),
            output: process.stdout,
            terminal: false
        })
        .on('line', function (line) {
            var event = JSON.parse(line);
            console.log(event, id)
            if(event.id === id)
                list.push(event);
        })
        .on('close', function (line) {
            callback(list);
        });

};

PersistFile.prototype.write = function (event, callback) {
    var line = JSON.stringify(event) + os.EOL;
    fs.appendFile(this.file, line, function (err) {
        if (err) return callback(err);
        callback();
    });
};


module.exports = PersistFile;