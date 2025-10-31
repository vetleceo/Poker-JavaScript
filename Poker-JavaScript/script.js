// Simple deck of cards
const suits = ['♠', '♣', '♦', '♥'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let deck = [];

// Generate deck of cards
function generateDeck() {
    deck = [];
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({ value, suit });
        });
    });
    shuffleDeck();
}

// Shuffle deck of cards
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Deal cards to players
function dealCards() {
    const players = document.querySelectorAll('.player');
    players.forEach(player => {
        const hand = player.querySelector('.hand');
        hand.innerHTML = '';
        for (let i = 0; i < 2; i++) {
            const card = deck.pop();
            const cardElem = document.createElement('span');
            cardElem.textContent = `${card.value}${card.suit}`;
            hand.appendChild(cardElem);
        }
    });
}

// Deal community cards (flop, turn, river)
function dealCommunityCards() {
    const cardsContainer = document.getElementById('cards');
    cardsContainer.innerHTML = '';

    // Flop (3 cards)
    for (let i = 0; i < 3; i++) {
        const card = deck.pop();
        const cardElem = document.createElement('span');
        cardElem.textContent = `${card.value}${card.suit}`;
        cardsContainer.appendChild(cardElem);
    }
    
    // Turn (1 card)
    const turnCard = deck.pop();
    const turnElem = document.createElement('span');
    turnElem.textContent = `${turnCard.value}${turnCard.suit}`;
    cardsContainer.appendChild(turnElem);
    
    // River (1 card)
    const riverCard = deck.pop();
    const riverElem = document.createElement('span');
    riverElem.textContent = `${riverCard.value}${riverCard.suit}`;
    cardsContainer.appendChild(riverElem);
}

// AI decision logic (basic, can be expanded)
function aiDecision(playerId) {
    const decision = Math.random();
    const action = decision < 0.5 ? 'fold' : decision < 0.8 ? 'call' : 'raise';
    console.log(`AI ${playerId} decided to ${action}`);
}

// Handle player actions
document.getElementById('fold-btn').addEventListener('click', () => {
    console.log("You folded");
    // Implement fold logic
});

document.getElementById('bet-btn').addEventListener('click', () => {
    console.log("You bet");
    // Implement betting logic
});

// Start game
function startGame() {
    generateDeck();
    dealCards();
    dealCommunityCards();
    // AI decisions for all AI players
    for (let i = 2; i <= 4; i++) {
        aiDecision(i);
    }
}

document.getElementById('next-round').addEventListener('click', () => {
    startGame();
});

// Start the game on page load
window.onload = startGame;
