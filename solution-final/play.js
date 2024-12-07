// Variables for game state
let flippedCards = []; // Holds the flipped cards (max 2)
let matchedCards = 0; // Number of matched pairs
let moves = 0; // Number of moves

// Card Data (phrases and images)
const cardData = [
  { type: 'phrase', text: 'I believe the best way to learn is by teaching others.', match: 'lightbulb.svg' },
  { type: 'image', image: 'lightbulb.svg', match: 'I believe the best way to learn is by teaching others.' },
  { type: 'phrase', text: 'I love creating digital art in my spare time.', match: 'paintbrush.svg' },
  { type: 'image', image: 'paintbrush.svg', match: 'I love creating digital art in my spare time.' },
  { type: 'phrase', text: 'I want to learn how to bake sweet treats!', match: 'bake.svg' },
  { type: 'image', image: 'bake.svg', match: 'I want to learn how to bake sweet treats!' },
  { type: 'phrase', text: 'I hope to travel the world one day.', match: 'globe.svg' },
  { type: 'image', image: 'globe.svg', match: 'I hope to travel the world one day.' },
  { type: 'phrase', text: 'I love to play tennis in my free time!', match: 'tennis.svg' },
  { type: 'image', image: 'tennis.svg', match: 'I love to play tennis in my free time!' },
  { type: 'phrase', text: 'I want to work on projects that combat addictive technology.', match: 'tech.svg' },
  { type: 'image', image: 'tech.svg', match: 'I want to work on projects that combat addictive technology.' }
];

// Shuffle function to randomize the cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

// Set up the game board
function setupGame() {
  shuffle(cardData); // Shuffle all the cards
  const gameContainer = document.getElementById('game-container');
  gameContainer.innerHTML = ''; // Clear any existing cards

  cardData.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.index = index;

    // Create the front of the card
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front'); // Front side of the card
    const frontImage = document.createElement('img');
    frontImage.classList.add('card-image');
    cardFront.appendChild(frontImage);

    // Create the back of the card
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back'); // Back side of the card

    // Show text for phrase cards or image for image cards
    if (card.type === 'phrase') {
      const backText = document.createElement('p');
      backText.classList.add('card-text');
      backText.textContent = card.text;
      cardBack.appendChild(backText);
    } else {
      const backImage = document.createElement('img');
      backImage.src = `../final-project/portfolio/${card.image}`; // Card image
      backImage.alt = 'Card Image';
      backImage.classList.add('card-image');
      cardBack.appendChild(backImage);
    }

    // Append both front and back to the card element
    cardElement.appendChild(cardFront);
    cardElement.appendChild(cardBack);

    // Append the card to the game container
    gameContainer.appendChild(cardElement);
  });

  addCardEventListeners();
  resetGameStatus(); // Reset the game status (move count, etc.)

  // Ensure the restart button is hidden initially
  const restartButton = document.getElementById('restart-button');
  restartButton.style.display = 'none';
}

// Event listener for card clicks
function addCardEventListeners() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', () => flipCard(card));
  });
}

// Handle card flip logic
function flipCard(card) {
  if (flippedCards.length === 2 || card.classList.contains('flipped') || card === flippedCards[0]) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  // Check if two flipped cards match
  if (flippedCards.length === 2) {
    moves++;
    document.getElementById('moves-count').textContent = `Moves: ${moves}`;

    const firstCard = flippedCards[0];
    const secondCard = flippedCards[1];

    // Get the data for each card
    const firstCardData = cardData[firstCard.dataset.index];
    const secondCardData = cardData[secondCard.dataset.index];

    // Check if the cards match
    const matchFound = firstCardData.match === secondCardData.text || secondCardData.match === firstCardData.text;

    if (matchFound) {
      matchedCards++; // Increment matched pairs
      flippedCards = []; // Reset flipped cards

      // If all cards are matched, show the completion message
      if (matchedCards === cardData.length / 2) {
        document.getElementById('game-completion').style.display = 'block';

        // Show the restart button
        const restartButton = document.getElementById('restart-button');
        restartButton.classList.add('btn'); // Style the button
        restartButton.style.display = 'inline-block'; // Show the restart button
      }
    } else {
      // Delay unflip to allow user to view both cards
      setTimeout(() => {
        flippedCards.forEach(f => f.classList.remove('flipped'));
        flippedCards = [];
      }, 1000); // 1 second delay
    }
  }
}

// Initialize the game
setupGame();

// Restart game function
function restartGame() {
  flippedCards = []; // Reset flipped cards
  matchedCards = 0; // Reset matched cards
  moves = 0; // Reset moves
  document.getElementById('moves-count').textContent = `Moves: 0`;
  document.getElementById('game-completion').style.display = 'none';

  // Restart the game board
  setupGame();
}

// Reset game status (move count and message)
function resetGameStatus() {
  document.getElementById('moves-count').textContent = 'Moves: 0';
  document.getElementById('game-completion').style.display = 'none';
  document.getElementById('restart-button').style.display = 'none';
}

// Initialize the game setup
setupGame();
