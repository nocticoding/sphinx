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

var languageContainer = document.getElementById('language-container');
var questionContainer = document.getElementById('selector-container');
var questionText = document.getElementById('question-text');
var option1 = document.getElementById('option-1-container');
var option2 = document.getElementById('option-2-container');
var option3 = document.getElementById('option-3-container');
var answer = document.getElementById('answer');

document.addEventListener("keydown", KeyPressedHandler);

function KeyPressedHandler(e) {
    if (languageContainer.style.display == 'none') {
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
    var questions = shuffleQuestions(locale);
    hideSelector(languageContainer);
    showSelector(questionContainer);
    showNextQuestion(questions);
}

function shuffleQuestions(locale) {
    var sortedQuestions = [];
    var localeQuestions = AllQuestionsFromQuiz[locale];
    shuffle(localeQuestions);
    for (var i in localeQuestions)
        sortedQuestions.push([i, localeQuestions[i]]);
    return sortedQuestions;

}

function hideSelector(selector) {
    languageContainer.classname="hide";
}

function showSelector(selector) {
    questionContainer.classname="flex";
}

function showNextQuestion(questions) {
    console.log(questions);
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
    option1.append(choice1Node);
    option2.append(choice2Node);
    option3.append(choice3Node);
    answer.append(solutionNode);
}

function resolveQuestion(e) {
    keyPressed = e.key;
    correctAnswer = answer.childNodes[0].data;
    if (keyPressed == correctAnswer) {
        correct++;
        //Mostrar opciones correcta e incorrecta
    }
}



// function quiz() {
//     var output = [];
//     shuffle(localeQuestions);

//     questions.forEach((currentQuestion, questionNumber) => {
//         var choices = [];
//         for (letter in currentQuestion.choices) {

//             choices.push(
//                 `<label class="btn btn-primary border border-white border-4 rounded-pill w-100 text-start pl-3"><input type="radio" name="question${questionNumber}" value="${letter}">
//                     <span class="customRadio"></span>
//                         ${letter} :
//                         ${currentQuestion.choices[letter]}
//                 </label>`
//             );
//         }

//         output.push(
//             `<div class="slide">
//                 <div class="question">${currentQuestion.question}</div>
//                 <div class="choices">${choices.join("")}</div>
//             </div>`
//         );
//     });
//     quizContainer.innerHTML = output.join("");
// }

// function results() {

//     var answerContainers = quizContainer.querySelectorAll(".choices");

//     var numCorrect = 0;

//     questions.forEach((currentQuestion, questionNumber) => {
//         var answerContainer = answerContainers[questionNumber];
//         var selector = `input[name=question${questionNumber}]:checked`;
//         var userAnswer = (answerContainer.querySelector(selector) || {}).value;

//         if (userAnswer === currentQuestion.answer) {
//             numCorrect++;

//             answerContainers[questionNumber].style.color = "rgb(0, 88, 4)";
//         } else {
//             answerContainers[questionNumber].style.color = "rgb(141, 0, 0)";
//         }
//     });

//     resultsContainer.innerHTML = `${numCorrect} preguntas correctas de ${questions.length}`;
// }

// function showSlide(n) {
//     slides[currentSlide].classList.remove("active-slide");
//     slides[n].classList.add("active-slide");
//     currentSlide = n;

//     if (currentSlide === 0) {
//         previousButton.style.display = "none";
//     } else {
//         previousButton.style.display = "inline-block";
//     }

//     if (currentSlide === slides.length - 1) {
//         nextButton.style.display = "none";
//         submitButton.style.display = "inline-block";
//     } else {
//         nextButton.style.display = "inline-block";
//         submitButton.style.display = "none";
//     }
// }

// var progressBar = document.getElementById("progress-bar");
// var progressPercent = 0;

// var quizContainer = document.getElementById("quiz");
// var resultsContainer = document.getElementById("results");
// var submitButton = document.getElementById("submit");

// quiz();

// var slides = document.querySelectorAll(".slide");
// let currentSlide = 0;

// showSlide(0);

// submitButton.addEventListener("click", results);
// previousButton.addEventListener("click", previousSlide);
// nextButton.addEventListener("click", nextSlide);

function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}
