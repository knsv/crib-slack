// We need this to build our post string
let Q = require('q');
let buss = undefined;
var cribLog = require('../../crib-log/src/api');
const log = cribLog.createLogger('crib-slack','debug');

exports.init = (_buss) => {
    log.info('Initializing buss');
    buss = _buss;
};

exports.postMessageToChannel = function(channel, msgText){
    buss.emit('POST_TO_SLACK_CHANNEL', [channel, msgText]);
};
