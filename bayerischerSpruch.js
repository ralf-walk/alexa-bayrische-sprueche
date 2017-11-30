/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'de': {
        translation: {
            SKILL_NAME: 'Bayerischer Spruch',
            NO_SPRUCH_FOUND: (number) => `Konnte leider keinen Spruch mit der Nummer ${number} finden. Aktuell kenne ich ${bavarianSayings.length} Sprüche`,
            HELP_MESSAGE: 'Du kannst sagen, „rede bayrisch“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!',
        },
    },
};

const bavarianSayings = [
    'Bessa zwoa Ring unta de Augn ois oa Ring am Finga.',
    'Da Mensch is wiar a oide Hosn, auf de Gnia wead a zeaschd hie.',
    'De guadn Gedankn und de hingadn Rooß kemma ollawei hintnach.',
    'Des is füa de Katz.',
    'Wer ko, der ko',
    'Nix Gwiss woass ma ned',
    'De Woch fangt scho guat o',
    'Do legst di nieda!',
    'I zoag da glei, wo da Bartl an Most hoid',
    'Des is ghupft wia gsprunga!',
    'Kloaviech mocht aa Mist',
    'Do schaugst oba oid aus',
    'Ma sogt jo nix, ma redt jo bloß',
    'Bled fickt guad',
    'Wos schaugst so bläd?',
    'Wos wuistn Du eigendle'
];

const handlers = {
    'LaunchRequest': function () {
        this.emit('BayerischerSpruchIntent');
    },
    'BayerischerSpruchIntent': function () {

        const intent = this.event.request.intent;
        const spruchnummer = (intent && intent.slots && intent.slots.spruchnummer) ? parseInt(intent.slots.spruchnummer.value): undefined;

        const doSpeak = (speak) => {
            const skillName = this.t('SKILL_NAME');
            this.emit(':tellWithCard', speak, skillName, speak);
        }

        const anzSprueche = bavarianSayings.length;
        if (spruchnummer && spruchnummer >= 1 && spruchnummer <= anzSprueche) {
            doSpeak(bavarianSayings[spruchnummer - 1]);
        } else if (spruchnummer || spruchnummer === 0) {
            doSpeak(this.t('NO_SPRUCH_FOUND')(spruchnummer))
        } else {
            const spruchnummer = Math.floor(Math.random() * anzSprueche);
            doSpeak(bavarianSayings[spruchnummer]);
        }
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
