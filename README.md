Mit diesem Alexa Skill kann Alexa bayerische Sprüche erzählen.

S. https://www.amazon.de/gp/product/B077V4BV25?ie=UTF8&ref-suffix=ss_rw

### Beispiele
* Alexa, öffne bayerischen Spruch
* Alexa, öffne bayerischen Spruch Nummer drei
* Alexa, starte bayerischen Spruch zwei

### Intent Schema
```javascript
{
  "intents": [
    {
      "slots": [
        {
          "name": "spruchnummer",
          "type": "AMAZON.NUMBER"
        }
      ],
      "intent": "BayerischerSpruchIntent"
    },
    {
      "intent": "AMAZON.HelpIntent"
    },
    {
      "intent": "AMAZON.StopIntent"
    },
    {
      "intent": "AMAZON.CancelIntent"
    }
  ]
}
```

### Utterances
```
BayerischerSpruchIntent Erzähle Bayerischen Spruch Nummer {spruchnummer}
BayerischerSpruchIntent Spruch Nummer {spruchnummer}
BayerischerSpruchIntent Nummer {spruchnummer}
BayerischerSpruchIntent {spruchnummer}
```
