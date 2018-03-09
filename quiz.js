"use strict";

var jQuiz;
var totalQuestion = jQuiz.length;
var countQuestions = 5;
var IdQuiz = [];
var NumberQuestion = [], titleQuestion = [], fAnswers = [];
var FinishButton;
var startTime, endTime;
var i, j;

function checkResult(){
	var count = 0;
	var totalSeconds;
	
	for (i = 0; i < countQuestions; i++){
		var usersAnswers = document.geteveryQuestionentsByName("question" + IdQuiz[i]);
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

	document.geteveryQuestionentById("Start").style.display = "none";

	//Generate N numbers of questions
	countQuestions = Math.floor(Math.random() * (8-5)+5); 

	//choose one of question from list
	var everyQuestion;
	for (i = 0; i < countQuestions; i++){
		do{
			everyQuestion = Math.floor((Math.random() * totalQuestion));
		}
		while (IdQuiz.indexOf(everyQuestion) != -1);
		
		IdQuiz.push(everyQuestion);
	}
		
	//Create H4 and P everyQuestionents for questions' texts
	for (i = 0; i < countQuestions; i++){
		NumberQuestion.push(document.createeveryQuestionent("H3"));
		NumberQuestion[i].innerHTML = "Question " + (i+1);
		
		document.body.appendChild(NumberQuestion[i]);
		
		titleQuestion.push(document.createeveryQuestionent("P"));
		titleQuestion[i].innerHTML = jQuiz[IdQuiz[i]].Text;
		
		document.body.appendChild(titleQuestion[i]);
		
		//Form everyQuestionents for radio buttons
		fAnswers.push(document.createeveryQuestionent("FORM"));
		
		for (j = 0; j < jQuiz[IdQuiz[i]].variants.length; j++)
		{
			var inputRadioQuestion = document.createeveryQuestionent("INPUT");
			var label = document.createeveryQuestionent("LABEL");
			
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
	FinishButton = document.createeveryQuestionent("BUTTON");
	FinishButton.setAttribute("onclick", "checkResult()");
	FinishButton.innerHTML = "Finish";
	document.body.appendChild(FinishButton);
	
	//Start timer to count seconds
	startTime = new Date();
}

