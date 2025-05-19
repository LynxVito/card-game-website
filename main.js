let deck;
let spadesPics = [];
let clubsPics = [];
let diamondsPics = [];
let heartsPics = [];

//Stages
const PRE_GAME = "Pre Game";
const START = "Start";
const DRAW_CARDS = "Draw Cards";
const PLACE_CARDS = "Place Cards";
const GO_FISH = "Go Fish";
const COUNT_POINTS = "Count Points";
const END_GAME = "End Game";

let currentStage;

let playerHand;
let opponentHand;

let cardHeight = 120;
let cardWidth = 75;

let trumpSuit;

class Deck {
    constructor(x, y) {
        this.cards = [];
        this.values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.suits = ["Spades", "Clubs", "Diamonds", "Hearts"];

        this.x = x;
        this.y = y;
    }

    sortDeck() {
        for (let s = 0; s < this.suits.length; s++) {
            for (let v = 0; v < this.values.length; v++) {
                this.cards.push(createCard(this.suits[s], this.values[v]));
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

    mouseOnDeck(px, py) {
        if(px > this.x && px < this.x + cardWidth) {
                if(py > this.y && py < this.y + cardHeight) {
                    playerHand.cards.push(this.cards[0]);
                    this.cards.shift();
                }
            }
    }

    draw() {
        for(let i = 0; i < this.cards.length - 1; i++) {
            image(backOfCardPic, this.x, this.y, cardWidth, cardHeight);
        }

        if(this.cards[this.cards.length - 1].suit == "Spades") {
            image(spadesPics[this.cards[this.cards.length - 1].value - 1], this.x + cardWidth, this.y, cardWidth, cardHeight);
        }
        else if(this.cards[this.cards.length - 1].suit == "Clubs") {
            image(clubsPics[this.cards[this.cards.length - 1].value - 1], this.x + cardWidth, this.y, cardWidth, cardHeight);
        }
        else if(this.cards[this.cards.length - 1].suit == "Diamonds") {
            image(diamondsPics[this.cards[this.cards.length - 1].value - 1], this.x + cardWidth, this.y, cardWidth, cardHeight);
        }
        else if(this.cards[this.cards.length - 1].suit == "Hearts") {
            image(heartsPics[this.cards[this.cards.length - 1].value - 1], this.x + cardWidth, this.y, cardWidth, cardHeight);
        }
    }
}

class Hand {
    constructor(x, y, opp = false) {
        this.isOpponent = opp;
        this.cards = [];
        this.x = x;
        this.y = y;
    }

    mouseOnCard(px, py) {
        for(let i = 0; i < this.cards.length; i++) {
            if(px > this.x + cardWidth * i && px < this.x + cardWidth + cardWidth * i) {
                if(py > this.y && py < this.y + cardHeight) {
                    this.cards.splice(i, 1);
                }
            }
        }     
    }

    draw() {
        for(let i = 0; i < this.cards.length; i++) {
            if(this.cards[i].suit == "Spades") {
                image(spadesPics[this.cards[i].value - 1], this.x + cardWidth * i, this.y, cardWidth, cardHeight);
            }
            else if(this.cards[i].suit == "Clubs") {
                image(clubsPics[this.cards[i].value - 1], this.x + cardWidth  * i, this.y, cardWidth, cardHeight);
            }
            else if(this.cards[i].suit == "Diamonds") {
                image(diamondsPics[this.cards[i].value - 1], this.x + cardWidth  * i, this.y, cardWidth, cardHeight);
            }
            else if(this.cards[i].suit == "Hearts") {
                image(heartsPics[this.cards[i].value - 1], this.x + cardWidth  * i, this.y, cardWidth, cardHeight);
            }
        }
    }
}

function preload() {
    backOfCardPic = loadImage("Playing Cards/card-back1.png");

    for (let i = 1; i < 11; i++) {
        spadesPic = loadImage(`Playing Cards/card-spades-${i}.png`);
        spadesPics.push(spadesPic);

        clubsPic = loadImage(`Playing Cards/card-clubs-${i}.png`);
        clubsPics.push(clubsPic);

        diamondsPic = loadImage(`Playing Cards/card-diamonds-${i}.png`);
        diamondsPics.push(diamondsPic);

        heartsPic = loadImage(`Playing Cards/card-hearts-${i}.png`);
        heartsPics.push(heartsPic);
    }
}

function setup() {
    createCanvas(600, 600);
    rectMode(CENTER);
    angleMode(DEGREES);
    imageMode(CORNER);

    deck = new Deck(0, height * 0.4);
    deck.sortDeck();

    playerHand = new Hand(width / 3, height - cardHeight, false);
    opponentHand = new Hand(width / 3, 0, true);
    deck.shuffle(deck.cards);

    currentStage = START;
}

function draw() {
    background(0, 50, 50);

    console.log(currentStage);

    if(currentStage == START) {
        deck.dealCards();
        trumpSuit = deck.cards[deck.cards.length - 1].suit;

        console.log(trumpSuit);
        console.log(deck.cards);
        console.log(playerHand.cards);
        console.log(opponentHand.cards);

        playerHand.draw();
        opponentHand.draw();
        deck.draw();

        currentStage = PLACE_CARDS;
    }

    else if(currentStage == PLACE_CARDS) {
        playerHand.draw();
        opponentHand.draw();
        deck.draw();
    }

    else if(currentStage == GO_FISH) {
        playerHand.draw();
        opponentHand.draw();
        deck.draw();
    }
        
}

function createCard(s, v) {
    return {
        suit: s,
        value: v,
    }
}

function mousePressed() {
    if(playerHand.cards.length > 2) {
        playerHand.mouseOnCard(mouseX, mouseY)
        // currentStage = GO_FISH;
    }

    if(playerHand.cards.length < 3) {
        deck.mouseOnDeck(mouseX, mouseY);
        // currentStage = PLACE_CARDS;
    }
}