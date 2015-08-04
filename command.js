
var fs = require("fs");
var request = require("request");


var commands = {

	date: function(callback){
		callback(new Date());
	},


	pwd: function(callback){
		callback(process.cwd());
	},

	ls: function(callback){
		fs.readdir('.', function(err, files) {
			if (err) throw err;
			var output = "";
			files.forEach(function(file) {
				output += file.toString() + "\n";
			});
			callback(output.trim());
		});
	},

	echo: function(callback, file){
		callback(file);
	},

	cat: function(callback, file){
		//sync solution: var fileContent = fs.readFileSync(file, "utf8");
		fs.readFile(file, "utf8", function(err, data){
			callback(data);
		});
	},

	head: function(callback, file){
		fs.readFile(file, "utf8", function(err, data){
			callback(data.split("\n").slice(0, 5).join("\n"));
		});
	},

	tail: function(callback, file){
		fs.readFile(file, "utf8", function(err, data){
			callback(data.split("\n").slice(-5).join("\n"));
		});
	},

	sort: function(callback, file){
		fs.readFile(file, "utf8", function(err, data){
			callback(data.split("\n").sort().join("\n"));
		});
	},

	wc: function(callback, file){
		fs.readFile(file, "utf8", function(err, data){
			callback(data.split("\n").length);
		});
	},

	uniq: function(callback, file){
		fs.readFile(file, "utf8", function(err, data){
			callback(data.split("\n").filter(function(line, index, self){
				return self.indexOf(line) === index;
			}).join("\n"));
		});
	},

	curl: function(callback, url){
		request(url, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				callback(body);
			}else {
				callback("Returned status code: " + response.statusCode);
			}
		});
	}

};




module.exports = commands;

