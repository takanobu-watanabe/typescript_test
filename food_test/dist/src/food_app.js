export class Score {
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
            throw new Error('Foods collection not set');
        }
        return this.foods.calculateTotalScore();
    }
    render() {
        this.scoreElement.textContent = this.totalScore.toString();
    }
}
export class Food {
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
    // デストラクタメソッドの追加
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
export class Foods {
    constructor(scoreInstance) {
        this.scoreInstance = scoreInstance;
        this.elements = Array.from(document.querySelectorAll('.food'));
        this.foodInstances = this.elements.map(element => new Food(element, scoreInstance));
    }
    get activeFoods() {
        return this.foodInstances.filter(food => food.isActive);
    }
    calculateTotalScore() {
        return this.activeFoods.reduce((total, food) => total + food.score, 0);
    }
    getfoodInstances() {
        return this.foodInstances;
    }
}
export class FoodAppFactory {
    static create() {
        const initialScore = new Score(null);
        const foods = new Foods(initialScore);
        initialScore.setFoods(foods);
        return { score: initialScore, foods };
    }
}
export class FoodApp {
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
//const app = FoodApp.initialize();
