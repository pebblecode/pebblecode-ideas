//require the Twilio module and create a REST client
var client = require('twilio')('ACd0495e56006c904bc1ace279a6d9df8c', 'e79edb15de0e7781589bbbea688a14b7');
var list = require(__dirname + '/../name_and_numbers.json');

console.log(list);

var timer = setInterval(function() {
    var item = list.shift();
    if (!item) {
        clearInterval(timer);
        return;
    }

    var name = '' + item.name !== 'Anonymous' ? item.name : 'there';
    var message = 'Hi ' + name + '. Thank you for submitting your idea to the AstraZenica ideas board.  The winning idea of the day was <insert idea here>';

    client.sendMessage({
        to: item.number,
        from: '+441887451030',
        body: message
    }, function(err, responseData) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(responseData);
    });

}, 5000);

/*
//Send an SMS text message
client.sendMessage({

    to:'+16515556677', // Any number Twilio can deliver to
    from: '+14506667788', // A number you bought from Twilio and can use for outbound communication
    body: 'word to your mother.' // body of the SMS message

}, function(err, responseData) { //this function is executed when a response is received from Twilio

    if (!err) { // "err" is an error received during the request, if any

        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

        console.log(responseData.from); // outputs "+14506667788"
        console.log(responseData.body); // outputs "word to your mother."

    }
});
*/