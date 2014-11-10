

// this l

// when load the library you receive 'SMARTAPI' default.

_saApiUrl = "10.211.55.3";
_saSchema = "a42a3a76e8cb0f228dbb098d6fcf90b0";
_saConnectKey = "Basic YTQyYTNhNzZlOGNiMGYyMjhkYmIwOThkNmZjZjkwYjA6Q21aVGFGZGxBRGtQWWdWZw==";

require("./smartapi/main.js");

SMARTAPI.connect(init);

function init(request) {
	if (request.status == 1) {

		// get schemas
		SMARTAPI.getSchemas(function(r){
			console.log(r);
		});

		// get schemas
		SMARTAPI.getData('variaveis_valores/_last/1',function(r2){
			console.log(r2);
		});

		// send data
		SMARTAPI.sendExecData('variaveis_valores/insert', 'variavel=4&valor=20', 'json', function(response){
			console.log(response);
		});

		// send data multiple
		SMARTAPI.sendExecData('variaveis_valores/insert', 'variavel[]=4&valor[]=20&variavel[]=4&valor[]=23&tmd=1', 'json', function(response){
			console.log(response);
		});

	}

}



