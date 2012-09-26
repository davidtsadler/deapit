var url = require('url'),
	http = require('http'),
	https = require('https');

function build_headers(string) {
	var headers = {}; 

	string.split('\r\n').forEach(function (line) {
		var pair;

		line = line.trim();
		if (line !== '') {
			pair = line.split(':');
			if (pair.length === 2) {
				headers[pair[0].trim()] = pair[1].trim();
			}	
		}
	});

	return headers;
}

exports.request = function (apiReq, callback) {
	var parsedEndpoint = url.parse(apiReq.endpoint),
		options = {
			hostname : parsedEndpoint.hostname,
			path : parsedEndpoint.path,
			method: 'POST',
			headers : build_headers(apiReq.headers)  
		},
		req,
		data = '';

	req = (parsedEndpoint.protocol === 'http:' ? http : https).request(options);
	req.on('response', function(res) {
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			data += chunk;	
		});
		res.on('end', function () {
			callback(null, { body : data });
		});
	});
	req.on('error', function(error) {
		callback(error);
	});
	req.write(apiReq.body);
	req.end();
};
