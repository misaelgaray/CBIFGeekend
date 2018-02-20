var builder = require('botbuilder');

//Consolole connector is used to interact with the bot using the terminal
//We set the bot to listen inmediantly
var connector = new builder.ConsoleConnector().listen();

var bot = new builder.UniversalBot(connector);

bot.dialog('/', [
	//Session administra la informacion de una conversacion con el usuario.
	//Administra envio de informacion, inicio y fin de un diálogo y control de flujo entre dialogs
	function(session){
		session.send("Hola este es mi primer mensaje mandado desde un bot");
	}
]);
