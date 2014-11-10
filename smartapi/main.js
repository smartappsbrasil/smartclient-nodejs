/**
 * SMART API Library
 *
 * Dependencies:
 *
 * - fs
 * - http
 *
 */

// load libraries
var http = require('http');
var fs = require('fs');

// set vars
var wNode = "from";
var wApiUrl = (_saApiUrl == undefined) ? "10.211.55.3" : _saApiUrl;
var wPathUrl = "/api/fp/";
var wApp = "controls";
var wSchema = (_saSchema == undefined) ? "a42a3a76e8cb0f228dbb098d6fcf90b0" : _saSchema;
var wApiConnectKey = (_saConnectKey == undefined) ? "Basic YTQyYTNhNzZlOGNiMGYyMjhkYmIwOThkNmZjZjkwYjA6Q21aVGFGZGxBRGtQWWdWZw==" : _saConnectKey;
var str="";

SMARTAPI = {

	/**
	 * Check if are connected on the API
	 * @return {[type]} [description]
	 */
	_isConnected: function() {

		var r = fs.readFileSync("/tmp/.smart.auth.cookie", "utf8");
		return r;

	},

	/**
	 * Method to read a cookie file
	 * @return {[type]} [description]
	 */
	_readCookie: function() {
		return this._isConnected();
	},

	/**
	 * Make a GET request
	 * @return {[type]} [description]
	 */
	_call: function(strData, node, callback) {

		objCookie = this._readCookie();
		objThis = this;
		str="";

		xNode = (!node) ? wNode : node;

		if (objCookie) {

			wAction = (strData == "_schemas") ? strData : wSchema + "/" + strData

			options = {
				host : wApiUrl,
				path : wPathUrl + xNode + "/" + wApp + "/" + wAction,
				headers: {
					"Authorization" : wApiConnectKey,
					"Cookie": objCookie
				}
			}

			http.get(options, function(res){

				res.on('data', function (chunk) {
					str += chunk;
				});

				res.on('end', function () {

		            var parsed = objThis._return(str);
		            str="";
		            callback(parsed);

		        });

			}).end();

			return false;

		}

	},

	/**
	 * Make a POST request
	 * @return {[type]} [description]
	 */
	_callPost: function(str, params, defreturn, callback) {

		objCookie = this._readCookie();
		xNode = (!defreturn) ? wNode : defreturn;
		strData="";
		objThis = this;

		if (objCookie) {

			options = {
				host : wApiUrl,
				path : wPathUrl + xNode + "/" + wApp + "/" + wSchema + "/" + str,
				method : "POST",
				headers: {
					"Authorization" : wApiConnectKey,
					"Cookie": objCookie,
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}

			var post_req = http.request(options, function(res){

				res.on('data', function (chunk) {
					strData += chunk;
				});

				res.on('end', function () {
					var parsed = objThis._return(strData);
					strData="";
		            callback(parsed);
		        });

			});

			post_req.write(params);
			post_req.end();

			return post_req;

		}

	},

	_isJsonString: function(str) {
	    try {
	        JSON.parse(str);
	    } catch (e) {
	        return false;
	    }
	    return true;
	},

	/**
	 * Process return data
	 * @param  {[type]} r [description]
	 * @return {[type]}   [description]
	 */
	_return: function(r) {
		if (this._isJsonString(r)) {
			objReturn = JSON.parse(r);
		} else {
			objReturn = r;
		}

		return objReturn;
	},

	/**
	 * Method to connect on S.M.A.R.T platform
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	connect: function(callback) {

		options = {
			host : wApiUrl,
			path : wPathUrl + wNode,
			headers: {
				"Authorization" : wApiConnectKey
			}
		}

		http.get(options, function(res){

			res.on('data', function (chunk) {
				str += chunk;
			});

			res.on('end', function () {

	        	// Data reception is done, do whatever with it!
	            var parsed = JSON.parse(str);

	            fs.writeFile("/tmp/.smart.auth.cookie", parsed.data.name + "=" + parsed.data.id, function(err) {
	            	if (err) {
	            		console.log("Não foi possível salvar os dados para autenticação.");
	            	} else {
	            		callback({status:1});
	            	}
	            });

	        });

		});

		return false;

	},

	/**
	 * Method to cancel all conections with S.M.A.R.T
	 * @return {[type]} [description]
	 */
	disconnect: function() {
		console.log("leaving...");
		return false;
	},

	/**
	 * Method to get data from a data source.
	 * @param  {[type]}   strCall  [description]
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	getData: function(strCall, callback) {
		if (this._isConnected().match(/\S/)) {
			return this._call(strCall, false, callback);
		} else {
			console.log("ERROR: To send data you need connect on SMART API.");
		}
	},

	/**
	 * Method to get all schemas.
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	getSchemas: function(callback) {

		if (this._isConnected().match(/\S/)) {
			return this._call('_schemas', false, callback);
		} else {
			console.log("ERROR: To send data you need connect on SMART API.");
		}

	},

	/**
	 * Method to send data using exec process.
	 * @param  {[type]}   str        [description]
	 * @param  {[type]}   params     [description]
	 * @param  {[type]}   typeReturn [description]
	 * @param  {Function} callback   [description]
	 * @return {[type]}              [description]
	 */
	sendExecData: function(str, params, typeReturn, callback) {

		if (typeReturn == undefined) {
			return false;
		}

		defnode = "exec/" + typeReturn;

		if (this._isConnected().match(/\S/)) {
			return this._callPost(str, params, defnode, callback);
		} else {
			console.log("ERROR: To send data you need connect on SMART API.");
		}

	}

};
