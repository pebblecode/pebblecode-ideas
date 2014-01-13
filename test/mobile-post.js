var request = require('request');

var data = {
  "AccountSid": "ACd0495e56006c904bc1ace279a6d9df8c",
  "MessageSid": "SM31d23b5cc63b0fee6a18d2b7152fd418",
  "Body": "Cups of tea for everyone",
  "ToZip": "",
  "ToCity": "",
  "FromState": "",
  "ToState": "Aberfeldy",
  "SmsSid": "SM31d23b5cc63b0fee6a18d2b7152fd418",
  "To": "+441887451030",
  "ToCountry": "GB",
  "FromCountry": "GB",
  "SmsMessageSid": "SM31d23b5cc63b0fee6a18d2b7152fd418",
  "ApiVersion": "2010-04-01",
  "FromCity": "",
  "SmsStatus": "received",
  "NumMedia": "0",
  "From": "+447445289024",
  "FromZip": "" 
};

request({
  method: 'POST',
  url: 'http://localhost:8001/api/twilio',
  body: data,
  json: true
}, function(err, response, body) {
  console.log(body);
})