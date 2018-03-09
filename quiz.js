"use strict";

var jQuiz;

var totalQuestion = jQuiz.length;
var countQuestions = 5;
var IdQuiz = [];
var NumberQuestion = [], titleQuestion = [], fAnswers = [];
var FinishButton;

var startTime, endTime;

var i, j;

//Functions
function checkResult(){
	var count = 0;
	var totalSeconds;
	
	for (i = 0; i < countQuestions; i++){
		var usersAnswers = document.getElementsByName("question" + IdQuiz[i]);
		jQuiz[IdQuiz[i]].answerUser = "";
		
		for(j = 0; j < usersAnswers.length; j++){
			if(usersAnswers[j].checked){
				jQuiz[IdQuiz[i]].answerUser = usersAnswers[j].value;
			}
		}
		
		if (jQuiz[IdQuiz[i]].answerUser == ""){
			alert("Not all questions were answered!");
			return;
		}
		
		if (jQuiz[IdQuiz[i]].answerUser == jQuiz[IdQuiz[i]].answer) {
			count++;
		} 
	}
	
	endTime = new Date();
	
	totalSeconds = (endTime.getTime() - startTime.getTime())/1000;
		
	alert("You answered " + count + " of " + countQuestions + " right!\n" + "It took you " + totalSeconds + " seconds.");
}


function init()
{

	document.getElementById("Start").style.display = "none";

	//Generate N numbers of questions
	countQuestions = Math.floor(Math.random() * (8-3)+3); 

	//choose one of question from list
	var OneQuestion;
	for (i = 0; i < countQuestions; i++){
		do{
			OneQuestion = Math.floor((Math.random() * totalQuestion));
		}
		while (IdQuiz.indexOf(OneQuestion) != -1);
		
		IdQuiz.push(OneQuestion);
	}
		
	//Create H4 and P elements for questions' texts
	for (i = 0; i < countQuestions; i++){
		NumberQuestion.push(document.createElement("H3"));
		NumberQuestion[i].innerHTML = "Question " + (i+1);
		
		document.body.appendChild(NumberQuestion[i]);
		
		titleQuestion.push(document.createElement("P"));
		titleQuestion[i].innerHTML = jQuiz[IdQuiz[i]].Text;
		
		document.body.appendChild(titleQuestion[i]);
		
		//Form elements for radio buttons
		fAnswers.push(document.createElement("FORM"));
		
		for (j = 0; j < jQuiz[IdQuiz[i]].variants.length; j++)
		{
			var inputRadioQuestion = document.createElement("INPUT");
			var label = document.createElement("LABEL");
			
			inputRadioQuestion.setAttribute("type", "radio");
			inputRadioQuestion.setAttribute("name", "question" + IdQuiz[i]);
			inputRadioQuestion.setAttribute("value", jQuiz[IdQuiz[i]].variants[j]);
			
			label.appendChild(inputRadioQuestion);
			label.innerHTML += "<span> " + jQuiz[IdQuiz[i]].variants[j] + "</span><br>";
			
			fAnswers[i].appendChild(label);
		}
		
		document.body.appendChild(fAnswers[i]);
	}

	//Create Answer button
	FinishButton = document.createElement("BUTTON");
	FinishButton.setAttribute("onclick", "checkResult()");
	FinishButton.innerHTML = "Finish";
	document.body.appendChild(FinishButton);
	
	//Start timer to count seconds
	startTime = new Date();
}