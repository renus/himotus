var Motus = function(slackbot, fileObject) {

    this. word     = '',
    this.motusChan = 'D3G6VJLFP',
    this.filepath  = 'currentword.txt',

    this.receive  = function(text, channel) {

        if (channel == this.motusChan) {
            this.startGame(text);
        }

        if(text.startsWith("response")) {
            this.correction(text.replace("response","").trim());
        }
    },

    this.startGame = function(word) {
        this.word = word;
        fileObject.write(this.filepath, this.word);
        this.initgame();
    }

    this.initgame  = function() {
        var displayed = Math.floor(Math.random() * this.word.length);
        var response = "Nouveau Jeu \n";

        for (i = 0; i < this.word.length; i++) {
            if (i == displayed) {response += this.word[i] + " ";}
            else {response += "- ";}
        }

        slackbot.postMessageToGroup('motus', response, {});
    }

    this.correction = function(proposition) {

        this.word   = fileObject.read(this.filepath);
        var ret     = "";

        if (this.word.length != proposition.length) {
            slackbot.postMessageToGroup('motus', 'Bad response', {});
            return ;
        }

        for (i = 0; i < proposition.length; i++) {
            var letter = 'X';

            for (j = 0; j < proposition.length; j++) {
                if (this.word[j] == proposition[i]) {
                    letter = 'O';
                }
            }

            if (this.word[i] == proposition[i]) {
                letter = "V";
            }

            ret += letter;
        }

        slackbot.postMessageToGroup('motus', proposition + " \n" + ret, {});
        if (this.isGood(ret)) {
            slackbot.postMessageToGroup('motus', "MO-MO-MOTUS", {});
        }
    },

    this.isGood = function(response) {
        for (i = 0; i < response.length; i++) {
            if (response[i] !== 'V') {
                return false;
            }
        }
        return true;
    }
}

module.exports = Motus;