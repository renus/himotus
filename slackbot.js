var   SlackBot = require('slackbots')
    , fs       = require('fs')
    , File     = require("./model/file.js")
    , Motus    = require("./model/motus.js");

var bot = new SlackBot({
    token: 'xoxb-xxxxxxxxx',
    name: 'himotus'
});

var motus = new Motus(bot, new File(fs));
bot.on('message', function(data) {
    if (data.type == 'message') {
        motus.receive(data.text, data.channel);
    }
});