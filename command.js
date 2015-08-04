
var fs = require("fs");
var request = require("request");


var commands = {

	date: function(stdin, callback){
		callback(new Date());
	},


	pwd: function(stdin, callback){
		callback(process.cwd());
	},

	ls: function(stdin, callback){
		fs.readdir('.', function(err, files) {
			if (err) throw err;
			var output = "";
			files.forEach(function(file) {
				output += file.toString() + "\n";
			});
			callback(output.trim());
		});
	},

	echo: function(stdin, callback, file){
		callback(file);
	},

	cat: function(stdin, callback, file){
		//sync solution: var fileContent = fs.readFileSync(file, "utf8");
		fs.readFile(file, "utf8", function(err, data){
			callback(data);
		});
	},

	head: function(stdin, callback, file){

		innerHelper(stdin, callback, file, function(input){
			return input.split("\n").slice(0, 5).join("\n");
		});

	},

	tail: function(stdin, callback, file){

		innerHelper(stdin, callback, file, function(input){
			return input.split("\n").slice(-5).join("\n");
		});

	},

	sort: function(stdin, callback, file){

		innerHelper(stdin, callback, file, function(input){
			return input.split("\n").sort().join("\n");
		});

	},

	wc: function(stdin, callback, file){

		innerHelper(stdin, callback, file, function(input){
			return input.split("\n").length;
		});

	},

	uniq: function(stdin, callback, file){

		innerHelper(stdin, callback, file, function(input){
			return input.split("\n").filter(function(line, index, self){
				return self.indexOf(line) === index;
			}).join("\n");
		});

	},

	curl: function(stdin, callback, url){
		request(url, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				callback(body);
			}else {
				callback("Returned status code: " + response.statusCode);
			}
		});
	}

};


var innerHelper = function(stdin, callback, file, func){
	var innerFunc = function(input){
		callback(func(input));
	};

	if(stdin){
		innerFunc(stdin);
	}else {
		fs.readFile(file, "utf8", function(err, data){
			innerFunc(data);
		});
	}
};



module.exports = commands;

