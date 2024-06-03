
        const images = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'];
        const gallery = document.getElementById('gallery');
        const scores = document.getElementById('score');
        const times = document.getElementById('time');
        const startButton = document.getElementById('start-button');
        let firstCard = null;
        let secondCard = null;
        let score = 0;
        let matchedPairs = 0;
        let startTime;
        let timerInterval;

        startButton.addEventListener('click', startGame);

        function startGame() {
            startButton.style.display = 'none';
            gallery.style.opacity = 1;
            scores.style.opacity = 1;
            times.style.opacity = 1;
            score = 0;
            matchedPairs = 0;
            updateScore();
            shuffle(images);
            createCards();
        }

        // Function to shuffle an array
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
                
            }
            console.log();
            return array;
        }

        // Create cards
        function createCards() {
            gallery.innerHTML = '';
            images.forEach((image, index) => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.dataset.image = image;
                card.innerHTML = `
                    <div class="col card-inner">
                        <div class="card-front card mb-4 rounded-3 shadow-sm">
                            <img src="img/back.jpg" alt="Back">
                        </div>
                        <div class="card-back card mb-4 rounded-3 shadow-sm">
                            <img src="img/${image}" alt="Image ${index}">
                        </div>
                    </div>
                `;
                card.addEventListener('click', handleCardClick);
                gallery.appendChild(card);
            });
            if (!startTime) {
                startTime = Date.now();
                timerInterval = setInterval(updateTime, 1000);
            }
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
                score += 10;
                matchedPairs += 1;
                resetCards();
                if (matchedPairs === images.length / 2) {
                    clearInterval(timerInterval);
                    alert(`Game completed in ${Math.floor((Date.now() - startTime) / 1000)} seconds with a score of ${score}`);
                }
            } else {
                setTimeout(() => {
                    firstCard.classList.remove('is-flipped');
                    secondCard.classList.remove('is-flipped');
                    resetCards();
                }, 1000);
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
   