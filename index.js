

// this l

// when load the library you receive 'SMARTAPI' default.

_saApiUrl = "www.smartapps.com.br";
_saSchema = "6478c499a047234defbd2dcdb489625d";
_saConnectKey = "Basic ODFiZDkzM2U0NzUzYTQ1MzI5YzJlM2QzMDJjYTMxNTU6V2pZSE9WWm5BRGtOYndsdA==";

require("./smartapi/main.js");

SMARTAPI.connect(init);

function init(request) {
	if (request.status == 1) {

		// get data
		SMARTAPI.getData('variaveis_valores/variavel/37',function(r2){
			console.log(r2);
		});

		// get schemas
		/*
		SMARTAPI.getSchemas(function(r){
			console.log(r);
		});

		// send data multiple
		SMARTAPI.sendExecData('variaveis_valores/insert', 'variavel[]=4&valor[]=20&variavel[]=4&valor[]=23&tmd=1', 'json', function(response){
			console.log(response);
		});*/

		// send data
		/*
		SMARTAPI.sendExecData('variaveis_valores/insert', 'variavel=4&valor=20', 'json', function(response){
			console.log(response);
		});*/

	}

}



