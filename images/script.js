/* =================================
   GET HTML ELEMENTS
================================= */

const startScreen =
    document.getElementById("startScreen");

const quizScreen =
    document.getElementById("quizScreen");

const resultScreen =
    document.getElementById("resultScreen");


const startButton =
    document.getElementById("startButton");

const playAgainButton =
    document.getElementById(
        "playAgainButton"
    );


const questionNumber =
    document.getElementById(
        "questionNumber"
    );

const question =
    document.getElementById(
        "question"
    );

const questionImage =
    document.getElementById(
        "questionImage"
    );


const scoreDisplay =
    document.getElementById(
        "score"
    );

const progressBar =
    document.getElementById(
        "progressBar"
    );


const feedback =
    document.getElementById(
        "feedback"
    );


const answerButtons =
    document.querySelectorAll(
        ".answer-button"
    );


const finalScore =
    document.getElementById(
        "finalScore"
    );

const resultTitle =
    document.getElementById(
        "resultTitle"
    );

const resultMessage =
    document.getElementById(
        "resultMessage"
    );

const resultHeart =
    document.getElementById(
        "resultHeart"
    );


/* =================================
   AUDIO
================================= */

const backgroundMusic =
    document.getElementById(
        "backgroundMusic"
    );

const correctSound =
    document.getElementById(
        "correctSound"
    );

const wrongSound =
    document.getElementById(
        "wrongSound"
    );


const questions = [

    {
        question:
            "What is my favorite thing about you? ❤️",

        image:
            "images/question1.jpg",

        answers: [

            "Your smile",

            "Your personality",

            "Your kindness",

            "All of the above? 🤔"

        ],

        correct: 3
    },


    {
        question:
            "Where would I want to take you on a date? 🥰",

        image:
            "images/question2.jpg",

        answers: [

            "Japan",

            "Naboo",

            "malls",

            "Anywhere with you"

        ],

        correct: 3
    },


    {
        question:
            "What makes me happiest? 💖",

        image:
            "images/question3.jpg",

        answers: [

            "Kisses",

            "warm hugs from you",

            "holding my hands",

            "Spending time with you"

        ],

        correct: 3
    },


    {
        question:
            "Who is more likely to say 'I love you' first? 💕",

        image:
            "images/question4.jpg",

        answers: [

            "Me",

            "You",

            "Both of us",

            "Neither of us"

        ],

        correct: 0
    },


    {
        question:
            "Saan tayo unang nag ✈️",

        image:
            "images/question5.jpg",

        answers: [

            "The Japan (50/50 kasi may kaso)",

            "a",

            "The beach",

            "Anywhere with you"

        ],

        correct: 3
    },


    {
        question:
            "What could I never get tired of? 💗",

        image:
            "images/question6.jpg",

        answers: [

            "Talking to you",

            "Sleeping",

            "Eating",

            "Playing games"

        ],

        correct: 0
    },


    {
        question:
            "What nickname would I probably call you? 🥺",

        image:
            "images/question7.jpg",

        answers: [

            "Baby",

            "Love",

            "Princess",

            "All of these"

        ],

        correct: 3
    },


    {
        question:
            "What would I rather have? 💘",

        image:
            "images/question8.jpg",

        answers: [

            "A million pesos",

            "A new phone",

            "A perfect day with you",

            "A luxury car"

        ],

        correct: 2
    },


    {
        question:
            "What is my favorite memory with you? 💞",

        image:
            "images/question9.jpg",

        answers: [

            "Our first conversation",

            "Our funniest moment",

            "Our first date",

            "Every moment with you"

        ],

        correct: 3
    },


    {
        question:
            "And finally... who do I love the most? ❤️",

        image:
            "images/question10.jpg",

        answers: [

            "Myself",

            "My friends",

            "My girlfriend",

            "Pizza"

        ],

        correct: 2
    }

];


/* =================================
   GAME VARIABLES
================================= */

let currentQuestion = 0;

let score = 0;


/* =================================
   START GAME
================================= */

startButton.addEventListener(
    "click",
    function () {

        startScreen.style.display =
            "none";

        quizScreen.style.display =
            "flex";

        resultScreen.style.display =
            "none";


        currentQuestion = 0;

        score = 0;


        scoreDisplay.textContent =
            score;


        /*
            Start music.

            Browsers allow this because
            the music starts after the
            user clicks the button.
        */

        backgroundMusic.volume = 0.4;

        backgroundMusic.play()
            .catch(function () {

                console.log(
                    "Music could not start."
                );

            });


        showQuestion();

    }
);


/* =================================
   SHOW QUESTION
================================= */

function showQuestion() {

    const current =
        questions[currentQuestion];


    /* Question number */

    questionNumber.textContent =
        `Question ${
            currentQuestion + 1
        }/10`;


    /* Question text */

    question.textContent =
        current.question;


    /* Question image */

    questionImage.src =
        current.image;


    /*
        If image cannot be found,
        show a placeholder.
    */

    questionImage.onerror =
        function () {

            this.src =
                "https://placehold.co/600x400/ffd6e0/ff5c7a?text=Our+Memory+❤️";

        };


    /* Progress */

    progressBar.style.width =
        `${
            (
                (currentQuestion + 1)
                /
                questions.length
            ) * 100
        }%`;


    /* Clear feedback */

    feedback.textContent = "";


    /* Set answers */

    answerButtons.forEach(
        function (button, index) {

            button.textContent =
                current.answers[index];

            button.disabled =
                false;

            button.classList.remove(
                "correct"
            );

            button.classList.remove(
                "wrong"
            );

        }
    );

}


/* =================================
   ANSWER BUTTONS
================================= */

answerButtons.forEach(
    function (button, index) {

        button.addEventListener(
            "click",
            function () {

                checkAnswer(index);

            }
        );

    }
);


/* =================================
   CHECK ANSWER
================================= */

function checkAnswer(
    selectedAnswer
) {

    const current =
        questions[currentQuestion];


    const correctAnswer =
        current.correct;


    /*
        Disable all answers
        so she cannot click twice.
    */

    answerButtons.forEach(
        function (button) {

            button.disabled =
                true;

        }
    );


    /* =================================
       CORRECT
    ================================== */

    if (
        selectedAnswer ===
        correctAnswer
    ) {

        score++;


        scoreDisplay.textContent =
            score;


        answerButtons[
            selectedAnswer
        ].classList.add(
            "correct"
        );


        correctSound.currentTime =
            0;

        correctSound.volume =
            0.7;


        correctSound.play()
            .catch(function () {

                console.log(
                    "Correct sound unavailable."
                );

            });


        feedback.textContent =
            "Correct! You know me so well! 🥰❤️";

    }


    /* =================================
       WRONG
    ================================== */

    else {

        answerButtons[
            selectedAnswer
        ].classList.add(
            "wrong"
        );


        answerButtons[
            correctAnswer
        ].classList.add(
            "correct"
        );


        wrongSound.currentTime =
            0;

        wrongSound.volume =
            0.5;


        wrongSound.play()
            .catch(function () {

                console.log(
                    "Wrong sound unavailable."
                );

            });


        feedback.textContent =
            "Aww, that's okay! I still love you. 💕";

    }


    /* =================================
       NEXT QUESTION
    ================================= */

    setTimeout(
        function () {

            currentQuestion++;


            if (
                currentQuestion
                <
                questions.length
            ) {

                showQuestion();

            }

            else {

                showResults();

            }

        },

        1300
    );

}


/* =================================
   SHOW RESULTS
================================= */

function showResults() {

    quizScreen.style.display =
        "none";

    resultScreen.style.display =
        "flex";


    finalScore.textContent =
        score;


    /* =================================
       PERFECT SCORE
    ================================== */

    if (score === 10) {

        resultHeart.textContent =
            "💖";


        resultTitle.textContent =
            "PERFECT! 🥰";


        resultMessage.textContent =
            "You know me better than anyone! You're definitely my favorite person. ❤️";

    }


    /* =================================
       7 - 9
    ================================== */

    else if (score >= 7) {

        resultHeart.textContent =
            "💕";


        resultTitle.textContent =
            "Amazing! 💕";


        resultMessage.textContent =
            "You really know me well! I think you deserve a big hug. 🥰";

    }


    /* =================================
       5 - 6
    ================================== */

    else if (score >= 5) {

        resultHeart.textContent =
            "💗";


        resultTitle.textContent =
            "Not Bad! 😘";


        resultMessage.textContent =
            "Looks like we need to spend more time together! ❤️";

    }


    /* =================================
       0 - 4
    ================================== */

    else {

        resultHeart.textContent =
            "🥺";


        resultTitle.textContent =
            "Aww... 😭";


        resultMessage.textContent =
            "I guess we need a lot more dates together! Good thing I love spending time with you. ❤️";

    }

}


/* =================================
   PLAY AGAIN
================================= */

playAgainButton.addEventListener(
    "click",
    function () {

        resultScreen.style.display =
            "none";

        quizScreen.style.display =
            "flex";


        currentQuestion = 0;

        score = 0;


        scoreDisplay.textContent =
            score;


        showQuestion();

    }
);