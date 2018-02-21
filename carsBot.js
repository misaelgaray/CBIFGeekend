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

bot.dialog('/', [
	function(session){
		builder.Prompts.text(session, "Hola somos autos Ford Bienvenido<br/>. Con quién tengo el gusto el dia de hoy?");
	},
	function(session, results){
		var nombre = results.response;
		builder.Prompts.confirm(session, "Es un placer atenderlo " +nombre +"<br/>. Acepta los términos y condiciones de la tienda.");
	},
	function(session, results){
		var isAgree = results.response;
		if(isAgree){
			builder.Prompts.number(session, "Gracias por aceptar los términos.<br/>Cuál es su edad?");
		}else{
			session.endDialog("Lo sentimos tiene que aceptar los términos y condiciones. Vuelva pronto.");
		}
	},
	function(session, results){
		var edad = results.response;
		if(edad > 17){
			builder.Prompts.choice(session, "Elija el color de su automovil:", "Rojo|Verde|Naranja", { listStyle : builder.ListStyle.button });
		}else{
			session.endDialog("Lo sentimos tienes que ser mayor de edad");
		}
	},
	function(session, results){
		var color = results.response.entity;
		builder.Prompts.time(session, "Usted elijió el color" + color + ", Cuando y a que hora pasará por su auto?");
	},
	function(session, results){
		var fecha = builder.EntityRecognizer.resolveTime([ results.response ]);
		session.endDialog("Gracias por su compra. Su auto estará listo en la siguiente fecha " + fecha);
	}
]);
