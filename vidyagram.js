const categories = {
  "Mathematics": [
    { question: "What is 5 + 7?", options: ["10", "11", "12", "13"], answer: 2 },
    { question: "What is the square root of 81?", options: ["7", "9", "8", "6"], answer: 1 },
    { question: "2 × 6 = ?", options: ["12", "18", "14", "16"], answer: 0 },
    { question: "What is 15 ÷ 3?", options: ["4", "5", "6", "3"], answer: 1 }
  ],
  "Science": [
    { question: "Water freezes at what temperature in Celsius?", options: ["0°C", "100°C", "32°C", "10°C"], answer: 0 },
    { question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: 1 },
    { question: "Which gas do plants absorb for photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: 1 },
    { question: "What is the chemical symbol for gold?", options: ["Ag", "Au", "Pb", "Fe"], answer: 1 }
  ],
  "English Language": [
    { question: "Choose the correct synonym for 'Happy'.", options: ["Sad", "Elated", "Angry", "Tired"], answer: 1 },
    { question: "What is the past tense of 'go'?", options: ["Went", "Gone", "Goed", "Going"], answer: 0 },
    { question: "Which word is a noun?", options: ["Run", "Blue", "Happiness", "Quickly"], answer: 2 },
    { question: "Pick the correct article: ___ apple", options: ["a", "an", "the", "no article"], answer: 1 }
  ],
  "General Knowledge": [
    { question: "What is the capital city of France?", options: ["London", "Paris", "Berlin", "Rome"], answer: 1 },
    { question: "Which ocean is the largest?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], answer: 1 },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], answer: 1 },
    { question: "Which animal is the largest land mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], answer: 0 }
  ]
};

// State variables
let selectedCategory = null;
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOptionIndex = null;
let feedbackTimeout = null;

const categorySection = document.getElementById('category-section');
const gameSection = document.getElementById('game-section');
const scoreSection = document.getElementById('score-section');
const questionNumberElem = document.getElementById('question-number');
const questionTextElem = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const submitBtn = document.getElementById('submit-btn');
const feedbackEmojiElem = document.getElementById('feedback-emoji');
const scoreTextElem = document.getElementById('score-text');
const restartBtn = document.getElementById('restart-btn');

function initCategories() {
  categorySection.innerHTML = '<h2>Select a Category</h2>';
  const categoryKeys = Object.keys(categories);
  categoryKeys.forEach(category => {
    const btn = document.createElement('button');
    btn.className = 'category-btn';
    btn.textContent = category;
    btn.addEventListener('click', () => startGame(category));
    categorySection.appendChild(btn);
  });
  categorySection.style.display = 'flex';
  gameSection.style.display = 'none';
  scoreSection.style.display = 'none';
}

function startGame(category) {
  selectedCategory = category;
  questions = [...categories[category]];
  currentQuestionIndex = 0;
  score = 0;
  selectedOptionIndex = null;

  categorySection.style.display = 'none';
  gameSection.style.display = 'flex';
  scoreSection.style.display = 'none';

  loadQuestion();
}

function loadQuestion() {
  clearFeedback();

  const questionObj = questions[currentQuestionIndex];
  questionNumberElem.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionTextElem.textContent = questionObj.question;

  optionsContainer.innerHTML = '';
  questionObj.options.forEach((opt, index) => {
    const optionBtn = document.createElement('button');
    optionBtn.className = 'option-btn';
    optionBtn.textContent = opt;
    optionBtn.type = 'button';
    optionBtn.addEventListener('click', () => selectOption(index));
    optionsContainer.appendChild(optionBtn);
  });

  selectedOptionIndex = null;
  updateSubmitButton();
}

function selectOption(index) {
  selectedOptionIndex = index;
  const children = optionsContainer.children;
  for(let i=0; i<children.length; i++){
    children[i].classList.toggle('selected', i === selectedOptionIndex);
  }
  updateSubmitButton();
}

function updateSubmitButton() {
  submitBtn.disabled = selectedOptionIndex === null;
}

function showFeedback(isCorrect) {
  feedbackEmojiElem.textContent = isCorrect ? '👏' : '😞';
}

function clearFeedback() {
  feedbackEmojiElem.textContent = '';
  if(feedbackTimeout){
    clearTimeout(feedbackTimeout);
    feedbackTimeout = null;
  }
}

function submitAnswer() {
  if(selectedOptionIndex === null) return;
  submitBtn.disabled = true;

  const correctIndex = questions[currentQuestionIndex].answer;
  const isCorrect = selectedOptionIndex === correctIndex;
  if(isCorrect) score++;

  showFeedback(isCorrect);

  const children = optionsContainer.children;
  for(let i=0; i<children.length; i++){
    children[i].disabled = true;
  }

  feedbackTimeout = setTimeout(() => {
    clearFeedback();
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
      loadQuestion();
      submitBtn.disabled = true;
    } else {
      showScore();
    }
  }, 1500);
}

function showScore() {
  gameSection.style.display = 'none';
  scoreSection.style.display = 'flex';
  scoreTextElem.textContent = `You scored ${score} out of ${questions.length} in "${selectedCategory}" category.`;
}

function restartGame() {
  initCategories();
}

submitBtn.addEventListener('click', submitAnswer);
restartBtn.addEventListener('click', restartGame);

initCategories();
