var builder = require('botbuilder');
var restify = require('restify');

var server = restify.createServer();
server.listen(8888, function(){
	console.log("running at 8888");
});

var connector = new builder.ChatConnector({
	appId: "",
	appPassword: ""
});

server.post('/geekend', connector.listen());

var bot = new builder.UniversalBot(connector);

/*bot.dialog('/', [
	function(session){
		session.send("Hola que tal, como estas?");
	},
	function(session){
		session.endDialog("Mucho gusto en conocerte");
	}
]);*/

bot.dialog('/', [
	function(session){
		//Builder prompts se usa para solicitar informacion al usuario de diferente tipo
		//en este caso solicitamos informacion de tipo text (String).
	//	builder.Prompts.text(session, "Hola, Como te llamas?");
		session.beginDialog('saludo');
	},
	function(session, results){
		//results.response es la variable que va guardar la respuesta con el tipo de dato que especifica
		//el prompt de arriba. en este caso string
		var nombre = results.response;
		session.endDialog("Gusto en conocerte " + nombre);
	}
]);

bot.dialog('saludo',[
	function(session){	
		builder.Prompts.text(session, "Hola, Como te llamas?");
	},
	function(session, results){
		session.endDialogWithResult(results);
	}
]);
