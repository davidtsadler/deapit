var ebay = require('../lib/ebay');

var apiReqDefaults = {
		endpoint : 'http://open.api.sandbox.ebay.com/shopping?',

		headers : [
			'X-EBAY-API-APP-ID:<ENTER YOUR APP ID>',
			'X-EBAY-API-VERSION:791',
			'X-EBAY-API-SITE-ID:0',
			'X-EBAY-API-CALL-NAME:GeteBayTime',
			'X-EBAY-API-REQUEST-ENCODING:XML'
		].join('\r\n'),

		body : [
			'<?xml version="1.0" encoding="utf-8"?>',
			'<GeteBayTimeRequest xmlns="urn:ebay:apis:eBLBaseComponents">',
			'</GeteBayTimeRequest>',
		].join('\r\n')
	};

exports.index = function (req, res) {
	if (req.route.method === 'get') {
		res.render('index', { apiReq : apiReqDefaults, apiRes : null });
	}
	else {
		ebay.request(req.body.apiReq, function (error, apiRes) {
			if (!error) {
				res.render('index', { apiReq : req.body.apiReq, apiRes : apiRes });
			}
			else {
				res.render('index', { apiReq : req.body.apiReq, apiRes : { body : error.message } });
			}
		});
	}
};
