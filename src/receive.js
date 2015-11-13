/**
 * Created by steffi on 05.11.15.
 */

// receiver example

var nano = require('nanomsg');
var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: 'info-file',
            filename: '/tmp/infofile.log',
            level: 'info'
        })
    ]
});

var errorLogger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: 'errorlog-file',
            filename: '/tmp/error.log',
            level: 'error'
        })
    ]
});

var addr = 'ipc:///tmp/foo.ipc';

var sub = nano.socket('sub');

sub.connect(addr);

sub.on('data', function (buf) {
    logger.log('info', String(buf));
    console.log(String(buf));
    sub.close();
});