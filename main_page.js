var http = require('http');
var fs = require('fs');

function formatquestions(){
	var quiztype = fs.readFileSync("./quiz.js");
	var quizdata = fs.readFileSync("./questions.json");
	
	quiztype = quiztype.toString().replace("var jQuiz;", "var jQuiz = " + quizdata);
	
	return quiztype;
}

http.createServer(function (req, res) {
    if (req.url == "/quiz.js")
	{	
		res.writeHead(200, {'Content-Type': 'text/javascript'});
		res.write(formatquestions());
	}
	else
	{		
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(fs.readFileSync("./index.html"));		
	}
		
	res.end();
}).listen(8080);