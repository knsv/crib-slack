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



    if(message.text && message.text.match(/KNUT_LEAVES_HOME/)){
        bot.postMessageToChannel('general', 'leaves hooome ouou!', params);
        log.debug('KNUT_LEAVES_HOME');
        buss.emit('KNUT_LEAVES_HOME', [0]);
    }
    if(message.text && message.text.match(/KNUT_LEAVES_WORK/)){
        bot.postMessageToChannel('general', 'leaves work, ouahoo!', params);
        log.debug('KNUT_LEAVES_WORK');
        buss.emit('KNUT_LEAVES_WORK', [0]);
    }
    if(message.text && message.text.match(/KNUT_COMES_HOME/)){
        bot.postMessageToChannel('general', 'comes home, woff woff!', params);
        log.debug('KNUT_COMES_HOME');
        buss.emit('KNUT_COMES_HOME', [0]);
    }
    if(message.text && message.text.match(/KNUTS_DAILY_STEPS/)){
        bot.postMessageToChannel('general', 'Woff woff, husse duktig!', params);
        buss.emit('KNUT_COMES_HOME', [0]);
    }
    if(message.text && message.text.match(/BJARKE_ZONE/)){
        bot.postMessageToChannel('general', 'WHOAAA!!!! _B J A R K E_ is in DA House (or out)!!!!!', params);
        log.debug('BJARKE_ZONE');
        buss.emit('BJARKE_ZONE', [0]);
    }

    if(message.text && message.text.match(/MARIA_COMES_HOME/)){
        bot.postMessageToChannel('general', 'ជំរាបសួរមិត្តភក្តិ! Tjoho!! Mamma kommer hem!!!', params);
        log.debug('MARIA_COMES_HOME');
        buss.emit('MARIA_COMES_HOME', [0]);
    }

    if(message.text && message.text.match(/MARIA_LEAVES_WORK/)){
        bot.postMessageToChannel('general', 'ជំរាបសួរមិត្តភក្តិ! Mamma sticker från jobbet nu!', params);
        log.debug('MARIA_LEAVES_WORK');
        buss.emit('MARIA_LEAVES_WORK', [0]);
    }


    if(message.text && message.text.match(/MARIA_LEAVES_HOME/)){
        bot.postMessageToChannel('general', 'ជំរាបសួរមិត្តភក្តិ! Mamma sticker hemmifrån nu!', params);
        log.debug('MARIA_LEAVES_HOME');
        buss.emit('MARIA_LEAVES_HOME', [0]);
    }

    if(message.text && message.text.match(/MARIA_LEAVES_GYM/)){
        bot.postMessageToChannel('general', 'ជំរាបសួរមិត្តភក្តិ!_Sticker från gymmet nu!', params);
        log.debug('MARIA_LEAVES_GYM');
        buss.emit('MARIA_LEAVES_GYM', [0]);
    }
});

log.info('Slack service STARTED', process.cwd());