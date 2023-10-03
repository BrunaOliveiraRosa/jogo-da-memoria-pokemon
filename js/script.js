document.addEventListener("DOMContentLoaded", function () {
    const playButton = document.getElementById("play-button");
    playButton.addEventListener("click", startGame);

    let playerName = "";
    let isGameStarted = false;
    let isGameFinished = false;
    let cards = [];
    let matchedCards = [];
    let timerInterval;

    function startGame() {
        playerName = document.getElementById("player-name").value;

        if (playerName === "") {
            alert("Por favor, digite seu nome antes de iniciar o jogo.");
            return;
        }

        if (isGameStarted) {
            resetGame();
        }

        isGameStarted = true;
        isGameFinished = false;
        document.getElementById("name-input").style.display = "none";
        document.getElementById("play-button").style.display = "none";

        createCards();
        shuffleCards();
        renderCards();

        startTimer();
    }

    function resetGame() {
        isGameStarted = false;
        isGameFinished = false;
        playerName = "";
        cards = [];
        matchedCards = [];
        clearInterval(timerInterval);

        const cardContainer = document.getElementById("game-container");
        cardContainer.innerHTML = "";

        document.getElementById("name-input").style.display = "block";
        document.getElementById("play-button").style.display = "block";
        document.getElementById("player-name").value = "";
        document.getElementById("timer").textContent = "Tempo: 0 segundos";
    }

    function createCards() {
        for (let i = 1; i <= 10; i++) {
            cards.push(`img${i}.jpg`);
            cards.push(`img${i}.jpg`); // Crie um par correspondente para cada imagem
        }
    }

    function shuffleCards() {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }

    function renderCards() {
        const cardContainer = document.getElementById("game-container");
        cardContainer.style.display = "flex";
        cardContainer.style.flexWrap = "wrap";
    
        for (let i = 0; i < cards.length; i++) {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.index = i;
    
            // Use o nome de arquivo da imagem como background-image
            card.style.backgroundImage = `url('img/back.jpg')`; // Substitua 'back.jpg' pelo nome do seu arquivo de imagem
    
            card.addEventListener("click", () => revealCard(card));
            cardContainer.appendChild(card);
        }
    }

    function revealCard(card) {
        if (!isGameStarted || isGameFinished || card.classList.contains("matched")) {
            return;
        }

        const index = parseInt(card.dataset.index);
        const cardValue = cards[index];
        card.style.backgroundImage = `url('img/${cardValue}')`;

        if (matchedCards.length === 0) {
            matchedCards.push({ card, value: cardValue });
        } else if (matchedCards.length === 1) {
            const prevCard = matchedCards[0].card;
            const prevValue = matchedCards[0].value;

            if (card !== prevCard) {
                if (cardValue === prevValue) {
                    card.classList.add("matched");
                    prevCard.classList.add("matched");

                    matchedCards = [];
                    checkGameFinish();
                } else {
                    setTimeout(() => {
                        card.style.backgroundImage = `url('img/back.jpg')`;
                        prevCard.style.backgroundImage = `url('img/back.jpg')`;
                        matchedCards = [];
                    }, 1000);
                }
            }
        }
    }

    function checkGameFinish() {
        const allCards = document.querySelectorAll(".card");
        const matchedCount = document.querySelectorAll(".matched").length;

        if (matchedCount === allCards.length) {
            clearInterval(timerInterval);
            isGameFinished = true;
            alert(`Parabéns, ${playerName}! Você concluiu o jogo em ${timerSeconds} segundos.`);
        }
    }

    let timerSeconds = 0;

    function startTimer() {
        timerSeconds = 0;
        const timerElement = document.getElementById("timer");
        timerInterval = setInterval(() => {
            timerSeconds++;
            timerElement.textContent = `Tempo: ${timerSeconds} segundos`;
        }, 1000);
    }
});





