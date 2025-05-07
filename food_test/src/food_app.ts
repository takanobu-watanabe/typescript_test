interface IScore {
    totalScore: number;
    render(): void;
    setFoods(foods: IFoodCollection): void;
}

interface IFood {
    score: number;
    isActive: boolean;
}

interface IFoodCollection {
    calculateTotalScore(): number;
}

class Score implements IScore {
    private scoreElement: HTMLDivElement;
    private foods: IFoodCollection | null = null;

    constructor(foods: IFoodCollection | null) {
        const element = document.querySelector<HTMLDivElement>('.score__number');
        if (!element) {
            throw new Error("Score element not found. Please ensure '.score__number' exists in the DOM");
        }
        this.scoreElement = element;
        this.foods = foods;
    }

    setFoods(foods: IFoodCollection): void {
        this.foods = foods;
    }

    get totalScore(): number {
        if (!this.foods) {
            throw new Error("Foods is not set");
        }

        return this.foods.calculateTotalScore();
    }

    render(): void {
        this.scoreElement.textContent = this.totalScore.toString();
    }
}

export class Food implements IFood {
    private element: HTMLDivElement;
    private scoreInstance: Score;
    private boundHandleClick: (event: Event) => void;

    constructor(element: HTMLDivElement, scoreInstance: Score) {
        this.element = element;
        this.scoreInstance = scoreInstance;
        this.boundHandleClick = this.handleClick.bind(this);
        element.addEventListener('click', this.boundHandleClick);
    }

    private handleClick(): void {
        this.toggleActive();
        this.updateScore();
    }

    public toggleActive(): void {
        this.element.classList.toggle('food--active');
    }

    public updateScore(): void {
        this.scoreInstance.render();
    }

    private cleanup(): void {
        this.element.removeEventListener('click', this.boundHandleClick);
    }

    public destroy(): void {
        this.cleanup();
    }

    public get score(): number {
        const score = this.element.querySelector('.food__score')?.textContent ?? '0';
        return Number(score) || 0;
    }

    public get isActive(): boolean {
        return this.element.classList.contains('food--active');
    }

    // innerHTML使用時のサニタイズ処理の追加を推奨
    private sanitizeContent(content: string): string {
        // サニタイズ処理の実装
        return content.replace(/<script.*?>/g, '');
    }
}

export class Foods implements IFoodCollection {
    private elements: HTMLDivElement[];
    private _foodInstances: Food[];
    
    constructor(private scoreInstance: Score) {
        this._foodInstances = [];
        this.elements = Array.from(document.querySelectorAll<HTMLDivElement>('.food'));
        this.elements.forEach(element => {
            const food = new Food(element, scoreInstance);
            this._foodInstances.push(food);
        });
    }
    public get activeFoods(): Food[] {
        return this._foodInstances.filter(food => food.isActive);
    }

    public set activeFoods(value: Food[]) {
        this._foodInstances = value;
    }
    
    public getFoodInstances(): Food[] {
        return this._foodInstances;
    }

    public set foodInstances(value: Food[]) {
        this._foodInstances = value;
    }
    
    public calculateTotalScore(): number {
        return this.activeFoods.reduce((total, food) => total + food.score, 0);
    }
    
}

class FoodAppFactory {
    static create(): { score: Score; foods: Foods } {
        const initialScore = new Score(null);
        const foods = new Foods(initialScore);
        initialScore.setFoods(foods);
        return { score: initialScore, foods };
    }
}

export class FoodApp {
    private score: Score;
    private foods: Foods;

    private constructor() {
        const { score, foods } = FoodAppFactory.create();
        this.score = score;
        this.foods = foods;
    }

    public static initialize(): FoodApp {
        return new FoodApp();
    }

    private static cleanup(): void {
        document.removeEventListener('DOMContentLoaded', FoodApp.initialize);
    }

    public getScore(): Score {
        return this.score;
    }
    public getFoods(): Foods {
        return this.foods;
    }
}

let app: FoodApp;

//domContentLoadedイベントを待ってから初期化
document.addEventListener('DOMContentLoaded', () => {
    app = FoodApp.initialize();
});


