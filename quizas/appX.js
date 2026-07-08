const studentName = prompt('Enter your name:') || 'Guest';

document.getElementById('student').textContent =
  `Student: ${studentName}`;

let questions = [];
let currentQuestion = 0;
let score = 0;

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
    correctButton.style.backgroundColor = "#f4ffdd";
    correctButton.style.color = "#010101";

    buttons.forEach((button) => {
      button.disabled = true;
    });
  } else {
    // alert("Incorrect!");
    document.getElementById('feedback').innerHTML =
      `<h3>Try again</h3>`;
  }

  document.getElementById('score').textContent = score;
}

// Next button
document
  .getElementById('nextBtn')
  .addEventListener('click', function () {
    currentQuestion++;

    document.getElementById('feedback').innerHTML = `<h3>&nbsp;</h3>`;

    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  });

// Show final result
function showResults() {
  // Save result locally
  let results = JSON.parse(localStorage.getItem('results')) || [];

  results.push({
    name: studentName,
    score: score,
  });

  localStorage.setItem('results', JSON.stringify(results));

  document.body.innerHTML = `
        <div style="text-align:center; padding:40px;">
            <h1>Quiz Complete</h1>
            <h2>${studentName}</h2>
            <h2>Final Score: ${score}/${questions.length}</h2>
            <img src="image/qCLogo.png" alt="Our Logo" class = "logo"></img>
            </div>
    `;
}
// Start quiz
// loadQuestion();
