// Define deck of cards
const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

// DOM elements
const playerHand = document.getElementById("player-cards");
const dealerHand = document.getElementById("dealer-cards");
const playerScoreDisplay = document.getElementById("player-score");
const dealerScoreDisplay = document.getElementById("dealer-score");
const resultDisplay = document.getElementById("result");

let deck = [];
let playerHandValue = 0;
let dealerHandValue = 0;
let isGameOver = false;

// Initialize a new game
function startGame() {
  deck = createDeck();
  playerHandValue = 0;
  dealerHandValue = 0;
  isGameOver = false;

  // Clear hands and scores
  playerHand.innerHTML = "";
  dealerHand.innerHTML = "";
  playerScoreDisplay.textContent = "Score: 0";
  dealerScoreDisplay.textContent = "Score: 0";
  resultDisplay.textContent = "";

  // Shuffle the deck
  shuffleDeck();

  // Deal initial cards
  dealCard(playerHand);
  dealCard(dealerHand);
  dealCard(playerHand);
  dealCard(dealerHand);
}

// Create a deck of cards
function createDeck() {
  const deck = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
}

// Shuffle the deck
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Deal a card from the deck
function dealCard(hand) {
  const card = deck.pop();
  hand.appendChild(createCardElement(card));
  updateScore(card, hand);
}

// Create HTML element for a card
function createCardElement(card) {
  const cardElement = document.createElement("div");
  cardElement.className = "card";
  cardElement.textContent = `${card.value} of ${card.suit}`;
  return cardElement;
}

// Update player or dealer score
function updateScore(card, hand) {
  const cardValue = getCardValue(card);
  if (hand === playerHand) {
    playerHandValue += cardValue;
    playerScoreDisplay.textContent = `Score: ${playerHandValue}`;
  } else {
    dealerHandValue += cardValue;
    dealerScoreDisplay.textContent = `Score: ${dealerHandValue}`;
  }
}

// Get numerical value of a card
function getCardValue(card) {
  if (card.value === "A") {
    return 11;
  } else if (["K", "Q", "J"].includes(card.value)) {
    return 10;
  } else {
    return parseInt(card.value, 10);
  }
}

// Check if the player or dealer has blackjack
function hasBlackjack(handValue) {
  return handValue === 21;
}

// Check if the player or dealer has busted
function hasBusted(handValue) {
  return handValue > 21;
}

// Determine the winner
function determineWinner() {
  if (playerHandValue > dealerHandValue) {
    resultDisplay.textContent = "You win!";
  } else if (dealerHandValue > playerHandValue) {
    resultDisplay.textContent = "Dealer wins!";
  } else {
    resultDisplay.textContent = "It's a tie!";
  }
  isGameOver = true;
}

// Event listeners
document.getElementById("new-game").addEventListener("click", startGame);

document.getElementById("hit").addEventListener("click", function () {
  if (!isGameOver) {
    dealCard(playerHand);

    if (hasBlackjack(playerHandValue)) {
      resultDisplay.textContent = "Blackjack! You win!";
      isGameOver = true;
    } else if (hasBusted(playerHandValue)) {
      resultDisplay.textContent = "Busted! Dealer wins!";
      isGameOver = true;
    }
  }
});

document.getElementById("stand").addEventListener("click", function () {
  if (!isGameOver) {
    while (dealerHandValue < 17) {
      dealCard(dealerHand);
    }

    if (hasBlackjack(dealerHandValue)) {
      resultDisplay.textContent = "Dealer has Blackjack! Dealer wins!";
    } else if (hasBusted(dealerHandValue)) {
      resultDisplay.textContent = "Dealer busted! You win!";
    } else {
      determineWinner();
    }
  }
});

// Start the initial game
startGame();
