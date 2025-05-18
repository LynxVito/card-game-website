let deck;
let spadesPics = [];
let clubsPics = [];
let diamondsPics = [];
let heartsPics = [];

let playerHand;
let opponentHand;

let cardHeight = 120;
let cardWidth = 75;

class Deck {
    constructor() {
        this.cards = [];
        this.values = ["A", 2, 3, 4, 5, 6, 7, "Q", "J", "K"];
        this.suits = ["Spades", "Clubs", "Diamonds", "Hearts"];
    }

    sortDeck() {
        for (let s = 0; s < this.suits.length; s++) {
            for (let v = 0; v < this.values.length; v++) {
                this.cards.push(createCard(0, 0, this.suits[s], this.values[v]));
            }
        }
    }

    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

    shuffle(array) {
        let currentIndex = array.length;

        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
    }

    dealCards() {
        for (let i = 0; i < 3; i++) {
            playerHand.cards.push(this.cards[0]);
            this.cards.shift();
            opponentHand.cards.push(this.cards[0]);
            this.cards.shift();
        }
    }

    fish() {
        this.cards.shift();
    }
}

class Hand {
    constructor(opp = false) {
        this.isOpponent = opp;
        this.cards = [];
    }
}

function preload() {
    for (let i = 1; i < 11; i++) {
        let spadesPic = loadImage(`Playing Cards/card-spades-${i}.png`)
        spadesPics.push(spadesPic);

        let clubsPic = loadImage(`Playing Cards/card-clubs-${i}.png`)
        clubsPics.push(clubsPic);

        let diamondsPic = loadImage(`Playing Cards/card-diamonds-${i}.png`)
        diamondsPics.push(diamondsPic);

        let heartsPic = loadImage(`Playing Cards/card-hearts-${i}.png`)
        heartsPics.push(heartsPic);
    }
}

function setup() {
    createCanvas(600, 600);
    rectMode(CENTER);

    deck = new Deck();
    deck.sortDeck();

    playerHand = new Hand(false);
    opponentHand = new Hand(true);
    // deck.shuffle(deck.cards);
}

function draw() {
    background(0, 50, 50);

    // image(spadesPics[0], cardWidth * 0, 0, cardWidth, cardHeight);
    // image(diamondsPics[9], cardWidth * 1, 0, cardWidth, cardHeight);
}

function createCard(x, y, s, v) {
    return {
        x: x, 
        y: y,
        suit: s,
        value: v,
    }
}

function mousePressed() {
    if(playerHand.cards.length < 3) {
        deck.dealCards();
        console.log(deck.cards)
        console.log(playerHand.cards)
        console.log(opponentHand.cards);
    }
}