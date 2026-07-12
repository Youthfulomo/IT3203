// Find the quiz form
const quizForm = document.getElementById("quizForm");

// Find the results section
const results = document.getElementById("results");

// Run this when the quiz is submitted
quizForm.addEventListener("submit", function(event) {

    // Stop the page from refreshing
    event.preventDefault();

    // Starting score
    let score = 0;

    // Total questions
    const totalQuestions = 5;

    // Store question results
    let resultText = "";

    // Question 1 answer
    const q1Answer = document.getElementById("q1").value.trim().toLowerCase();

    // Check question 1
    if (q1Answer === "hypertext transfer protocol") {
        score++;

        resultText += `
            <div class="correct">
                <h3>Question 1: Correct</h3>
                <p>Score: 1 out of 1</p>
                <p>Correct Answer: HyperText Transfer Protocol</p>
            </div>
        `;
    } else {
        resultText += `
            <div class="incorrect">
                <h3>Question 1: Incorrect</h3>
                <p>Score: 0 out of 1</p>
                <p>Your Answer: ${q1Answer || "No answer"}</p>
                <p>Correct Answer: HyperText Transfer Protocol</p>
            </div>
        `;
    }

    // Question 2 answer
    const q2Choice = document.querySelector('input[name="q2"]:checked');

    // Check question 2
    if (q2Choice && q2Choice.value === "A") {
        score++;

        resultText += `
            <div class="correct">
                <h3>Question 2: Correct</h3>
                <p>Score: 1 out of 1</p>
                <p>Correct Answer: Client and Server</p>
            </div>
        `;
    } else {
        resultText += `
            <div class="incorrect">
                <h3>Question 2: Incorrect</h3>
                <p>Score: 0 out of 1</p>
                <p>Your Answer: ${getRadioAnswer("q2")}</p>
                <p>Correct Answer: Client and Server</p>
            </div>
        `;
    }

    // Question 3 answer
    const q3Choice = document.querySelector('input[name="q3"]:checked');

    // Check question 3
    if (q3Choice && q3Choice.value === "C") {
        score++;

        resultText += `
            <div class="correct">
                <h3>Question 3: Correct</h3>
                <p>Score: 1 out of 1</p>
                <p>Correct Answer: HTTP/3</p>
            </div>
        `;
    } else {
        resultText += `
            <div class="incorrect">
                <h3>Question 3: Incorrect</h3>
                <p>Score: 0 out of 1</p>
                <p>Your Answer: ${getRadioAnswer("q3")}</p>
                <p>Correct Answer: HTTP/3</p>
            </div>
        `;
    }

    // Question 4 answer
    const q4Choice = document.querySelector('input[name="q4"]:checked');

    // Check question 4
    if (q4Choice && q4Choice.value === "A") {
        score++;

        resultText += `
            <div class="correct">
                <h3>Question 4: Correct</h3>
                <p>Score: 1 out of 1</p>
                <p>Correct Answer: Sends requests</p>
            </div>
        `;
    } else {
        resultText += `
            <div class="incorrect">
                <h3>Question 4: Incorrect</h3>
                <p>Score: 0 out of 1</p>
                <p>Your Answer: ${getRadioAnswer("q4")}</p>
                <p>Correct Answer: Sends requests</p>
            </div>
        `;
    }

    // Get all checked answers for question 5
    const q5Choices = document.querySelectorAll('input[name="q5"]:checked');

    // Put selected values into an array
    const q5Answers = [];

    q5Choices.forEach(function(choice) {
        q5Answers.push(choice.value);
    });

    // Question 5 is correct only if A and B are selected
    const q5Correct =
        q5Answers.length === 2 &&
        q5Answers.includes("A") &&
        q5Answers.includes("B");

    // Check question 5
    if (q5Correct) {
        score++;

        resultText += `
            <div class="correct">
                <h3>Question 5: Correct</h3>
                <p>Score: 1 out of 1</p>
                <p>Correct Answers: Multiplexing and Header Compression</p>
            </div>
        `;
    } else {
        resultText += `
            <div class="incorrect">
                <h3>Question 5: Incorrect</h3>
                <p>Score: 0 out of 1</p>
                <p>Your Answers: ${getCheckboxAnswers()}</p>
                <p>Correct Answers: Multiplexing and Header Compression</p>
            </div>
        `;
    }

    // Calculate percentage
    const percentage = Math.round((score / totalQuestions) * 100);

    // Decide pass or fail
    let finalResult = "";

    if (percentage >= 70) {
        finalResult = `
            <div class="pass">
                <h2>Pass</h2>
                <p>Total Score: ${score} out of ${totalQuestions}</p>
                <p>Percentage: ${percentage}%</p>
            </div>
        `;
    } else {
        finalResult = `
            <div class="fail">
                <h2>Fail</h2>
                <p>Total Score: ${score} out of ${totalQuestions}</p>
                <p>Percentage: ${percentage}%</p>
            </div>
        `;
    }

    // Display final result and each question result
    results.innerHTML = finalResult + resultText;
});


// Get the text for a selected radio answer
function getRadioAnswer(questionName) {

    const selectedAnswer = document.querySelector(
        `input[name="${questionName}"]:checked`
    );

    if (!selectedAnswer) {
        return "No answer";
    }

    const label = document.querySelector(
        `label[for="${selectedAnswer.id}"]`
    );

    return label.textContent;
}


// Get the text for selected checkbox answers
function getCheckboxAnswers() {

    const selectedAnswers = document.querySelectorAll(
        'input[name="q5"]:checked'
    );

    if (selectedAnswers.length === 0) {
        return "No answer";
    }

    const answerText = [];

    selectedAnswers.forEach(function(answer) {

        const label = document.querySelector(
            `label[for="${answer.id}"]`
        );

        answerText.push(label.textContent);
    });

    return answerText.join(", ");
}


// Clear results when reset is clicked
quizForm.addEventListener("reset", function() {

    results.innerHTML = "";
});
