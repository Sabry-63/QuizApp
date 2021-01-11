// Select Elements
let countSpan = document.querySelector(".cuont span");
let bulletsSpan = document.querySelector(".bulltes");
let bulletsSpanContainer = document.querySelector(".bulltes .spans");
let quizArea = document.querySelector(".quiz-area");
let answerArea = document.querySelector(".answer-area");
let category = document.querySelector(".category span");
let yourName = document.querySelector(".name span");
let btnSubmit = document.querySelector(".btnSubmit");
let results = document.querySelector(".results");
let countdownContainer = document.querySelector(".countdwon");

// Get API
let url = JSON.parse(localStorage.getItem("URL"));

// Set Options
let currentIndex = 0;
let rightAnswers = 0;
let conutdownInterval;

// Get Options
let time = JSON.parse(localStorage.getItem("time"));
let userName = JSON.parse(localStorage.getItem("name"));

// Get Questions
function getQuestions() {
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // Get Api
            let questionObj = JSON.parse(this.responseText).results;
            let qCount = questionObj.length;

            // Set Your Name
            yourName.innerHTML = userName;

            // Set Category
            category.innerHTML = questionObj[currentIndex].category;

            // Create Bullets and Set Question Count
            createBullets(qCount);

            // Add Questions Data
            addQuestionDate(questionObj[currentIndex], qCount);

            // Start Tieme
            countdown(time, qCount);

            // Click Go To Next Question
            btnSubmit.onclick = () => {
                // The Right Answer
                let rightAnswer = questionObj[currentIndex].correct_answer;
                // Next Question
                currentIndex++;

                // Remove Old Answer
                quizArea.innerHTML = "";
                answerArea.innerHTML = "";

                // Create Answers
                addQuestionDate(questionObj[currentIndex], qCount);

                // Handle Bullets Class
                handleBullets();

                // Start Tieme
                clearInterval(conutdownInterval);
                countdown(time, qCount);

                // Check
                checkedAnswer(rightAnswer);

                // Show Results
                showResults(qCount);
            };
        }
    };

    myRequest.open("GET", url, true);
    myRequest.send();
}

// Check The Api
if (url) {
    getQuestions();
}

// Create Bullets
function createBullets(num) {
    countSpan.innerHTML = num;

    // Create Span
    for (i = 0; i < num; i++) {
        // Create Bullets
        let theBullets = document.createElement("span");
        // Check Ist First Span
        if (i === 0) {
            theBullets.className = "on";
        }
        // Apend The Bullet To Main Bullet Container
        bulletsSpanContainer.appendChild(theBullets);
    }
}

// Add Question Date
let arr;
function addQuestionDate(obj, qcount) {
    if (currentIndex < qcount) {
        // All Answers
        arr = [...obj.incorrect_answers, obj.correct_answer];

        // Set Title Answer
        quizArea.innerHTML = `<h2>${obj.question}</h2>`;

        // Start Shuffle
        shuffle(arr);

        // Set Chiise Answer
        for (i = 0; i < arr.length; i++) {
            answerArea.innerHTML += `<div class="answer">
        <input type="radio" name="questions" id="${arr[i]}" />
        <label for="${arr[i]}">${arr[i]}</label>
    </div>`;
        }

        checkedAnswer(obj.correct_answer);
    }
}

// Shuffle Answer
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Set Class Active On Spans
function handleBullets() {
    // Get All Spans
    let allSpans = document.querySelectorAll(".bulltes .spans span");
    let arryOfSpans = Array.from(allSpans);

    // Add Class On
    arryOfSpans.forEach((span, index) => {
        if (currentIndex === index) {
            span.className = "on";
        }
    });
}

// Check Your Answer
function checkedAnswer(rAnswer) {
    // Select The Questions and Answers
    let answers = document.getElementsByName("questions");

    answers.forEach((item) => {
        item.addEventListener("change", () => {
            // Checked The Answer
            if (item.id === rAnswer) {
                rightAnswers++;
            }
        });
    });
}

// Show Your Resultes
function showResults(qCount) {
    if (currentIndex === qCount) {
        // Remove All Data
        quizArea.remove();
        answerArea.remove();
        btnSubmit.remove();
        bulletsSpan.remove();

        // Add Style
        results.classList.add("styleResults");

        // Checked Your Answers
        if (rightAnswers > qCount / 2 && rightAnswers < qCount) {
            results.innerHTML = `${userName} You\`re A<span class="good"> Good</span> You Answerd ${rightAnswers} From ${qCount}`;
        } else if (rightAnswers === qCount) {
            results.innerHTML = `${userName} You\`re A <span class="perfect"> Perfect</span> You Answerd ${rightAnswers} From ${qCount}`;
        } else {
            results.innerHTML = `${userName} <span class="bad"> Sorry Try Again</span> You Answerd ${rightAnswers} From ${qCount}`;
        }
    }
}

// Countdown Timer
function countdown(time, qcount) {
    if (currentIndex < qcount) {
        let minutes, seconds;
        conutdownInterval = setInterval(() => {
            // Set Minutes
            minutes = parseInt(time / 60);

            // Set Seconds
            seconds = parseInt(time % 60);

            // Add 0 After The Timer
            countdownContainer.innerHTML = `${minutes < 10 ? "0" + minutes : minutes} : ${seconds < 10 ? "0" + seconds : seconds}`;

            // Timer Down
            if (--time < 0) {
                // Stop Timer
                clearInterval(conutdownInterval);

                // Clicked Btn
                btnSubmit.click();
            }
        }, 1000);
    }
}
