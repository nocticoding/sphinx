import config from './../../config.js';
import optionSkeleton from '../templates/option-template.js';

var questions;

document.addEventListener("keydown", KeyPressedHandler);

function KeyPressedHandler(e) {
    if (!keyPressedEventActive) {
        if (splashPage.classList.contains('hide')) {
            resolveQuestion(e);
        } else {
            var locale = config.languages[e.key];
            getQuestionsFromUrl(selectLocaleQuestions(locale));
            console.log(this.questions);
        }
    }
}

var getQuestionsFromUrl = (callback) => {
var xhr = new XMLHttpRequest ();
xhr.open ( "GET", config.question_list_url);
xhr.onreadystatechange = () =>
{
  if ( xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200)
  {
    callback(JSON.parse(xhr.responseText));
  }
}
xhr.send ();
}

var selectLocaleQuestions = (locale) => {
    console.log(questions);
}




var questions = [];
var choices = [];
var correct = 0;
var unanswered = 0;
var totalQuestionNumber = 0;
var timer;
var keyPressedEventActive = false;

var splashPage = document.getElementById('splash');
var questionContainer = document.getElementById('selector-container');
var selectionWrapper = document.getElementsByClassName('selection-wrapper')[0];
var questionText = document.getElementById('question-text');
var totalQuestion = document.getElementById('total-questions');
var questionNumberInQuiz = document.getElementById('question-number');

var option1 = document.getElementById('option-1-container');
var option2 = document.getElementById('option-2-container');
var option3 = document.getElementById('option-3-container');
var option4 = document.getElementById('option-4-container');

var option1Text = option1.getElementsByTagName('span')[0];
var option2Text = option2.getElementsByTagName('span')[0];
var option3Text = option3.getElementsByTagName('span')[0];
var option4Text = option4.getElementsByTagName('span')[0];

var option1Solution = option1.getElementsByClassName('solution-text')[0];
var option2Solution = option2.getElementsByClassName('solution-text')[0];
var option3Solution = option3.getElementsByClassName('solution-text')[0];
var option4Solution = option4.getElementsByClassName('solution-text')[0];

var option1ImageFront = option1.getElementsByClassName('image')[0];
var option2ImageFront = option2.getElementsByClassName('image')[0];
var option3ImageFront = option3.getElementsByClassName('image')[0];
var option4ImageFront = option4.getElementsByClassName('image')[0];

var option1ImageBack = option1.getElementsByClassName('image')[1];
var option2ImageBack = option2.getElementsByClassName('image')[1];
var option3ImageBack = option3.getElementsByClassName('image')[1];
var option4ImageBack = option4.getElementsByClassName('image')[1];

var answer = document.getElementById('answer');

function launchQuiz(locale) {
    questions = shuffleQuestions(locale);
    hideSelector(splashPage);
    showSelector(questionContainer);
    fadeIn(questionContainer, 1000);
    totalQuestionNumber = questions.length;
    showNextQuestion();
}

function shuffleQuestions(locale) {
    var sortedQuestions = [];
    var localeQuestions = AllQuestionsFromQuiz[locale];
    for (var i in localeQuestions) {
        sortedQuestions.push([i, localeQuestions[i]]);
    }
    // import AllQuestionsFromQuiz from './../quiz/questions.json';
    questions = shuffle(sortedQuestions);

    return sortedQuestions;

}

function hideSelector(selector) {
    selector.classList.remove("flex");
    selector.classList.add("hide");
}

function showSelector(selector) {
    selector.classList.remove("hide");
    selector.classList.add("flex");
}

function showNextQuestion() {
    questionContainer.classList.remove('fadeOut', 'delay-1s')
    questionContainer.classList.add('fadeIn', 'delay-1s');
    clearInterval(timer);
    if (questions.length == 0) {
        showResults()
    } else {
        totalQuestion.innerText='';
        questionNumberInQuiz.innerText='';

        var currentQuestion = questions.pop();
        var question = currentQuestion[1];
        var inquire = question['question'];
        var solution = question['answer'];
        choices = question['choices'];
        questionNumber = totalQuestionNumber - questions.length;

        var questionOrder = document.createTextNode(questionNumber);
        var totalQuestions = document.createTextNode(totalQuestionNumber);
        var inquireText = document.createTextNode(inquire);
        var choice1Picture = document.createElement('img');
        var choice2Picture = document.createElement('img');
        var choice3Picture = document.createElement('img');
        var choice4Picture = document.createElement('img');

        var choice1Node = document.createTextNode(choices[1]["text"] !== '' ? choices[1]["text"] : '');
        var choice2Node = document.createTextNode(choices[2]["text"] !== '' ? choices[2]["text"] : '');
        var choice3Node = document.createTextNode(choices[3]["text"] !== '' ? choices[3]["text"] : '');
        var choice4Node = document.createTextNode(choices[4]["text"] !== '' ? choices[4]["text"] : '');

        var solutionNode = document.createTextNode(solution);


        choice1Picture.src = choices[1]["image"] !== '' ? choices[1]["image"] : '';
        choice2Picture.src = choices[2]["image"] !== '' ? choices[2]["image"] : '';
        choice3Picture.src = choices[3]["image"] !== '' ? choices[3]["image"] : '';
        choice4Picture.src = choices[4]["image"] !== '' ? choices[4]["image"] : '';

        questionText.append(inquireText);

        option1Text.append(choice1Node);
        option2Text.append(choice2Node);
        option3Text.append(choice3Node);
        option4Text.append(choice4Node);

        option1ImageFront.append(choice1Picture);
        option2ImageFront.append(choice2Picture);
        option3ImageFront.append(choice3Picture);
        option4ImageFront.append(choice4Picture);

        totalQuestion.append(totalQuestions);
        questionNumberInQuiz.append(questionOrder);

        option1Text.classList.add(choice1Node !== '' ? 'background-text' : '');
        option2Text.classList.add(choice2Node !== '' ? 'background-text' : '');
        option3Text.classList.add(choice3Node !== '' ? 'background-text' : '');
        option4Text.classList.add(choice4Node !== '' ? 'background-text' : '');

        answer.append(solutionNode);
    }
    countdownTimer()
    keyPressedEventActive = false;
}

function resolveQuestion(e) {
    keyPressedEventActive = true;
    unanswered = 0;
    clearInterval(timer);
    removeProgressbar('progressbar');

    var keyPressed = e.key;
    if (answer.childNodes.length == 0) {
        return null;
    }
    var correctAnswer = answer.childNodes[0].data;

    if (keyPressed == correctAnswer) {
        correct++;
        correctFlag = true;
    }

    option1Text.innerText = '';
    option2Text.innerText = '';
    option3Text.innerText = '';
    option4Text.innerText = '';

    option1Text.classList.remove('background-text');
    option2Text.classList.remove('background-text');
    option3Text.classList.remove('background-text');
    option4Text.classList.remove('background-text');

    option1ImageFront.innerHTML = '';
    option2ImageFront.innerHTML = '';
    option3ImageFront.innerHTML = '';
    option4ImageFront.innerHTML = '';


    var choice1BackPicture = document.createElement('img');
    var choice2BackPicture = document.createElement('img');
    var choice3BackPicture = document.createElement('img');
    var choice4BackPicture = document.createElement('img');

    option1.getElementsByClassName('flip-card')[0].classList.add('hover');
    option2.getElementsByClassName('flip-card')[0].classList.add('hover');
    option3.getElementsByClassName('flip-card')[0].classList.add('hover');
    option4.getElementsByClassName('flip-card')[0].classList.add('hover');


    choice1BackPicture.src = choices[1]["backImage"] !== '' ? choices[1]["backImage"] : choices[1]["image"];
    choice2BackPicture.src = choices[2]["backImage"] !== '' ? choices[2]["backImage"] : choices[2]["image"];
    choice3BackPicture.src = choices[3]["backImage"] !== '' ? choices[3]["backImage"] : choices[3]["image"];
    choice4BackPicture.src = choices[4]["backImage"] !== '' ? choices[4]["backImage"] : choices[4]["image"];


    var choice1Solution = document.createTextNode(choices[1]["solution"] !== '' ? choices[1]["solution"] : '');
    var choice2Solution = document.createTextNode(choices[2]["solution"] !== '' ? choices[2]["solution"] : '');
    var choice3Solution = document.createTextNode(choices[3]["solution"] !== '' ? choices[3]["solution"] : '');
    var choice4Solution = document.createTextNode(choices[4]["solution"] !== '' ? choices[4]["solution"] : '');

    option1Solution.append(choice1Solution);
    option2Solution.append(choice2Solution);
    option3Solution.append(choice3Solution);
    option4Solution.append(choice4Solution);

    option1ImageBack.append(choice1BackPicture);
    option2ImageBack.append(choice2BackPicture);
    option3ImageBack.append(choice3BackPicture);
    option4ImageBack.append(choice4BackPicture);

    option1Solution.classList.add('background-text');
    option2Solution.classList.add('background-text');
    option3Solution.classList.add('background-text');
    option4Solution.classList.add('background-text');

    switch (correctAnswer) {
        case '1':
            option2.classList.add('fa','fa-times');
            option3.classList.add('fa','fa-times');
            option4.classList.add('fa','fa-times');
            break;
            case '2':
            option1.classList.add('fa','fa-times');
            option3.classList.add('fa','fa-times');
            option4.classList.add('fa','fa-times');
            break;
            case '3':
            option1.classList.add('fa','fa-times');
            option2.classList.add('fa','fa-times');
            option4.classList.add('fa','fa-times');
            break;
        case '4':
            option1.classList.add('fa','fa-times');
            option2.classList.add('fa','fa-times');
            option3.classList.add('fa','fa-times');
            break;
    }
    correctAnswer = '';
    sleep(15000).then(() => clearQuestion());
    sleep(15000).then(() => showNextQuestion());
}

function clearQuestion() {
    fadeIn(questionContainer, 1000);
    removeProgressbar('progressbar');

    option1Solution.classList.remove('background-text');
    option2Solution.classList.remove('background-text');
    option3Solution.classList.remove('background-text');
    option4Solution.classList.remove('background-text');

    option1Text.classList.remove('background-text');
    option2Text.classList.remove('background-text');
    option3Text.classList.remove('background-text');
    option4Text.classList.remove('background-text');

    option1.getElementsByClassName('flip-card')[0].classList.remove('hover');
    option2.getElementsByClassName('flip-card')[0].classList.remove('hover');
    option3.getElementsByClassName('flip-card')[0].classList.remove('hover');
    option4.getElementsByClassName('flip-card')[0].classList.remove('hover');

    option1.classList.remove('fa','fa-times');
    option2.classList.remove('fa','fa-times');
    option3.classList.remove('fa','fa-times');
    option4.classList.remove('fa','fa-times');

    option1Text.innerText = '';
    option2Text.innerText = '';
    option3Text.innerText = '';
    option4Text.innerText = '';

    option1Solution.innerText = '';
    option2Solution.innerText = '';
    option3Solution.innerText = '';
    option4Solution.innerText = '';

    option1ImageFront.innerHTML = '';
    option2ImageFront.innerHTML = '';
    option3ImageFront.innerHTML = '';
    option4ImageFront.innerHTML = '';

    option1ImageBack.innerHTML = '';
    option2ImageBack.innerHTML = '';
    option3ImageBack.innerHTML = '';
    option4ImageBack.innerHTML = '';

    questionText.innerText = '';
    answer.innerText = '';
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

async function countdownTimer() {
    if (unanswered > 3) {
        showResults();
    }
    createProgressbar('progressbar', '15s');
    timer = setInterval(() => {
        sleep(2000).then(() => clearQuestion());
        sleep(2000).then(() => showNextQuestion());
        unanswered++;


    }, 13000);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showResults() {
    var resultContainer = document.getElementsByClassName('result-container')[0];
    var congratulationsMessage = '';
    selectionWrapper.classList.add('hide');
    selectionWrapper.classList.remove('flex');

    resultContainer.classList.remove('hide');

    var score = document.getElementById('score');
    var congratulations = document.getElementById('congratulations');

    if (correct < 3) {
        congratulationsMessage = '¡Seguro que puedes hacerlo mejor!';
    } else if (correct >= 3) {
        congratulationsMessage = '¿A que te dan ganas de saber más sobre el visón europeo?';
    } else if (correct >= 7) {
        congratulationsMessage = 'nada mal, aunque siempre puedes aprender un poco más';
    } else if (correct >= 10) {
        congratulationsMessage = 'impresionante, eres casi una eminencia';
    } else {
        congratulationsMessage = '¿seguro que no eres un visón disfrazado?';
    }
    var congratulationsText = document.createTextNode(congratulationsMessage);
    var inquireText = document.createTextNode('Has acertado: ' + correct + ' preguntas');

    score.append(inquireText);
    congratulations.append(congratulationsText);
    sleep(3000).then(() => location.reload());
}
function fadeIn(element, duration = 600) {
    element.style.display = '';
    element.style.opacity = 0;
    var last = +new Date();
    var tick = function () {
        element.style.opacity = +element.style.opacity + (new Date() - last) / duration;
        last = +new Date();
        if (+element.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
    };
    tick();
}

function createProgressbar(id, duration, callback) {
    var progressbar = document.getElementById(id);
    progressbar.className = 'progressbar';
  
    var progressbarinner = document.createElement('div');
    progressbarinner.className = 'inner';
  
    progressbarinner.style.animationDuration = duration;
  
    if (typeof(callback) === 'function') {
      progressbarinner.addEventListener('animationend', callback);
    }
  
    progressbar.appendChild(progressbarinner);
  
    progressbarinner.style.animationPlayState = 'running';
  }

  function removeProgressbar(id) {
    var progressbar = document.getElementById(id);
    progressbar.innerHTML='';
    progressbar.classList.remove('progressbar');
  }