// Define the quiz questions and answers
const quizQuestions = [
  {
    question: "What does HTML stand for?",
    choices: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "None of the above"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "What does CSS stand for?",
    choices: [ "Colorful Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Cascading Style Sheets",],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What does JS stand for?",
    choices: [ "JavaSuper", "JavaScript", "JustScript", "None of the above"],
    answer: "JavaScript"
  }
];

// Define other constants and variables
const quizContainer = document.getElementById("quiz-container");
const quiz = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const startButton = document.getElementById("start");
const gameOverContainer = document.getElementById("game-over-container");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit");
const highScoresList = document.createElement("ul");
highScoresList.setAttribute("id", "high-scores-list");
const highScoresContainer = document.createElement("div");
highScoresContainer.setAttribute("id", "high-scores-container");
highScoresContainer.appendChild(highScoresList);
quizContainer.insertAdjacentElement("afterend", highScoresContainer);
let currentQuestionIndex = 0;
let score = 0;
let time = 60;
let timerInterval;

// Function to start the quiz
function startQuiz() {
  // Hide the start container and show the quiz container
  quizContainer.style.display = "block";
  document.getElementById("start-container").style.display = "none";

  // Start the timer
  startTimer();

  // Display the first question
  displayQuestion();
}
// Function to display a question
function displayQuestion() {
  // Get the current question object
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Display the question and choices
  questionElement.textContent = currentQuestion.question;
  choicesElement.innerHTML = "";
  for (let i = 0; i < currentQuestion.choices.length; i++) {
    const choice = currentQuestion.choices[i];
    const button = document.createElement("button");
    button.textContent = choice;
    button.addEventListener("click", function() {
      // Check if the answer is correct
      if (choice === currentQuestion.answer) {
        score++;
        scoreElement.textContent = score;
      } else {
        time -= 10;
        if (time < 0) {
          time = 0;
        }
        timeElement.textContent = formatTime(time);
      }
      // Go to the next question or end the quiz
      currentQuestionIndex++;
      if (currentQuestionIndex < quizQuestions.length && time > 0) {
        displayQuestion();
      } else {
        endQuiz();
      }
    });
    choicesElement.appendChild(button);
  }
}
// Function to start the timer
function startTimer() {
  timeElement.textContent = formatTime(time);
  timerInterval = setInterval(function() {
    time--;
    if (time < 0) {
      time = 0;
      endQuiz();
    }
    timeElement.textContent = formatTime(time);
  }, 1000);
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);
  quizContainer.style.display = "none";
  gameOverContainer.style.display = "block";
}

// Function to format the time as mm:ss
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
}

// Function to handle the submission of the score
function handleScoreSubmission(event) {
  event.preventDefault();

// Get the initials and save the score
const initials = initialsInput.value.trim().toUpperCase();
if (initials.length > 0) {
  const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
  highScores.push({ initials, score });
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(10);
  localStorage.setItem("highScores", JSON.stringify(highScores));
}
// Display the high scores
displayHighScores();

// Reset the quiz
currentQuestionIndex = 0;
  score = 0;
  time = 60;
  scoreElement.textContent = score;
  timeElement.textContent = formatTime(time);
  gameOverContainer.style.display = "none";
  document.getElementById("start-container").style.display = "block";
}

// Function to display the high scores

// Add event listeners
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", handleScoreSubmission);


