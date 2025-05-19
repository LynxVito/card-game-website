let deck;
let inPlay;
let spadesPics = [];
let clubsPics = [];
let diamondsPics = [];
let heartsPics = [];

//Stages
const PRE_GAME = "Pre Game";
const START = "Start";
const PLACE_CARDS = "Place Cards";
const DRAW_CARD = "Draw Card";
const END_GAME = "End Game";

let currentStage;

let playerHand;
let opponentHand;

let whoseTurn;
let playFirst;
const PLAYER = "player";
const OPPONENT = "opponent"

let cardHeight = 120;
let cardWidth = 75;

let trumpSuit;

let playerPoints;
let opponentPoints;

let oppPlayButton;
let endSequence;

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

                opponentHand.cards.push(this.cards[0]);
                this.cards.shift();

                whoseTurn = playFirst;

                currentStage = PLACE_CARDS;
            }
        }
    }

    assignPoints() {
        for(let i = 0; i < this.cards.length; i++) {
            if(this.cards[i].value == 10) {
                this.cards[i].points = 11;
            }
            if(this.cards[i].value >= 1 && this.cards[i].value <= 5) {
                this.cards[i].points = 0;
            }
            if(this.cards[i].value == 9) {
                this.cards[i].points = 10;
            }
            if(this.cards[i].value == 6) {
                this.cards[i].points = 2;
            }
            if(this.cards[i].value == 7) {
                this.cards[i].points = 3;
            }
            if(this.cards[i].value == 8) {
                this.cards[i].points = 4;
            }
        }
    }

    draw() {
        for(let i = 0; i < this.cards.length; i++) {
            image(backOfCardPic, this.x, this.y, cardWidth, cardHeight);
        }

        
        if(this.cards.length > 0) {
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
}

class Hand {
    constructor(x, y, opp = false) {
        this.isOpponent = opp;
        this.cards = [];
        this.x = x;
        this.y = y;
        this.points;
    }

    mouseOnCard(px, py) {

        for(let i = 0; i < this.cards.length; i++) {
            if(px > this.x + cardWidth * i && px < this.x + cardWidth + cardWidth * i) {
                if(inPlay.cards.length !== 2) {
                    if(whoseTurn == PLAYER) {
                        if(playFirst == PLAYER) {
                            if(py > this.y && py < this.y + cardHeight) {
                                inPlay.cards.push(this.cards[i]);
                                this.cards.splice(i, 1);
                            }
                        }
                        else {
                            if(py > this.y && py < this.y + cardHeight) {
                                inPlay.cards.unshift(this.cards[i]);
                                this.cards.splice(i, 1);
                            }
                        }

                        if(playFirst == OPPONENT) {
                            inPlay.y = (width / 2);
                        }

                            whoseTurn = OPPONENT;
                    }

                    if(inPlay.cards.length == 2) {
                        inPlay.countPoints();
                    }

                    currentStage = PLACE_CARDS;
                }
                
            }
        }
    }

    draw() {
        for(let i = 0; i < this.cards.length; i++) {
            if(this.isOpponent == false) {
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
            else {
                image(backOfCardPic, this.x + cardWidth * i, this.y, cardWidth, cardHeight);
            }            
        }
    }
}

class InPlay {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.cards = [];
    }

    draw() {
        for(let i = 0; i < this.cards.length; i++) {
            if(this.cards[i].suit == "Spades") {
                image(spadesPics[this.cards[i].value - 1], this.x, this.y - cardHeight * i, cardWidth, cardHeight);
            }
            else if(this.cards[i].suit == "Clubs") {
                image(clubsPics[this.cards[i].value - 1], this.x, this.y - cardHeight * i, cardWidth, cardHeight);
            }
            else if(this.cards[i].suit == "Diamonds") {
                image(diamondsPics[this.cards[i].value - 1], this.x, this.y - cardHeight * i, cardWidth, cardHeight);
            }
            else if(this.cards[i].suit == "Hearts") {
                image(heartsPics[this.cards[i].value - 1], this.x, this.y - cardHeight * i, cardWidth, cardHeight);
            }
        }
    }

    countPoints() {
        if(this.cards[0].suit !== this.cards[1].suit) {
            if((this.cards[0].suit !== trumpSuit && this.cards[1].suit !== trumpSuit)) {
                if(playFirst == PLAYER) {
                    playerPoints += this.cards[0].points + this.cards[1].points;
                    playFirst = PLAYER;
                }
                else if(playFirst == OPPONENT) {
                    opponentPoints += this.cards[0].points + this.cards[1].points;
                    playFirst = OPPONENT;
                }
            }
            else if(this.cards[0].suit !== trumpSuit && this.cards[1].suit == trumpSuit) {
                opponentPoints += this.cards[0].points + this.cards[1].points;
                playFirst = OPPONENT;
            }
            else if(this.cards[0].suit == trumpSuit && this.cards[1].suit !== trumpSuit) {
                playerPoints += this.cards[0].points + this.cards[1].points;
                playFirst = PLAYER;
            }
        }
        else {
            if(this.cards[0].value >= this.cards[1].value) {
                playerPoints += this.cards[0].points + this.cards[1].points;
                playFirst = PLAYER;
            }
            else {
                opponentPoints += this.cards[0].points + this.cards[1].points;
                playFirst = OPPONENT;
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
    
    let randomStart = floor(random(1, 3));

    if(randomStart == 1) {
        whoseTurn = PLAYER;
        playFirst = PLAYER;
    }
    if(randomStart == 2) {
        whoseTurn = OPPONENT;
        playFirst = OPPONENT;
    }

    playerPoints = 0;
    opponentPoints = 0;

    deck = new Deck(0, (height / 2 - cardHeight / 2));
    deck.sortDeck();
    deck.assignPoints()

    playerHand = new Hand((width / 2 - cardWidth * 1.5), height - cardHeight, false);
    opponentHand = new Hand((width / 2 - cardWidth * 1.5), 0, true);
    inPlay = new InPlay((width / 2 - cardWidth / 2), height / 2);

    oppPlayButton = createButton("OPP PLAY");
    endSequence = createButton("END SEQ");

    deck.shuffle(deck.cards);

    deck.dealCards();
    trumpSuit = deck.cards[deck.cards.length - 1].suit;

    currentStage = START;
}

function draw() {
    background(0, 50, 50);

    console.log(currentStage)

    if(currentStage == START) {
        playerHand.draw();
        opponentHand.draw();
        deck.draw();
        inPlay.draw();
        whoPlaysFirst();
        oppPlayButton.mousePressed(nextTurn);
        endSequence.mousePressed(nextSequence);
    }

    else if(currentStage == PLACE_CARDS) {
        playerHand.draw();
        opponentHand.draw();
        deck.draw();
        inPlay.draw();
        whoPlaysFirst();
        oppPlayButton.mousePressed(nextTurn);
        endSequence.mousePressed(nextSequence);

        if(inPlay.cards.length == 0) {
            endGame();
        }
    }

    else if(currentStage == DRAW_CARD) {
        playerHand.draw();
        opponentHand.draw();
        deck.draw();
        inPlay.draw();
        whoPlaysFirst();
        oppPlayButton.mousePressed(nextTurn);
        endSequence.mousePressed(nextSequence);
    }

    else if(currentStage == END_GAME) {
        endScreen();
    }
        
}

function createCard(s, v, p) {
    return {
        suit: s,
        value: v,
        points: p,
    }
}

function mousePressed() {
    if(deck.cards.length > 0) {
        if(playerHand.cards.length > 2) {
            playerHand.mouseOnCard(mouseX, mouseY)
        }
        if(currentStage == DRAW_CARD) {
            deck.mouseOnDeck(mouseX, mouseY);
        }
    }
    else {
        playerHand.mouseOnCard(mouseX, mouseY)
    }
    
    console.log(inPlay.cards)
    console.log(whoseTurn)
    console.log(playFirst)
    // console.log(deck.cards.length)

    console.log("playerPoints: ", playerPoints, "opponentPoints: ", opponentPoints)
}

function whoPlaysFirst() {
    let xPos = width - 50;
    let yPos;

    fill(255);
    stroke(0);
    if(playFirst == PLAYER) {
        yPos = width - 50;
    }
    else if(playFirst == OPPONENT) {
        yPos = 50;
    }
    
    rect(xPos, yPos, 10, 10);
}

function nextTurn() {
    let cardPlayed = floor(random(0, 3));

    if(inPlay.cards.length !== 2 && currentStage !== DRAW_CARD) {
        if(whoseTurn == OPPONENT) {
            if(opponentHand.cards.length > 2) {
                inPlay.cards.push(opponentHand.cards[cardPlayed]);
                opponentHand.cards.splice(cardPlayed, 1);
            }
            else {
                inPlay.cards.push(opponentHand.cards[0]);
                opponentHand.cards.splice(0, 1);
            }

            if(playFirst == OPPONENT) {
                inPlay.y = (width / 2) - cardHeight;
            }

            whoseTurn = PLAYER;
        }
        
        if(inPlay.cards.length == 2) {
            inPlay.countPoints();
        }
    }
    
}

function nextSequence() {
    if(inPlay.cards.length == 2) {
        if(deck.cards.length > 0) {
            currentStage = DRAW_CARD;
        }
        
        for(let i = 0; i < 2; i++) {
            inPlay.cards.splice(i, 2);
        }

        if(playFirst == OPPONENT) {
            if(whoseTurn == PLAYER) {
                whoseTurn = playFirst;
            }
        }


        else if(playFirst == PLAYER) {
            if(whoseTurn == OPPONENT) {
                whoseTurn = playFirst;
            }
        }
    }
}

function endGame() {
    if(playFirst == OPPONENT) {
        if(playerHand.cards.length == 0) {
            currentStage = END_GAME;
        }
    }
    else if(playFirst == PLAYER) {
        if(opponentHand.cards.length == 0) {
            currentStage = END_GAME;
        }
    }
}

function endScreen() {
    textAlign(CENTER, CENTER);
    text("Opponent: " + opponentPoints, width / 2, 150);
    text("Player: " + playerPoints, width / 2, height - 150);
}