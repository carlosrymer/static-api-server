# Static API Server

A simple static API server for development purposes. It allows you to create your own mock responses and configure your own paths without a database or any setup. Just drop your files in, configure your routes, and start the server. Support for multiple languages included.

## Installation

Clone the project

```
git clone https://github.com/carlosrymer/static-api-server.git
```

Create a json directory at the root level of the project with sub-directories for languages. For example:

en
es
fr

At the very least, a directory for en must be created. Create additional directories for other languages.

## Usage

Create a local.json file under the config directory with an object containing a routes property whose value is an array of objects specifying routes. For exampel:

```javascript
{
	routes : [{
		"fileName" : "test.json",
		"method"   : "get",
		"path"     : "/test/:id"
	}]
}
```

Create your json files under the json directory that correspond to the routes in your local.json.

Start the server:

```
node src/index.js
```

or

```
npm start
```

Send requests with the Accept-Language header set to the desired language. By default, it will get files from the json/en directory.

## TODO

* Unit tests

## License

Released under the terms of the [MIT License](LICENSE).