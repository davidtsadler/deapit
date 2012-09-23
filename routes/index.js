var requestDefaults = {
	endpoint : 'http://open.api.sandbox.ebay.com/shopping?',
	headers : 'X-EBAY-API-APP-ID:<ENTER YOUR APP ID>\r\nX-EBAY-API-VERSION:791\r\nX-EBAY-API-SITE-ID:0\r\nX-EBAY-API-CALL-NAME:GeteBayTime\r\nX-EBAY-API-REQUEST-ENCODING:XML',
	body : '<?xml version="1.0" encoding="utf-8"?>\r\n<GeteBayTimeRequest xmlns="urn:ebay:apis:eBLBaseComponents">\r\n</GeteBayTimeRequest>'
};

exports.index = function(req, res) {
	var request = req.route.method === 'get' ? requestDefaults : req.body.request;
	res.render('index', { request : request });
};
