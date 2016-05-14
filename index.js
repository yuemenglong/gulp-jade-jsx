var gutil = require('gulp-util');
var through = require('through2');
var jadeToJsx = require("jade-jsx");

module.exports = function(fn) {
    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }
        var content = jadeToJsx(file.contents.toString(), fn);
        file.contents = new Buffer(content);
        this.push(file);
        return cb();
    });
};
