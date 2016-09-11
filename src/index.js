/**
 * Created by knut on 2016-04-17.
 */
var cribMq = require('../../crib-mq');
var cribLog = require('../../crib-log/src/api');
var log = cribLog.createLogger('crib-slack','debug');

log.info('Starting Slack service using this buss: ', process.env.CRIB_BUSS_URL);
var buss = cribMq.register('crib-slack');
log.debug('Starting Slack service at this path: ', process.cwd());
var db = {};

var SlackBot = require('slackbots');

// create a bot
var bot = new SlackBot({
    token: process.env.CRIB_SLACK_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token
    name: 'Crib'
});

bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
        icon_emoji: ':alien:'
    };

    // bot.postMessageToChannel('general', 'ជំរាបសួរមិត្តភក្តិ, I am am ready to serve!', params);

    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    //bot.postMessageToChannel('general', 'Grrrr!', params);

    // // define existing username instead of 'user_name'
    // bot.postMessageToUser('user_name', 'meow!', params);
    //
    // // If you add a 'slackbot' property,
    // // you will post to another user's slackbot channel instead of a direct message
    // bot.postMessageToUser('user_name', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' });
    //
    // // define private group instead of 'private_group', where bot exist
    // bot.postMessageToGroup('private_group', 'meow!', params);
});

bot.on('message', function(msg) {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
        icon_emoji: ':alien:'
    };



    if(msg.type !== 'message'){
        return;
    }

    log.debug(msg);

    let message;
    if(msg.attachments && msg.username === 'IFTTT'){
        message = msg.attachments[0];
    }else{
        message = msg;
    }


    buss.emit('SLACK_MESSAGE',[message]);
});

log.info('Slack service STARTED', process.cwd());