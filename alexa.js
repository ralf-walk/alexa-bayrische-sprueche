/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'de': {
        translation: {
            SKILL_NAME: 'Bayerischer Spruch',
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
    'Des is füa de Katz.'
];

const handlers = {
    'LaunchRequest': function () {
        this.emit('TellBavarian');
    },
    'TellBavarianIntent': function () {
        this.emit('TellBavarian');
    },
    'TellBavarian': function () {
        const index = Math.floor(Math.random() * bavarianSayings.length);
        const randomBavarianSaying = bavarianSayings[index];

        // Create speech output
        const speechOutput = randomBavarianSaying;
        const cardTitle = this.t('SKILL_NAME');
        const cardContent = randomBavarianSaying;
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent);
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
