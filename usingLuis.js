var builder = require('botbuilder');
var restify = require('restify');
require('dotenv').config();

var server = restify.createServer();
server.listen(8888, function(){
	console.log("running at 8888");
});

var connector = new builder.ChatConnector({
	appId: "",
	appPassword: ""
});

server.post('/geekend', connector.listen());

var bot = new builder.UniversalBot(connector, function(session){
	session.endDialog("Disculpe, no lo puedo entender");
});

console.log(process.env.LUIS_ID);

var model = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/"+process.env.LUIS_ID +"?subscription-key="+ process.env.LUIS_KEY +"&verbose=true&timezoneOffset=0&q=";
var recognizer = new builder.LuisRecognizer(model);
bot.recognizer(recognizer);

bot.dialog('solicitarHelado', [
	function(session, results, next){
		var sabor = builder.EntityRecognizer.findEntity(results.intent.entities, 'sabor');
		if(sabor){
			session.endDialog("Gracias por comprar helado de " + sabor.entity);
		}else{
			builder.Prompts.choice(session, "Escoja un sabor", "Chocolate|Vainilla|Fresa", { listStyle : builder.ListStyle.button });
		}
	},
	function(session, results){
		var sabor = results.response.entity;
		session.endDialog("GRacias por comprar helado de " + sabor);
	}
]).triggerAction({
	matches : 'solicitarHelado'
});
