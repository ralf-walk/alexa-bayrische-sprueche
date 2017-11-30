zip -r bayerischerSpruch.zip node_modules bayerischerSpruch.js
aws lambda update-function-code --function-name bayerischerSpruch --zip-file fileb://bayerischerSpruch.zip