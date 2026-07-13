alert("APPX VERSION TEST");

const studentName = prompt('Enter your name:') || 'Guest';

document.getElementById('student').textContent =
  `Student: ${studentName}`;

let questions = [];
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

fetch('questions.json')
  .then((response) => response.json())
  .then((data) => {
    questions = data;

    loadQuestion();
  })
  .catch((error) => {
    console.error('Error loading questions:', error);
  });

// Track progress

// Display a question
function loadQuestion() {
  const q = questions[currentQuestion];

  document.getElementById('question').innerHTML =
    `<h2>${q.question}</h2>`;

  const answersDiv = document.getElementById('answers');

  answersDiv.innerHTML = '';

  q.answers.forEach((answer, index) => {
    const btn = document.createElement('button');

    btn.textContent = answer;

    btn.addEventListener('click', function () {
      checkAnswer(index);
    });

    answersDiv.appendChild(btn);
  });
}

// Check answer
function checkAnswer(selectedAnswer) {
  const q = questions[currentQuestion];

  if (selectedAnswer === q.correct) {
    score++;

    // alert("Correct!");
    document.getElementById('feedback').innerHTML =
      `<h3>Correct Response</h3>`;

    const buttons = document.querySelectorAll('#answers button');

    const correctButton = buttons[q.correct];
    correctButton.style.backgroundColor = '#f4ffdd';
    correctButton.style.color = '#010101';

    buttons.forEach((button) => {
      button.disabled = true;
    });
  } else {
    // alert("Incorrect!");
    document.getElementById('feedback').innerHTML =
      `<h3>Try again</h3>`;

    incorrectAnswers.push({
      questionNumber: currentQuestion + 1,
      question: q.question,
      selectedAnswer: q.answers[selectedAnswer],
      correctAnswer: q.answers[q.correct],
    });
  }

  document.getElementById('score').textContent = score;

  async function getFeedback(item) {

    return `
        The correct answer is:
        ${item.correctAnswer}

        Review this concept and try again.
    `;
}
}

// Next button
document
  .getElementById('nextBtn')
  .addEventListener('click', function () {

    currentQuestion++;

    console.log(
      "currentQuestion:",
      currentQuestion
    );

    console.log(
      "questions.length:",
      questions.length
    );

    if (currentQuestion < questions.length) {

      console.log("Loading next question");

      loadQuestion();

    } else {

      alert("Reached ELSE");

      showResults();
    }

  });

// Show final result

function showResults() {
  alert("showResults called");
  console.log("showResults called");

console.log("incorrectAnswers =", incorrectAnswers);

console.log(
    "incorrectAnswers.length =",
    incorrectAnswers.length
);
//--------------------------
  let results =
    JSON.parse(localStorage.getItem('results')) || [];

  results.push({
    name: studentName,
    score: score,
  });

  localStorage.setItem(
    'results',
    JSON.stringify(results)
  );

  let feedbackHtml = '';

  incorrectAnswers.forEach(item => {

    feedbackHtml += `
      <div class="feedback">

        <h3>${item.question}</h3>

        <p>
          <strong>Your Answer:</strong>
          ${item.selectedAnswer}
        </p>

        <p>
          <strong>Correct Answer:</strong>
          ${item.correctAnswer}
        </p>

      </div>

      <hr>
    `;
  });

  document.body.innerHTML = `

    <div style="text-align:left; padding:80px;">

    <img src="image/qCodeSymTrans.png" alt="Quiz Logo" class="logo">

      <h1>Quiz Completed</h1>

      <h2>${studentName}</h2>

      <h2>
        Final Score:
        ${score}/${questions.length}
      </h2>

      <h2>Review Your Incorrect Answers</h2>

      ${feedbackHtml}

    </div>

  `;
}
// Start quiz
// Modified 13/07/2026
