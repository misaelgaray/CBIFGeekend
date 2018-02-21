var builder = require('botbuilder');
var restify = require('restify');

var server = restify.createServer();
server.listen(8888, function(){
	console.log("Running at 8888");
});

var connector = new builder.ChatConnector({
	appId : "",
	appPassword : ""
});

server.post('/geekend', connector.listen());

var bot = new builder.UniversalBot(connector);

var opcionesBot = [
	{
		nombre : "Contacto",
		dialogo : "contact"
	},
	{
		nombre : "Experiencia & Trabajo",
		dialogo : "experience"
	},
	{
		nombre : "Proyectos",
		dialogo : "portfolio"
	},
	{
		nombre : "Habilidades",
		dialogo : "skills"
	}
];

bot.dialog('/', [
	function(session){
		session.send("Hola soy Pepe el asistente de Misael. Te puedo brindar información profesional de el.");
		session.beginDialog('help');
	}
]);

bot.dialog('help',[
	function(session){
		var nombreOpciones = opcionesBot.map(function(opcion){ return opcion.nombre });
		builder.Prompts.choice(session, "Que deseas saber acerca de Misael ", nombreOpciones, { listStyle : builder.ListStyle.button });
	},
	function(session, results){
		var selectedDialog = opcionesBot[results.response.index].dialogo;
		session.beginDialog(selectedDialog);
	}
]);

bot.dialog('continue', [
	function(session){
		builder.Prompts.confirm(session, "Te puedo ayudar en otra cosa?");
	},
	function(session, results){
		var willContinue = results.response;
		if(willContinue){
			session.beginDialog('help');
		}else{
			session.endDialog("Entendido, Que tenga buen dia, Estoy a sus órdenes.");
		}
	}
]);

bot.dialog('contact', [
	function(session){
		session.endDialog("Puedes contactar a Misael por los siguiente medios:<br>Cel. 442xxxxxx<br>Correo. misael.xxx@xxx.xxx<br>Tel. 2xxxx89");
		session.beginDialog('continue');
	}
]);

bot.dialog('experience',[
	function(session){
		var jobs = [
			{
				company : "Millenniapp",
				work : "iOS Programmer",
				achives : "As iOS Programmer I worked in the development of application features and even complete apps from scratch"
			},
			{
				company : "UAQ",
				work : "Programmer",
				achives : "As Programmer I worked in the development of application features"
			}
		];
		var msj = "Misael ha trabajado en los siguientes lugares:";
		jobs.forEach(function(job){
			msj += "<br>Empresa : " + job.company + "<br>Título de trabajo : " + job.work + "<br>Logros : " + job.achives + "<br/><br/>"	
		});
		session.send(msj);
		session.beginDialog('continue');
	}
]);

bot.dialog('portfolio', [
	function(session){
		var projects = [
			{
				name : "iOS CRM Application",
				plattform : "iOS",
				description : "It is a CRM application to manage fancy information",
				image : "https://media.sproutsocial.com/uploads/2016/08/Facebook-Messenger-Bot-01.png"
			},
			{
				name : "Building design application",
				plattform : "Windows",
				description : "A desktop application to design buildings",
				image : "https://media.sproutsocial.com/uploads/2016/08/Facebook-Messenger-Bot-01.png"
			}
		];

		var cards = [];
		projects.forEach(function(project){
			cards.push(new builder.HeroCard(session)
			.title(project.name)
			.subtitle(project.plattform)
			.text(project.achive)
			.images([
				builder.CardImage.create(session, project.image)
			])
			.buttons([
				builder.CardAction.openUrl(session, "https://www.google.com.mx", "Ver más")
			]));
		});

		var msj = new  builder.Message(session);
		msj.attachmentLayout(builder.AttachmentLayout.carousel);
		msj.attachments(cards);
		session.send(msj);
		session.beginDialog('continue');
	}
]);

bot.dialog('skills', [
	function(session){
		var skills = ["Metodologías ágiles", "Trabajo en equipo", "Adaptabilidad a nuevos lenguajes", "Entrón"];
		var msj = "Habilidades profecionales : ";
		skills.forEach(function(skill){
			msj += "<br/>·" + skill;
		});
		session.send(msj);
		session.beginDialog('continue');
	}
]);






