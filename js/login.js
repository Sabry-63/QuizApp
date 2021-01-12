// Select Elemets
let categorySelect = document.getElementById("categorySelect");
let difficultySelect = document.getElementById("difficultySelect");
let typeSelect = document.getElementById("typeSelect");
let amount = document.getElementById("amount");
let userName = document.getElementById("name");
let startQuiz = document.getElementById("startQuiz");

// Get Difficulty Value
let dSelect;
let time;
difficultySelect.addEventListener("change", () => {
    dSelect = difficultySelect.value;

    switch (difficultySelect.value) {
        case "easy":
            time = 45;
            break;
        case "medium":
            time = 60;
            break;
        case "hard":
            time = 90;
            break;
        default:
            break;
    }
    localStorage.setItem("time", JSON.stringify(time));
});

// Get Category Value
let cSelect;
categorySelect.addEventListener("change", () => {
    cSelect = categorySelect.value;
});

let tSelect;
typeSelect.addEventListener("change", () => {
    tSelect = typeSelect.value;
    console.log(tSelect);
});

// Start Quiz
startQuiz.addEventListener("click", () => {
    // Check Inputs Not Empty
    if (amount.value != "" && userName.value != "" && cSelect != undefined && dSelect != undefined) {
        // Check Amount Questions
        if (amount.value >= 5 && amount.value <= 20) {
            // Set Url
            let url = ` https://opentdb.com/api.php?amount=${amount.value}&category=${cSelect}&difficulty=${dSelect}&type=${tSelect}`;
            localStorage.setItem("URL", JSON.stringify(url));
            localStorage.setItem("name", JSON.stringify(userName.value));

            // Empty Values & Go to Quiz
            setTimeout(() => {
                amount.value = "";
                userName.value = "";
                difficultySelect.value = "";
                categorySelect.value = "";
                typeSelect.value = "";
                window.location = "quiz.html";
            }, 1000);
        } else {
            // Show Massage Is Val
            alert("Min Value Is 5 && Max Value Is 20");
        }
    } else {
        // Show Massage Is Val Empty
        alert("Enter All Data");
    }
});
