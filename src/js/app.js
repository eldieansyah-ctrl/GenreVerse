        // App State
        const appState = {
            currentUser: null,
            learningStyle: null,
            currentGenre: null,
            currentLesson: null,
            userProgress: {
                completedLessons: 0,
                averageScore: 0,
                learningStreak: 0,
                achievements: []
            },
            quizAnswers: [],
            currentQuizQuestion: 0
        };

        // Sample Data
        const lessonsData = {
            narrative: {
                title: "Narrative Writing",
                description: "Learn how to tell engaging stories",
                content: {
                    visual: "Visual content for narrative writing: story structure infographic",
                    auditory: "Audio explanation of narrative elements and examples",
                    reading: "Narrative text: 'The Lost Key' - Once upon a time, a young girl named Lily lost her golden key. She searched everywhere in her house but couldn't find it. Finally, she remembered she had been playing in the garden. She rushed outside and found the key shining under the morning sun.",
                    kinesthetic: "Drag and drop activity: Arrange story events in correct order"
                },
                quiz: [
                    {
                        question: "What is the main purpose of narrative writing?",
                        options: [
                            "To inform the reader",
                            "To tell a story",
                            "To describe a place",
                            "To explain a process"
                        ],
                        correct: 1
                    },
                    {
                        question: "Which element is most important in a narrative?",
                        options: [
                            "Facts and statistics",
                            "Characters and plot",
                            "Instructions",
                            "Definitions"
                        ],
                        correct: 1
                    },
                    {
                        question: "What tense is typically used in narratives?",
                        options: [
                            "Present tense",
                            "Future tense",
                            "Past tense",
                            "Conditional tense"
                        ],
                        correct: 2
                    }
                ]
            },
            recount: {
                title: "Recount Writing",
                description: "Learn how to retell past events effectively",
                content: {
                    visual: "Visual content for recount writing: timeline of events",
                    auditory: "Audio explanation of recount structure with examples",
                    reading: "Recount text: 'My Weekend Trip' - Last weekend, my family and I went to the beach. The weather was perfect with clear blue skies. We built sandcastles, swam in the ocean, and had a picnic. In the evening, we watched the sunset before heading home tired but happy.",
                    kinesthetic: "Interactive activity: Sequence events from a personal experience"
                },
                quiz: [
                    {
                        question: "What is the main purpose of a recount?",
                        options: [
                            "To persuade the reader",
                            "To retell past events",
                            "To describe a person",
                            "To explain how something works"
                        ],
                        correct: 1
                    },
                    {
                        question: "Which of these is a key feature of recounts?",
                        options: [
                            "Chronological order",
                            "Problem and solution",
                            "Comparisons",
                            "Hypothetical situations"
                        ],
                        correct: 0
                    },
                    {
                        question: "What perspective are recounts usually written from?",
                        options: [
                            "Second person",
                            "Third person omniscient",
                            "First person",
                            "Objective observer"
                        ],
                        correct: 2
                    }
                ]
            },
            descriptive: {
                title: "Descriptive Writing",
                description: "Learn how to create vivid descriptions",
                content: {
                    visual: "Visual content for descriptive writing: image with descriptive labels",
                    auditory: "Audio description of a scene with emphasis on sensory details",
                    reading: "Descriptive text: 'My Best Friend' - My best friend Sarah has long, wavy brown hair that shines in the sunlight. Her bright blue eyes sparkle when she laughs. She is tall and athletic, always wearing comfortable clothes. Her voice is warm and friendly, making everyone feel at ease around her.",
                    kinesthetic: "Drag and drop activity: Match adjectives to appropriate nouns"
                },
                quiz: [
                    {
                        question: "What is the main goal of descriptive writing?",
                        options: [
                            "To convince the reader",
                            "To create a vivid picture",
                            "To explain a process",
                            "To tell a story"
                        ],
                        correct: 1
                    },
                    {
                        question: "Which senses should descriptive writing appeal to?",
                        options: [
                            "Only sight",
                            "Sight and sound",
                            "All five senses",
                            "Only hearing"
                        ],
                        correct: 2
                    },
                    {
                        question: "What type of language is most important in descriptive writing?",
                        options: [
                            "Technical terms",
                            "Figurative language",
                            "Simple vocabulary",
                            "Formal language"
                        ],
                        correct: 1
                    }
                ]
            }
        };

        const achievements = [
            { id: 1, name: "First Lesson", description: "Complete your first lesson" },
            { id: 2, name: "Quiz Master", description: "Score 100% on a quiz" },
            { id: 3, name: "Genre Explorer", description: "Complete lessons in 3 different genres" },
            { id: 4, name: "Consistent Learner", description: "Maintain a 5-day learning streak" },
            { id: 5, name: "Visual Learner", description: "Complete 5 visual-style lessons" },
            { id: 6, name: "Reading Champion", description: "Complete 5 reading-style lessons" }
        ];

        // DOM Elements
        const pages = {
            login: document.getElementById('login-page'),
            style: document.getElementById('style-page'),
            menu: document.getElementById('menu-page'),
            lesson: document.getElementById('lesson-page'),
            quiz: document.getElementById('quiz-page'),
            results: document.getElementById('results-page')
        };

        // Navigation Functions
        function showPage(pageId) {
            // Hide all pages
            Object.values(pages).forEach(page => {
                page.classList.remove('active');
            });
            
            // Show the requested page
            pages[pageId].classList.add('active');
        }

        // Initialize the app
        function initApp() {
            // Check if user is already logged in (from localStorage)
            const savedUser = localStorage.getItem('currentUser');
            const savedStyle = localStorage.getItem('learningStyle');
            
            if (savedUser && savedStyle) {
                appState.currentUser = savedUser;
                appState.learningStyle = savedStyle;
                loadUserProgress();
                showPage('menu');
                updateMenuDisplay();
            } else {
                showPage('login');
            }
            
            setupEventListeners();
        }

        // Set up event listeners
        function setupEventListeners() {
            // Login/Registration
            document.getElementById('login-btn').addEventListener('click', handleLogin);
            document.getElementById('register-btn').addEventListener('click', handleRegister);
            
            // Learning style selection
            document.querySelectorAll('.learning-style-card').forEach(card => {
                card.addEventListener('click', function() {
                    const style = this.getAttribute('data-style');
                    selectLearningStyle(style);
                });
            });
            
            // Navigation
            document.getElementById('back-to-login').addEventListener('click', () => showPage('login'));
            document.getElementById('logout-btn').addEventListener('click', handleLogout);
            document.getElementById('back-to-menu').addEventListener('click', () => showPage('menu'));
            document.getElementById('back-to-menu-from-results').addEventListener('click', () => showPage('menu'));
            document.getElementById('back-to-lesson').addEventListener('click', () => showPage('lesson'));
            
            // Genre selection
            document.querySelectorAll('.genre-card').forEach(card => {
                card.addEventListener('click', function() {
                    const genre = this.getAttribute('data-genre');
                    startLesson(genre);
                });
            });
            
            // Quiz
            document.getElementById('take-quiz').addEventListener('click', startQuiz);
            document.getElementById('submit-quiz').addEventListener('click', submitQuiz);
            document.getElementById('retry-quiz').addEventListener('click', retryQuiz);
            document.getElementById('next-lesson').addEventListener('click', nextLesson);
        }

        // Login handler
        function handleLogin() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (!username || !password) {
                document.getElementById('login-message').textContent = 'Please enter both username and password';
                document.getElementById('login-message').style.color = 'red';
                return;
            }
            
            // Simple validation (in a real app, this would check against a database)
            if (password.length < 4) {
                document.getElementById('login-message').textContent = 'Password must be at least 4 characters';
                document.getElementById('login-message').style.color = 'red';
                return;
            }
            
            appState.currentUser = username;
            localStorage.setItem('currentUser', username);
            
            // Check if user has already selected a learning style
            const savedStyle = localStorage.getItem('learningStyle');
            if (savedStyle) {
                appState.learningStyle = savedStyle;
                loadUserProgress();
                showPage('menu');
                updateMenuDisplay();
            } else {
                showPage('style');
            }
        }

        // Registration handler
        function handleRegister() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const email = document.getElementById('email').value;
            
            if (!username || !password || !email) {
                document.getElementById('login-message').textContent = 'Please fill in all fields';
                document.getElementById('login-message').style.color = 'red';
                return;
            }
            
            if (password.length < 4) {
                document.getElementById('login-message').textContent = 'Password must be at least 4 characters';
                document.getElementById('login-message').style.color = 'red';
                return;
            }
            
            if (!email.includes('@')) {
                document.getElementById('login-message').textContent = 'Please enter a valid email';
                document.getElementById('login-message').style.color = 'red';
                return;
            }
            
            // In a real app, this would send data to a server
            appState.currentUser = username;
            localStorage.setItem('currentUser', username);
            
            document.getElementById('login-message').textContent = 'Registration successful! Please select your learning style.';
            document.getElementById('login-message').style.color = 'green';
            
            showPage('style');
        }

        // Learning style selection
        function selectLearningStyle(style) {
            appState.learningStyle = style;
            localStorage.setItem('learningStyle', style);
            
            // Initialize user progress
            initializeUserProgress();
            
            showPage('menu');
            updateMenuDisplay();
        }

        // Initialize user progress
        function initializeUserProgress() {
            appState.userProgress = {
                completedLessons: 0,
                averageScore: 0,
                learningStreak: 1,
                achievements: [1] // First lesson achievement
            };
            
            saveUserProgress();
        }

        // Load user progress from localStorage
        function loadUserProgress() {
            const savedProgress = localStorage.getItem('userProgress');
            if (savedProgress) {
                appState.userProgress = JSON.parse(savedProgress);
            }
        }

        // Save user progress to localStorage
        function saveUserProgress() {
            localStorage.setItem('userProgress', JSON.stringify(appState.userProgress));
        }

        // Update menu display with user info and progress
        function updateMenuDisplay() {
            document.getElementById('user-display').textContent = appState.currentUser;
            document.getElementById('style-display').textContent = appState.learningStyle;
            
            // Update progress stats
            document.getElementById('completed-lessons').textContent = appState.userProgress.completedLessons;
            document.getElementById('average-score').textContent = `${appState.userProgress.averageScore}%`;
            document.getElementById('learning-streak').textContent = appState.userProgress.learningStreak;
            
            // Update achievements
            const achievementsContainer = document.getElementById('achievements-container');
            achievementsContainer.innerHTML = '';
            
            appState.userProgress.achievements.forEach(achievementId => {
                const achievement = achievements.find(a => a.id === achievementId);
                if (achievement) {
                    const badge = document.createElement('span');
                    badge.className = 'achievement-badge';
                    badge.textContent = achievement.name;
                    badge.title = achievement.description;
                    achievementsContainer.appendChild(badge);
                }
            });
            
            if (achievementsContainer.children.length === 0) {
                achievementsContainer.innerHTML = '<p>No achievements yet. Complete lessons to earn achievements!</p>';
            }
        }

        // Start a lesson
        function startLesson(genre) {
            if (!lessonsData[genre]) {
                alert('Lesson content not available for this genre yet.');
                return;
            }
            
            appState.currentGenre = genre;
            appState.currentLesson = lessonsData[genre];
            
            // Update lesson page
            document.getElementById('lesson-title').textContent = appState.currentLesson.title;
            document.getElementById('lesson-description').textContent = appState.currentLesson.description;
            
            // Hide all content types
            document.querySelectorAll('.visual-content, .auditory-content, .reading-content, .kinesthetic-content')
                .forEach(el => el.style.display = 'none');
            
            // Show content based on learning style
            const contentElement = document.querySelector(`.${appState.learningStyle}-content`);
            if (contentElement) {
                contentElement.style.display = 'block';
                
                // Update content based on style
                if (appState.learningStyle === 'reading') {
                    document.getElementById('reading-text').textContent = appState.currentLesson.content.reading;
                    
                    // Add comprehension questions for reading style
                    const questionsContainer = document.getElementById('comprehension-questions');
                    questionsContainer.innerHTML = '<p>Comprehension questions would appear here in a full implementation.</p>';
                }
            }
            
            // Reset progress bar
            document.getElementById('lesson-progress').style.width = '0%';
            
            showPage('lesson');
        }

        // Start quiz
        function startQuiz() {
            appState.quizAnswers = [];
            appState.currentQuizQuestion = 0;
            
            document.getElementById('quiz-title').textContent = `Quiz: ${appState.currentLesson.title}`;
            
            loadQuizQuestion(0);
            showPage('quiz');
        }

        // Load a quiz question
        function loadQuizQuestion(index) {
            const quizContainer = document.getElementById('quiz-container');
            const question = appState.currentLesson.quiz[index];
            
            if (!question) return;
            
            // Update progress
            const progress = ((index) / appState.currentLesson.quiz.length) * 100;
            document.getElementById('quiz-progress').style.width = `${progress}%`;
            
            quizContainer.innerHTML = `
                <div class="quiz-question">
                    <h3>Question ${index + 1} of ${appState.currentLesson.quiz.length}</h3>
                    <p>${question.question}</p>
                    <div class="quiz-options">
                        ${question.options.map((option, i) => `
                            <div class="quiz-option" data-option="${i}">${option}</div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            // Add event listeners to options
            document.querySelectorAll('.quiz-option').forEach(option => {
                option.addEventListener('click', function() {
                    // Remove selected class from all options
                    document.querySelectorAll('.quiz-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    
                    // Add selected class to clicked option
                    this.classList.add('selected');
                    
                    // Store the answer
                    appState.quizAnswers[index] = parseInt(this.getAttribute('data-option'));
                });
            });
        }

        // Submit quiz
        function submitQuiz() {
            // Check if all questions are answered
            if (appState.quizAnswers.length < appState.currentLesson.quiz.length) {
                alert('Please answer all questions before submitting.');
                return;
            }
            
            // Calculate score
            let correctAnswers = 0;
            appState.currentLesson.quiz.forEach((question, index) => {
                if (appState.quizAnswers[index] === question.correct) {
                    correctAnswers++;
                }
            });
            
            const score = (correctAnswers / appState.currentLesson.quiz.length) * 100;
            
            // Update user progress
            appState.userProgress.completedLessons++;
            appState.userProgress.averageScore = Math.round(
                (appState.userProgress.averageScore * (appState.userProgress.completedLessons - 1) + score) / 
                appState.userProgress.completedLessons
            );
            
            // Check for achievements
            if (score === 100 && !appState.userProgress.achievements.includes(2)) {
                appState.userProgress.achievements.push(2);
            }
            
            if (appState.userProgress.completedLessons >= 3 && !appState.userProgress.achievements.includes(3)) {
                appState.userProgress.achievements.push(3);
            }
            
            // Save progress
            saveUserProgress();
            
            // Show results
            showQuizResults(score, correctAnswers);
        }

        // Show quiz results
        function showQuizResults(score, correctAnswers) {
            document.getElementById('quiz-score').textContent = `${Math.round(score)}%`;
            document.getElementById('correct-answers').textContent = correctAnswers;
            document.getElementById('total-questions').textContent = appState.currentLesson.quiz.length;
            
            // Set results message and emoji based on score
            let message, emoji;
            if (score >= 90) {
                message = "Excellent work!";
                emoji = "🎉";
            } else if (score >= 70) {
                message = "Good job!";
                emoji = "👍";
            } else if (score >= 50) {
                message = "Not bad, keep practicing!";
                emoji = "💪";
            } else {
                message = "Keep studying and try again!";
                emoji = "📚";
            }
            
            document.getElementById('results-message').textContent = message;
            document.getElementById('results-emoji').textContent = emoji;
            
            // Add feedback
            const feedback = document.getElementById('results-feedback');
            feedback.textContent = `You scored ${Math.round(score)}% on this quiz. ${message}`;
            feedback.className = `feedback ${score >= 70 ? 'correct' : 'incorrect'}`;
            
            // Show answer review
            const reviewContainer = document.getElementById('answers-review');
            reviewContainer.innerHTML = '';
            
            appState.currentLesson.quiz.forEach((question, index) => {
                const userAnswer = appState.quizAnswers[index];
                const isCorrect = userAnswer === question.correct;
                
                const reviewItem = document.createElement('div');
                reviewItem.className = `quiz-question ${isCorrect ? 'correct' : 'incorrect'}`;
                reviewItem.style.borderLeft = isCorrect ? '4px solid #28a745' : '4px solid #dc3545';
                
                reviewItem.innerHTML = `
                    <h4>Question ${index + 1}</h4>
                    <p>${question.question}</p>
                    <p><strong>Your answer:</strong> ${question.options[userAnswer]}</p>
                    <p><strong>Correct answer:</strong> ${question.options[question.correct]}</p>
                `;
                
                reviewContainer.appendChild(reviewItem);
            });
            
            showPage('results');
        }

        // Retry quiz
        function retryQuiz() {
            startQuiz();
        }

        // Next lesson
        function nextLesson() {
            // In a full implementation, this would load the next lesson
            alert('Next lesson feature would be implemented in a full version');
            showPage('menu');
            updateMenuDisplay();
        }

        // Logout handler
        function handleLogout() {
            appState.currentUser = null;
            appState.learningStyle = null;
            localStorage.removeItem('currentUser');
            localStorage.removeItem('learningStyle');
            showPage('login');
            
            // Clear form fields
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            document.getElementById('email').value = '';
            document.getElementById('login-message').textContent = '';
        }

        // Initialize the app when the page loads
        window.addEventListener('DOMContentLoaded', initApp);
    