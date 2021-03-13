// import AllQuestionsFromQuiz from './../quiz/questions.json';
//BUG: RESOLVER PROBLEMA DE IMPORTACIÓN DEL JSON EXTERNO


var AllQuestionsFromQuiz =
{
    "es":
    {
        0:
        {
            question: "¿Cuál es el plqwewqaneta más grande del Sistema Solar?",
            choices: {
                1: "Júpiter",
                2: "Saturno",
                3: "Urano"
            },
            answer: "1"
        },
        1:
        {
            question: "¿Cuando llegqweqó el hombre a la Luna?",
            choices: {
                1: "No llegó",
                2: "1972",
                3: "1969"
            },
            answer: "3"
        },
        2:
        {
            question: "¿Cuántos cqweqwontinentes hay",
            choices: {
                1: "6",
                2: "7",
                3: "8"
            },
            answer: "1"
        },
        3:
        {
            question: "¿Cuál es eqweqwl animal más rápido?",
            choices: {
                1: "Elefante",
                2: "Leopardo",
                3: "Perezoso"
            },
            answer: "2"
        },
        4:
        {
            question: "¿Quwewqé ciudad tiene más días de sol?",
            choices: {
                1: "Málaga",
                2: "Vigo",
                3: "Burgos"
            },
            answer: "1"
        }
    },
    "en":
    {
        0:
        {
            question: "¿Cuál es el plqwewqaneta más grande del Sistema Solar?",
            choices: {
                1: "Júpiter",
                2: "Saturno",
                3: "Urano"
            },
            answer: "1"
        },
        1:
        {
            question: "¿Cuando llegqweqó el hombre a la Luna?",
            choices: {
                1: "No llegó",
                2: "1972",
                3: "1969"
            },
            answer: "3"
        },
        2:
        {
            question: "¿Cuántos cqweqwontinentes hay",
            choices: {
                1: "6",
                2: "7",
                3: "8"
            },
            answer: "1"
        },
        3:
        {
            question: "¿Cuál es eqweqwl animal más rápido?",
            choices: {
                1: "Elefante",
                2: "Leopardo",
                3: "Perezoso"
            },
            answer: "2"
        },
        4:
        {
            question: "¿Quwewqé ciudad tiene más días de sol?",
            choices: {
                1: "Málaga",
                2: "Vigo",
                3: "Burgos"
            },
            answer: "1"
        }
    },
    "pt":
    {
        0:
        {
            question: "¿Cuál es el plqwewqaneta más grande del Sistema Solar?",
            choices: {
                1: "Júpiter",
                2: "Saturno",
                3: "Urano"
            },
            answer: "1"
        },
        1:
        {
            question: "¿Cuando llegqweqó el hombre a la Luna?",
            choices: {
                1: "No llegó",
                2: "1972",
                3: "1969"
            },
            answer: "3"
        },
        2:
        {
            question: "¿Cuántos cqweqwontinentes hay",
            choices: {
                1: "6",
                2: "7",
                3: "8"
            },
            answer: "1"
        },
        3:
        {
            question: "¿Cuál es eqweqwl animal más rápido?",
            choices: {
                1: "Elefante",
                2: "Leopardo",
                3: "Perezoso"
            },
            answer: "2"
        },
        4:
        {
            question: "¿Quwewqé ciudad tiene más días de sol?",
            choices: {
                1: "Málaga",
                2: "Vigo",
                3: "Burgos"
            },
            answer: "1"
        }
    }
};
var questions = [];
var correct = 0;
var unanswered = 0;
var timer;

var languageContainer = document.getElementById('language-container');
var questionContainer = document.getElementById('selector-container');
var questionText = document.getElementById('question-text');
var option1 = document.getElementById('option-1-container');
var option2 = document.getElementById('option-2-container');
var option3 = document.getElementById('option-3-container');
var option1Text = option1.getElementsByTagName('span')[0];
var option2Text = option2.getElementsByTagName('span')[0];
var option3Text = option3.getElementsByTagName('span')[0];
var answer = document.getElementById('answer');

document.addEventListener("keydown", KeyPressedHandler);

function KeyPressedHandler(e) {
    if (languageContainer.classList.contains('hide')) {
        resolveQuestion(e);
    } else {
        selectLanguage(e);
    }

}

function selectLanguage(e) {
    var keyPressed = e.key;
    var locale = '';

    switch (keyPressed) {
        case "1":
            console.log('selecionado español');
            locale = "es";
            break;
        case "2":
            console.log('seleccionado inglés');
            locale = "en";
            break;
        case "3":
            console.log('seleccionado portugués');
            locale = "pt";
            break;
    }
    if (locale == '') {
        return;
    }

    launchQuiz(locale);
}

function launchQuiz(locale) {
    questions = shuffleQuestions(locale);
    hideSelector(languageContainer);
    showSelector(questionContainer);
    showNextQuestion();
}

function shuffleQuestions(locale) {
    var sortedQuestions = [];
    var localeQuestions = AllQuestionsFromQuiz[locale];
    for (var i in localeQuestions)
    {
        sortedQuestions.push([i, localeQuestions[i]]);
    }
    // import AllQuestionsFromQuiz from './../quiz/questions.json';
    questions = shuffle(sortedQuestions);
    
    return sortedQuestions;

}

function hideSelector(selector) {
    selector.className = "hide";

}

function showSelector(selector) {
    selector.className = "flex";
}

function showNextQuestion() {
    clearInterval(timer);
    if (questions.length == 0) {
        showResults()
    } else {
        var currentQuestion = questions.pop();
        var question = currentQuestion[1];
        var inquire = question['question'];
        var choices = question['choices'];
        var solution = question['answer'];
        
        var inquireText = document.createTextNode(inquire);
        var choice1Node = document.createTextNode(choices[1]);
        var choice2Node = document.createTextNode(choices[2]);
        var choice3Node = document.createTextNode(choices[3]);
        var solutionNode = document.createTextNode(solution);
        questionText.append(inquireText)
        option1Text.append(choice1Node);
        option2Text.append(choice2Node);
        option3Text.append(choice3Node);
        answer.append(solutionNode);
    }
    countdownTimer()
}

function resolveQuestion(e) {
    unanswered = 0;
    clearInterval(timer);

    var correctFlag = false;
    var keyPressed = e.key;
    var correctAnswer = answer.childNodes[0].data;
    if (keyPressed == correctAnswer) {
        correct++;
        correctFlag = true;
    }

    if (correctFlag) {
        switch (keyPressed) {
            case "1":
                option1.classList.add("text-success");
                option1.getElementsByClassName('round')[0].classList.add('checkmark');
                option2.classList.add("text-muted");
                option2.getElementsByClassName('round')[0].classList.add('muted');
                option3.classList.add("text-muted");
                option3.getElementsByClassName('round')[0].classList.add('muted');
                break;
            case "2":
                option1.classList.add("text-muted");
                option1.getElementsByClassName('round')[0].classList.add('muted');
                option2.classList.add("text-success");
                option2.getElementsByClassName('round')[0].classList.add('checkmark');
                option3.classList.add("text-muted");
                option3.getElementsByClassName('round')[0].classList.add('muted');
                break;
            case "3":
                option1.classList.add("text-muted");
                option1.getElementsByClassName('round')[0].classList.add('muted');
                option2.classList.add("text-muted");
                option2.getElementsByClassName('round')[0].classList.add('muted');
                option3.classList.add("text-success");
                option3.getElementsByClassName('round')[0].classList.add('checkmark');
                break;
        }
    } else {
        switch (keyPressed) {
            case "1":
                option1.classList.add("text-danger");
                option1.getElementsByClassName('round')[0].classList.add('crossmark');
                option2.classList.add("text-muted");
                option2.getElementsByClassName('round')[0].classList.add('muted');
                option3.classList.add("text-muted");
                option3.getElementsByClassName('round')[0].classList.add('muted');
                break;
            case "2":
                option1.classList.add("text-muted");
                option1.getElementsByClassName('round')[0].classList.add('muted');
                option2.classList.add("text-danger");
                option2.getElementsByClassName('round')[0].classList.add('crossmark');
                option3.classList.add("text-muted");
                option3.getElementsByClassName('round')[0].classList.add('muted');
                break;
            case "3":
                option1.classList.add("text-muted");
                option1.getElementsByClassName('round')[0].classList.add('muted');
                option2.classList.add("text-muted");
                option2.getElementsByClassName('round')[0].classList.add('muted');
                option3.classList.add("text-danger");
                option3.getElementsByClassName('round')[0].classList.add('crossmark');
                break;
        }

    }
    sleep(500).then(() => clearQuestion());
    sleep(500).then(() => showNextQuestion());
}

function clearQuestion() {
    option1.classList.remove("text-muted", "text-success", "text-danger");
    option2.classList.remove("text-muted", "text-success", "text-danger");
    option3.classList.remove("text-muted", "text-success", "text-danger");
    option1.getElementsByClassName('round')[0].classList.remove('muted', 'checkmark', 'crossmark');
    option2.getElementsByClassName('round')[0].classList.remove('muted', 'checkmark', 'crossmark');
    option3.getElementsByClassName('round')[0].classList.remove('muted', 'checkmark', 'crossmark');
    option1Text.innerText = '';
    option2Text.innerText = '';
    option3Text.innerText = '';
    questionText.innerText = '';
    answer.innerText='';
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

async function countdownTimer()
{
    if (unanswered >3) {
        showResults();
    }
    timer = setInterval(() => {
        sleep(500).then(() => clearQuestion());
        sleep(500).then(() => showNextQuestion());
        unanswered++;
        showNextQuestion();
    }, 5000);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showResults()
{
    var inquireText = document.createTextNode(correct);
    questionText.append(inquireText);
    sleep(1000).then(() => location.reload());
}
