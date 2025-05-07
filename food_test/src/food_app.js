"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodApp = exports.FoodAppFactory = exports.Foods = exports.Food = exports.Score = void 0;
class Score {
    constructor(foods) {
        this.foods = null;
        const element = document.querySelector('.score__number');
        if (!element) {
            throw new Error("Score element not found");
        }
        this.scoreElement = element;
        this.foods = foods;
    }
    setFoods(foods) {
        this.foods = foods;
    }
    get totalScore() {
        if (!this.foods) {
            throw new Error("Foods is not set");
        }
        console.log(this.foods);
        //return this.foods.calculateTotalScore();
        return 10;
    }
    render() {
        this.scoreElement.textContent = this.totalScore.toString();
    }
}
exports.Score = Score;
class Food {
    constructor(element, scoreInstance) {
        this.element = element;
        this.scoreInstance = scoreInstance;
        this.boundHandleClick = this.handleClick.bind(this);
        element.addEventListener('click', this.boundHandleClick);
    }
    handleClick() {
        this.toggleActive();
        this.updateScore();
    }
    toggleActive() {
        this.element.classList.toggle('food--active');
    }
    updateScore() {
        this.scoreInstance.render();
    }
    cleanup() {
        this.element.removeEventListener('click', this.boundHandleClick);
    }
    destroy() {
        this.cleanup();
    }
    get score() {
        const foodScore = this.element.querySelector('.food__score');
        if (!foodScore || foodScore.textContent === null)
            return 0;
        const score = parseInt(foodScore.textContent);
        return isNaN(score) ? 0 : score;
    }
    get isActive() {
        return this.element.classList.contains('food--active');
    }
}
exports.Food = Food;
class Foods {
    constructor(scoreInstance) {
        this.scoreInstance = scoreInstance;
        this._foodInstances = [];
        this.elements = Array.from(document.querySelectorAll('.food'));
        this.elements.forEach(element => {
            const food = new Food(element, scoreInstance);
            console.log("hello");
            console.log(food);
            this._foodInstances.push(food);
        });
    }
    get activeFoods() {
        return this._foodInstances.filter(food => food.isActive);
    }
    set activeFoods(value) {
        this._foodInstances = value;
    }
    getFoodInstances() {
        return this._foodInstances;
    }
    set FoodInstances(value) {
        this._foodInstances = value;
    }
    calculateTotalScore() {
        console.log(this.activeFoods);
        return this.activeFoods.reduce((total, food) => total + food.score, 0);
    }
}
exports.Foods = Foods;
class FoodAppFactory {
    static create() {
        const initialScore = new Score(null);
        const foods = new Foods(initialScore);
        initialScore.setFoods(foods);
        return { score: initialScore, foods };
    }
}
exports.FoodAppFactory = FoodAppFactory;
class FoodApp {
    constructor() {
        const { score, foods } = FoodAppFactory.create();
        this.score = score;
        this.foods = foods;
    }
    static initialize() {
        return new FoodApp();
    }
    getScore() {
        return this.score;
    }
    getFoods() {
        return this.foods;
    }
}
exports.FoodApp = FoodApp;
let app;
//domContentLoadedイベントを待ってから初期化
document.addEventListener('DOMContentLoaded', () => {
    app = FoodApp.initialize();
});
