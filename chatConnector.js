/*
 * Using restify to set our bot to receive any http request.
 * This will allow us to use the chat emulator
 * */
var builder = require('botbuilder');
var restify = require('restify');

//Server create using restify
var server = restify.createServer();
server.listen(8888, function(){
	console.log("Running at 8888");
});

var connector = new builder.ChatConnector({
	appId: "",
	appPassword: ""
});

server.post('/geekend', connector.listen());

var bot = new builder.UniversalBot(connector);

bot.dialog('/',[
	function(session){
		session.send("Hola este es mi primer mensaje mandado desde un bot");
	}
]);


