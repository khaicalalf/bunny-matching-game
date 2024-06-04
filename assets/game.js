const images = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image1.jpg', 'image2.jpg', 'image3.jpg',
            'image4.jpg'
        ];
        const gallery = document.getElementById('gallery');
        const startButton = document.getElementById('start-button');
        const resetButton = document.getElementById('reset-button');
        const startContainer = document.getElementById('start-container');
        const titleGame = document.getElementById('title-game');
        const galleryContainer = document.querySelector('.gallery-container');
        let firstCard = null;
        let secondCard = null;
        let score = 0;
        let matchedPairs = 0;
        let startTime;
        let timerInterval;

        startButton.addEventListener('click', startGame);
        resetButton.addEventListener('click', resetGame);

        function startGame() {
            startContainer.style.display = 'none';
            galleryContainer.style.display = 'flex';
            titleGame.style.display = 'flex';
            score = 0;
            matchedPairs = 0;
            updateScore();
            shuffle(images);
            createCards();
            if (!startTime) {
                startTime = Date.now();
                timerInterval = setInterval(updateTime, 1000);
            }
        }

        function resetGame(){
            window.location.href = `index.html`;
        }

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function createCards() {
            gallery.innerHTML = '';
            images.forEach((image, index) => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.dataset.image = image;
                card.innerHTML = `
                    <div class="card-inner">
                        <div class="card-front">
                            <img src="assets/img/back.jpg" alt="Back">
                        </div>
                        <div class="card-back">
                            <img src="assets/img/${image}" alt="Image ${index}">
                        </div>
                    </div>
                `;
                card.addEventListener('click', handleCardClick);
                gallery.appendChild(card);
            });
        }

        function handleCardClick(event) {
            const clickedCard = event.currentTarget;

            

            if (clickedCard === firstCard || clickedCard.classList.contains('is-flipped')) {
                return;
            }

            clickedCard.classList.add('is-flipped');

            if (!firstCard) {
                firstCard = clickedCard;
                return;
            }

            secondCard = clickedCard;

            if (firstCard.dataset.image === secondCard.dataset.image) {
                score += 25;
                matchedPairs += 1;
                resetCards();
                if (matchedPairs === images.length / 2) {
                    clearInterval(timerInterval);
                    setTimeout(() => {
                        alert(
                            `Game completed in ${Math.floor((Date.now() - startTime) / 1000)} seconds with a score of ${score}`
                            );
                    }, 500); // Delay to allow last flip animation to finish
                }
            } else {
                setTimeout(() => {
                    firstCard.classList.remove('is-flipped');
                    secondCard.classList.remove('is-flipped');
                    resetCards();
                }, 500);
            }

            updateScore();
        }

        function resetCards() {
            [firstCard, secondCard] = [null, null];
        }

        function updateScore() {
            document.getElementById('score').innerText = `Score: ${score}`;
        }

        function updateTime() {
            const currentTime = Date.now();
            const elapsedTime = Math.floor((currentTime - startTime) / 1000);
            document.getElementById('time').innerText = `Time: ${elapsedTime}s`;
        }