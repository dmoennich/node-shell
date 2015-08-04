
var cmds = require("./command.js");

process.stdout.write("prompt> ");

process.stdin.on("data", function(data){
	var inputs = data.toString().trim().split(" ");
	// echo "hello"
	// ls /Users/test
	var cmd = inputs[0];
	var args = inputs.slice(1);
	args.unshift(done);

	if(cmds[cmd]){
		cmds[cmd].apply(this, args);
	}

});


var done = function(output){
	console.log(output);
	process.stdout.write("prompt> ");
};
