
var cmds = require("./command.js");

process.stdout.write("prompt> ");

var cmdList;

var callNextCmd = function(stdin){
	var inputs = cmdList.shift().split(" ");

	var cmd = inputs[0];
	var args = inputs.slice(1);
	args.unshift(done);
	args.unshift(stdin);

	if(cmds[cmd]){
		cmds[cmd].apply(this, args);
	}
};


process.stdin.on("data", function(data){
	//var inputs = data.toString().trim().split(" ");

	var cmdString = data.toString().trim();
	cmdList = cmdString.split(/\s*\|\s*/g);

	callNextCmd();
	// var inputs = cmdList.pop().split(" ");

	// var cmd = inputs[0];
	// var args = inputs.slice(1);
	// args.unshift(done);

	// if(cmds[cmd]){
	// 	cmds[cmd].apply(this, args);
	// }

});


var done = function(output){
	if(cmdList.length > 0){
		callNextCmd(output);
	}else {
		console.log(output);
		process.stdout.write("prompt> ");
	}
};
