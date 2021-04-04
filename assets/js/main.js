import config from './../../config.js';

var questions;
var choices;
var correct = 0;
var unanswered = 0;
var keyPressedEventActive = false;
var correctFlag = false;
var $totalOptions = 0;

$(document).ready(function () {
    $('.fadeOnLoad').delay(2000).removeClass('hide').hide().fadeIn('slow');
});

document.addEventListener("keydown", KeyPressedHandler);

function launchQuiz() {
    questions = questions.slice(0, config.total_questions);
    $('#timer').toggleClass('hide');
    $('#language-container').toggleClass('hide');
}

function shuffleQuestions(locale) {
    var sortedQuestions = [];
    var allQuestionsFromQuiz = getQuestionsFromUrl();
    var localeQuestions = allQuestionsFromQuiz[locale];
    for (var i in localeQuestions) {
        sortedQuestions.push([i, localeQuestions[i]]);
    }
    questions = shuffle(sortedQuestions);

    return sortedQuestions;

}

export function unansweredQuestion() {
    unanswered++;

    if (unanswered > config.UNANSWERED_QUESTIONS_TOTAL) {
        destroyTimer();
        endGame();
    } else {
        clearQuestion();
        showNextQuestion();
    }

}

function showNextQuestion() {
    $('#timer').delay(2000).removeClass("hide").hide().fadeIn(1000, () =>{
        createTimer();
        startTimer();
    });
    $('#selector-container').delay(2000).removeClass("hide").hide().fadeIn(1000);
    var currentQuestion = questions.pop()[1];
     console.log(currentQuestion);
    var choices = currentQuestion.answers;
    $('#question-text').append(currentQuestion.question);

    for (let index = 1; index < Object.keys(choices).length; index++) {
        console.log($("#option-" + (index) + "-container").children('span'), choices[index]);
        $("#option-" + (index) + "-container").children('span').append(choices[index-1]);
    }

    $('#answer').append(currentQuestion.correctAnswer);
}

function resolveQuestion(e) {
    destroyTimer()
    keyPressedEventActive = false;
    var keyPressed = e.key;
    unanswered = 0;

    var correctAnswer = $('#answer').text();

    if (keyPressed == correctAnswer) {
        correct++;
        correctFlag = true;
    }
    $totalOptions = $("[id*=option-]").length;

    for (let index = 1; index <= $totalOptions; index++) {
            $("#option-" + index + "-container").addClass(index == keyPressed ? 'selected': 'inactive');
    }

    for (let index = 1; index <= $totalOptions; index++) {
            $("#option-" + index + "-container").delay(2000).toggleClass(index== correctAnswer ?'correct' : 'wrong');
    }
    $('#selector-container').delay(2000).fadeOut(1000, () => {
        clearQuestion()
    });
}

function showResults() {
    $('#solution-container').delay(2000).removeClass('hide').hide().fadeIn(1000);
    var result = correct / config.total_questions;
    var textResult = '';
    var faceClass = ''
    if (result <= 0.12) {
        textResult = 'Principiante';
        faceClass = 'newbie';
    } else if (result <= 0.54) {
        textResult = 'Intermedio';
        faceClass = 'intermediate';
    } else if (result >= 0.95) {
        textResult = 'Avanzado';
        faceClass = 'advanced';
    }
    $('#face').addClass(faceClass);
    $('#score').append(result * 100 + '%');
    $('#level').append(textResult);

    reloadQuiz(config.time_for_reload)
}

function KeyPressedHandler(e) {
    if (!keyPressedEventActive) {
        keyPressedEventActive = true;
        if ($('#language-container.hide').length) {
            resolveQuestion(e);

            if (questions.length === 0) {
                endGame()
            } else {
                showNextQuestion();

            }
        } else {
            var locale = config.languages[e.key];
            shuffleQuestions(locale);
            launchQuiz();
            showNextQuestion();
        }
        keyPressedEventActive = false;
    }
}

function endGame() {
    $('#selector-container').fadeOut(
        config.time_for_reload,
        () => {
            $('#selector-container').children('.selection-wrapper').empty()
        });
    showResults();
}

var  shuffle = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

var clearQuestion = () => {
    $('#question-text').empty();
    $totalOptions = $("[id*=option]").length;

    for (let index = 1; index <= $totalOptions; index++) {
        console.log($totalOptions, $("#option-" + index + "-container").children('span'));
        $("#option-" + index + "-container").children('span').empty();
    }
    $('#answer').empty();
}

var getQuestionsFromUrl = () => {
    $.ajax({
        url: config.question_list_url,
        success: function (result) {
            questions = result;
        },
        async: false,
    });
    return questions;
}

var  reloadQuiz = (time) => {
    $('#solution-container').fadeOut(time, () => {
        location.reload()
    })
}

//TODO: falta el reinicio si no se contestan n respuestas
//TODO: Falta insertar logos y dibujos
//TODO: Falta pulir el CSS

const FULL_DASH_ARRAY = 189;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
const ALERT_DONE = 0;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  },
  done: {
      color: "transparent",
      threshold: ALERT_DONE
  }
};

const TIME_LIMIT = 20;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

const createTimer = () => {document.getElementById("timer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="30"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="0"
        class="base-timer__path-remaining"
        d="
          M 50, 50
          m -30, 0
          a 30,30 0 1,0 60,0
          a 30,30 0 1,0 -60,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;
}

function onTimesUp() {
    clearInterval(timerInterval);
    timePassed = 0;
    unansweredQuestion();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  let seconds = time;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${seconds}`;
}


function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return 1-(rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction));
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 189`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

function destroyTimer() {
    clearInterval(timerInterval);
    timePassed = 0;
    $('#timer').empty();
}