/**
 * Created by steffi on 05.11.15.
 */

// sender example

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

// publisher
var pub = nano.socket('pub');

// address to socket of type tcp or ipc
var addr = 'ipc:///tmp/foo.ipc';
pub.bind(addr);

setTimeout(function () {
    pub.send("Hello from nanomsg!");
}, 100);

setTimeout(function() {
    pub.close();
}, 1000);

pub.on('send', function (buf) {
    logger.log('info', 'Hallo ' + String(buf));
    console.log('Hallo ' + String(buf));
    //pub.close();
});