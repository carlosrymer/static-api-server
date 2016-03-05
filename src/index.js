var app            = require('express')(),
		config         = require('config'),
		expressWinston = require('express-winston'),
		fs             = require('fs'),
		path           = require('path'),
		winston        = require('winston'),
		options        = {
			encoding : 'utf8'
		};

function sendFile(fileName, statusCode) {
	return function(req, res) {
		var response,
				statusCode = statusCode || 200;

		if (!fileName) {
			res
				.status(404)
				.send({
					message : 'File not found.'
				});

			return;
		}

		try {
			response = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'json/', fileName), options));
		} catch (e) {
			console.error(e);
			res
				.status(500)
				.send({
					message : 'Supplied file not valid json.'
				});

			return;
		}

		res
			.status(statusCode)
			.send(response);
	}
}

app.use(expressWinston.logger({
  transports    : [
    new winston.transports.Console({
      json     : false,
      colorize : true
    })
  ],
  expressFormat : true,
  colorStatus   : true
}));

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "origin, x-requested-with, content-type, accept, authorization");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, PUT, OPTIONS, DELETE");
  next();
});

config.routes.forEach(function(route) {
	var method = route.method || 'get';

	if (route.path && route.fileName) {
		app[method](route.path, sendFile(route.fileName, route.statusCode));
	}
});

app.listen(config.port, function() {
	console.log('Mock api server listening on %d. To exit, press CTRL + C.', config.port);
});