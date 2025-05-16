class Deck {
    constructor() {
        this.cards = [];
        this.values = [2, 3, 4, 5, 6, 7, "Q", "J", "K", "A"];
        this.suits = ["Spades", "Clubs", "Diamonds", "Hearts"];
    }
}

function setup()
{
    createCanvas(600, 600);
    rectMode(CENTER);
}

function draw()
{
    background(0, 50, 50);
}

function createCard(x, y, s, v) {
    return {
        x: x, 
        y: y,
        suit: s,
        value: v,

    }
}