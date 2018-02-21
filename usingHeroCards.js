var builder = require('botbuilder');
var restify = require('restify');

var server = restify.createServer();
server.listen(8888, function(){
	console.log("running");
});

var connector = new builder.ChatConnector({
	appId: "",
	appPassword: ""
});

server.post('/geekend', connector.listen());

var bot = new builder.UniversalBot(connector);

/*bot.dialog('/', [
	function(session){
		var heroCard = new builder.HeroCard(session)
		.title("Titulo del hero card")
		.subtitle("subtitulo del hero card")
		.text("Este el el cuerpo del mensaje del heroCard")
		.images([
			builder.CardImage.create(session, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRapZiRRWIvhV2r8BjFQeaLnwAdc2HTp6JTEbfT37zWOL5m9b-4VQ")
		])
		.buttons([
			builder.CardAction.openUrl(session, "https://www.google.com.mx")
		]);

		var msj = new builder.Message(session).addAttachment(heroCard);
		session.send(msj).endDialog();
	}
]);*/

bot.dialog('/',[
	function(session){
		var msj = new builder.Message(session);
		msj.attachmentLayout(builder.AttachmentLayout.carousel);
		msj.attachments([
			new builder.HeroCard(session)
			.title('Title 1')
			.subtitle('Subtitle 1')
			.images([
				builder.CardImage.create(session, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRapZiRRWIvhV2r8BjFQeaLnwAdc2HTp6JTEbfT37zWOL5m9b-4VQ")
			])
			.buttons([
				builder.CardAction.openUrl(session, "https://www.google.com.mx", "Ver más")
			]),
			new builder.HeroCard(session)
			.title('Title 2')
			.subtitle('Subtitle 2')
			.images([
				builder.CardImage.create(session, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRapZiRRWIvhV2r8BjFQeaLnwAdc2HTp6JTEbfT37zWOL5m9b-4VQ")
			])
			.buttons([
				builder.CardAction.openUrl(session, "https://www.google.com.mx", "Ver más")
			])
		]);
		session.send(msj).endDialog();
	}
]);
