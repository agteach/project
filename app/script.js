 
        
        const questionBanks = {
            general: [
                {
                    question: "In which year did the Prophet Muhammad (PBUH) migrate to Medina?",
                    answers: [
                        { text: "610 CE", correct: false },
                        { text: "622 CE", correct: true },
                        { text: "630 CE", correct: false },
                        { text: "632 CE", correct: false }
                    ],
                    hint: "This year marks the beginning of the Islamic calendar."
                },
                {
                    question: "Who was the first caliph after Prophet Muhammad (PBUH)?",
                    answers: [
                        { text: "Umar ibn Al-Khattab", correct: false },
                        { text: "Abu Bakr As-Siddiq", correct: true },
                        { text: "Uthman ibn Affan", correct: false },
                        { text: "Ali ibn Abi Talib", correct: false }
                    ],
                    hint: "He was known as 'The Truthful' and was a close companion of the Prophet."
                },
                {
                    question: "Which battle is known as the Conquest of Mecca?",
                    answers: [
                        { text: "Battle of Badr", correct: false },
                        { text: "Battle of Uhud", correct: false },
                        { text: "Battle of the Trench", correct: false },
                        { text: "Conquest of Mecca", correct: true }
                    ],
                    hint: "This event occurred in 8 AH and resulted in the peaceful takeover of Mecca."
                },
                {
                    question: "Where was the first Islamic capital located?",
                    answers: [
                        { text: "Mecca", correct: false },
                        { text: "Medina", correct: true },
                        { text: "Damascus", correct: false },
                        { text: "Baghdad", correct: false }
                    ],
                    hint: "The city where the Prophet Muhammad (PBUH) migrated to."
                },
                {
                    question: "Which caliph established the House of Wisdom in Baghdad?",
                    answers: [
                        { text: "Harun al-Rashid", correct: false },
                        { text: "Al-Ma'mun", correct: true },
                        { text: "Al-Mansur", correct: false },
                        { text: "Al-Mu'tasim", correct: false }
                    ],
                    hint: "He was the seventh Abbasid caliph and promoted the translation of Greek works."
                },
                {
                    question: "What is the name of the treaty signed between Muslims and Meccans?",
                    answers: [
                        { text: "Treaty of Hudaybiyyah", correct: true },
                        { text: "Treaty of Medina", correct: false },
                        { text: "Treaty of Mecca", correct: false },
                        { text: "Treaty of Aqabah", correct: false }
                    ],
                    hint: "This treaty was signed in 6 AH and allowed for peaceful relations between Muslims and Meccans."
                },
                {
                    question: "Who was the first female martyr in Islam?",
                    answers: [
                        { text: "Khadijah bint Khuwaylid", correct: false },
                        { text: "Aisha bint Abi Bakr", correct: false },
                        { text: "Sumayyah bint Khayyat", correct: true },
                        { text: "Fatimah bint Muhammad", correct: false }
                    ],
                    hint: "She was among the early converts to Islam and was persecuted for her faith."
                },
                {
                    question: "Which battle is referred to as 'The Furqan' (Criterion) in the Quran?",
                    answers: [
                        { text: "Battle of Uhud", correct: false },
                        { text: "Battle of Badr", correct: true },
                        { text: "Battle of the Trench", correct: false },
                        { text: "Battle of Hunayn", correct: false }
                    ],
                    hint: "This was the first major battle between Muslims and the Quraysh of Mecca."
                }
            ],
            prophets: [
                {
                    question: "Which prophet is known for building the Ark?",
                    answers: [
                        { text: "Prophet Ibrahim (AS)", correct: false },
                        { text: "Prophet Musa (AS)", correct: false },
                        { text: "Prophet Nuh (AS)", correct: true },
                        { text: "Prophet Lut (AS)", correct: false }
                    ],
                    hint: "He was sent to his people who were engaged in idol worship."
                },
                {
                    question: "Which prophet is known as 'Khalilullah' (Friend of Allah)?",
                    answers: [
                        { text: "Prophet Ibrahim (AS)", correct: true },
                        { text: "Prophet Musa (AS)", correct: false },
                        { text: "Prophet Isa (AS)", correct: false },
                        { text: "Prophet Muhammad (PBUH)", correct: false }
                    ],
                    hint: "He is known for his unwavering faith and for rebuilding the Kaaba."
                }
            ],
            civilization: [
                {question: "Which Islamic empire was known for its architectural marvels like the Taj Mahal?",
                    answers: [
                        { text: "Ottoman Empire", correct: false },
                        { text: "Mughal Empire", correct: true },
                        { text: "Abbasid Caliphate", correct: false },
                        { text: "Umayyad Caliphate", correct: false }
                    ],
                    hint: "This empire ruled the Indian subcontinent for centuries."
                },
                {
                    question: "Which famous Islamic scholar is known as the 'Father of Sociology'?",
                    answers: [
                        { text: "Al-Farabi", correct: false },
                        { text: "Ibn Khaldun", correct: true },
                        { text: "Al-Ghazali", correct: false },
                        { text: "Ibn Sina", correct: false }
                    ],
                    hint: "He is famous for his work 'Muqaddimah' and theory of social cohesion."
                }
            ]
        };

        const questionElement = document.getElementById("question");
        const answerButtons = document.getElementById("answer-buttons");
        const nextButton = document.getElementById("next-btn");
        const hintButton = document.getElementById("hint-btn");
        const hintContainer = document.getElementById("hint-container");
        const hintText = document.getElementById("hint-text");
        const progressBar = document.getElementById("progress-bar");
        const questionNumberElement = document.getElementById("question-number");
        const scoreElement = document.getElementById("score");
        const timerElement = document.getElementById("timer");
        const categoryButtons = document.querySelectorAll(".category-btn");

        let currentQuestionIndex = 0;
        let score = 0;
        let timer;
        let timeLeft = 60;
        let currentQuestions = questionBanks.general;

        // Set up category selection
        categoryButtons.forEach(button => {
            button.addEventListener("click", () => {
                const category = button.dataset.category;
                
                // Update active button
                categoryButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                
                // Change question set
                currentQuestions = questionBanks[category];
                
                // Restart quiz with new category
                startQuiz();
            });
        });

        function startQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            nextButton.innerHTML = "Next";
            scoreElement.textContent = score;
            showQuestion();
            updateProgressBar();
            function startQuiz() {
    // Remove any previous score message
    const oldMessage = document.querySelector("#question + p");
    if (oldMessage) {
        oldMessage.remove();
    }

    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    scoreElement.textContent = score;
    showQuestion();
    updateProgressBar();
}

        }

        function showQuestion() {
            resetState();
            let currentQuestion = currentQuestions[currentQuestionIndex];
            let questionNo = currentQuestionIndex + 1;
            questionNumberElement.textContent = `${questionNo}/${currentQuestions.length}`;
            questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

            currentQuestion.answers.forEach(answer => {
                const button = document.createElement("button");
                button.innerHTML = '<i class="fas fa-circle"></i>' + answer.text;
                button.classList.add("btn");
                answerButtons.appendChild(button);
                if (answer.correct) {
                    button.dataset.correct = answer.correct;
                }
                button.addEventListener("click", selectAnswer);
            });

            // Store hint for current question
            hintButton.dataset.hint = currentQuestion.hint;
            
            // Start timer
            startTimer();
        }function resetState() {
            // Clear timer
            clearInterval(timer);
            timeLeft = 60;
            timerElement.textContent = "60s";
            
            // Hide hint
            hintContainer.style.display = "none";
            
            nextButton.style.display = "none";
            hintButton.style.display = "block";
            while (answerButtons.firstChild) {
                answerButtons.removeChild(answerButtons.firstChild);
            }
        }

        function startTimer() {
            timer = setInterval(() => {
                timeLeft--;
                timerElement.textContent = `${timeLeft}s`; 
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    // Automatically move to next question if time runs out
                    handleNextButton();
                }
            }, 1000);
        }

        function selectAnswer(e) {
            clearInterval(timer); // Stop timer when answer is selected
            
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === "true";
            if (isCorrect) {
                selectedBtn.classList.add("correct");
                score++;
                scoreElement.textContent = score;
            } else {
                selectedBtn.classList.add("incorrect");
            }
            Array.from(answerButtons.children).forEach(button => {
                if (button.dataset.correct === "true") {
                    button.classList.add("correct");
                }
                button.disabled = true;
            });
            nextButton.style.display = "block";
            hintButton.style.display = "none";
        }

        function showScore() {
            resetState();
            questionElement.innerHTML = `You scored ${score} out of ${currentQuestions.length}!`;
            
            // Create a message based on score
            let message = "";
            if (score === currentQuestions.length) {
                message = "Masha'Allah! Excellent knowledge of Islamic history!";
            } else if (score >= currentQuestions.length/2) {
                message = "Alhamdulillah! Good knowledge, keep learning!";
            } else {
                message = "Keep studying Islamic history to improve your knowledge!";
            }
            
            const scoreMessage = document.createElement("p");
            scoreMessage.textContent = message;
            scoreMessage.style.textAlign = "center";
            scoreMessage.style.marginTop = "15px";
            scoreMessage.style.color = "#1a2a6c";
            questionElement.parentNode.insertBefore(scoreMessage, nextButton);
            
            nextButton.innerHTML = "Play Again";
            nextButton.style.display = "block";
            hintButton.style.display = "none";
        }

        function handleNextButton() {
            currentQuestionIndex++;
            if (currentQuestionIndex < currentQuestions.length) {
                showQuestion();
                updateProgressBar();
            } else {
                showScore();
                progressBar.style.width = '100%';
            }
        }

        function updateProgressBar() {
            const progress = ((currentQuestionIndex) / currentQuestions.length) * 100;
            progressBar.style.width = progress + '%';
        }

        // Hint button functionality
        hintButton.addEventListener("click", () => {
            hintText.textContent = hintButton.dataset.hint;
            hintContainer.style.display = "block";
        });

        nextButton.addEventListener("click", () => {
            if (currentQuestionIndex < currentQuestions.length) {
                handleNextButton();
                } else {
                // Remove any score message
                const scoreMessage = document.querySelector("#question + p");
                if (scoreMessage) {
                    scoreMessage.remove();
                }
                startQuiz();
            }
        });

        startQuiz();
   