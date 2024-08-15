let questions = [];
let currentQuestionIndex = 0;
let userStats = { easy: 0, medium: 0, hard: 0 };


fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        showQuestion();
        updateStats();
    })
    .catch(error => console.error('Error loading questions:', error));

function showQuestion() {
    if (questions.length === 0) return;

    const question = questions[currentQuestionIndex];
    document.getElementById('question-title').textContent = question.title;
    document.getElementById('question-difficulty').textContent = `Difficulty: ${question.difficulty}`;
    document.getElementById('question-link').href = question.url;
    
   
    question.startTime = new Date();
}

function nextQuestion() {
    const question = questions[currentQuestionIndex];
    const now = new Date();
    
 
    const solvingTimeInput = document.getElementById('solving-time');
    const timeTaken = parseFloat(solvingTimeInput.value);
    
    if (isNaN(timeTaken) || timeTaken <= 0) {
        alert("Please enter a valid solving time.");
        return;
    }
    
   
    if (timeTaken <= 5) {
        question.difficulty = "Easy";
    } else if (timeTaken <= 15) {
        question.difficulty = "Medium";
    } else {
        question.difficulty = "Hard";
    }
    
 
    userStats[question.difficulty.toLowerCase()]++;
    

    updateSpacedRepetition(question, timeTaken);
    

    chooseNextQuestion();
    

    showQuestion();
    

    updateStats();
    
  
    solvingTimeInput.value = "";
}

function updateSpacedRepetition(question, timeTaken) {
    const now = new Date();
    const daysSinceLastReview = (now - new Date(question.lastReviewedAt)) / (1000 * 3600 * 24);
    
 
    if (timeTaken <= 5) {
        question.easinessFactor += 0.1;
    } else if (timeTaken <= 15) {
      
    } else {
        question.easinessFactor -= 0.15;
    }
    
  
    question.easinessFactor = Math.max(1.3, question.easinessFactor);
    

    if (daysSinceLastReview >= question.interval) {
        if (question.repetitions === 0) {
            question.interval = 1;
        } else if (question.repetitions === 1) {
            question.interval = 6;
        } else {
            question.interval = Math.round(question.interval * question.easinessFactor);
        }
        question.repetitions++;
        question.lastReviewedAt = now.toISOString();
    }
}

function chooseNextQuestion() {
    const easyPreference = parseInt(document.getElementById('easy-preference').value) / 100;
    const mediumPreference = parseInt(document.getElementById('medium-preference').value) / 100;
    const hardPreference = parseInt(document.getElementById('hard-preference').value) / 100;
    
    const random = Math.random();
    let targetDifficulty;
    
    if (random < easyPreference) {
        targetDifficulty = "Easy";
    } else if (random < easyPreference + mediumPreference) {
        targetDifficulty = "Medium";
    } else {
        targetDifficulty = "Hard";
    }
    
    const eligibleQuestions = questions.filter(q => 
        q.difficulty === targetDifficulty && 
        (new Date() - new Date(q.lastReviewedAt)) / (1000 * 3600 * 24) >= q.interval
    );
    
    if (eligibleQuestions.length > 0) {
        currentQuestionIndex = questions.indexOf(eligibleQuestions[Math.floor(Math.random() * eligibleQuestions.length)]);
    } else {
       
        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    }
}

function updateStats() {
    document.getElementById('easy-count').textContent = userStats.easy;
    document.getElementById('medium-count').textContent = userStats.medium;
    document.getElementById('hard-count').textContent = userStats.hard;
}

document.getElementById('next-question').addEventListener('click', nextQuestion);


['easy', 'medium', 'hard'].forEach(difficulty => {
    const slider = document.getElementById(`${difficulty}-preference`);
    const display = document.getElementById(`${difficulty}-preference-value`);
    slider.addEventListener('input', () => {
        display.textContent = slider.value + '%';
    });
});