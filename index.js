var gutil = require('gulp-util');
var through = require('through2');
var jadeToJsx = require("jade-jsx");
var util = require("util");
var _ = require("lodash");

module.exports = function(options) {
    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }
        try {
            var content = jadeToJsx(file.contents.toString());
            file.contents = new Buffer(content);
            this.push(file);
            return cb();
        } catch (ex) {
            var info = util.format("|JADE_JSX_ERROR, [%s]|", file.path);
            var line = "+" + _.times(info.length - 1, _.noop).join("-") + "+";
            console.error(line);
            console.error(info);
            console.error(line);
            throw ex;
        }

    });
};
