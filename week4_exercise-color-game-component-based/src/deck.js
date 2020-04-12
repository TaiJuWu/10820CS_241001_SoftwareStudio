import Component from './component.js';
import Card from './card.js';

import './deck.css';

/*
 * [Event name: params]
 * wrongClick: this
 * rightClick: this, pickedColor
 */
export default class Deck extends Component {
    static getRootClass() {
        return '.deck';
    }

    constructor(root) {
        super(root);

        this.gameOver = false;
        this.cardNumber = 3;
        this.cards = [];
        const els = root.querySelectorAll(Card.getRootClass());
        for (let el of els) {
            const card = new Card(el);
            card.on('click', this.handleCardClick.bind(this));
            this.cards.push(card);
        }
        this.pickedColor = this.pickColor();
    }

    reset() {
        this.gameOver = false;
        for (let card of this.cards)
            card.reset();
        this.pickedColor = this.pickColor();
    }

    getPickedColor() {
        return this.pickedColor;
    }

    handleCardClick(firer, color) {
        if (this.gameOver)
            return;

        if (color === this.pickedColor) {
            this.gameOverFadeInCards();
            this.fire('rightClick', this.pickedColor);
        } else {
            firer.fadeOut();
            this.fire('wrongClick');
        }
    }

    pickColor() {
        const random = Math.floor(Math.random() * this.cards.length);
        return this.cards[random].getColor();
    }

    gameOverFadeInCards(){
        for (let card of this.cards){
            card.fadeIn("#FFF");
        }
        this.gameOver = true;
    }

    chmod(mode){
        if(mode === 'Easy'){
            this.cardNumber = 3;
        }
        else if(mode === 'Hard'){
            this.cardNumber = 6;
        }
        else if(mode === 'Nightmare'){
            this.cardNumber = 9;
        }

        let t = '<div class="card"></div>';
        this.root.innerHTML = t.repeat(this.cardNumber);
        this.cards = [];
        const els = this.root.querySelectorAll(Card.getRootClass());
        for (let el of els) {
            const card = new Card(el);
            card.on('click', this.handleCardClick.bind(this));
            this.cards.push(card);
        }
    }
}
