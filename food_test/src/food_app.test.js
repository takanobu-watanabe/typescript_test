"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
const food_app_1 = require("./food_app");
describe('Food クラスのテスト', () => {
    let app;
    let dom;
    let foodElements;
    beforeAll(() => {
        // 各テスト前に新しいDOM環境を作成
        dom = new jsdom_1.JSDOM();
        global.document = dom.window.document;
        global.document.body.innerHTML = `
            <!DOCTYPE html>
            <html>
            <body>
                <h1>Daily Food Score</h1>
                <div>
                    <h2>Today's Score</h2>
                    <div class="score">
                        <div class="score__circle">
                            <div class="score__number">0</div>
                        </div>
                    </div>
                </div>
                <div class="food">
                    <div class="food__name">Green, leafy vegetables</div>
                    <div class="food__score">+5</div>
                </div>
                <div class="food">
                    <div class="food__name">All other vegetables</div>
                    <div class="food__score">+2</div>
                </div>
            </body>
            </html>`;
        //document = dom.window.document;
        if (global.document.readyState === 'complete') {
            app = food_app_1.FoodApp.initialize();
        }
    });
    // スコア表示のテスト
    test('初期スコアが0であること', () => {
        // テストで使用するDOMエレメントを取得
        foodElements = Array.from(global.document.querySelectorAll('.food'));
        const scoreElement = global.document.querySelector('.score__number');
        expect(scoreElement).not.toBeNull();
        expect(scoreElement?.textContent).toBe('0');
    });
    // Foodクラスの toggleActive メソッドのテスト
    test('食品のtoggleActiveメソッドがDOMクラスを正しく切り替えること', () => {
        console.log('toggleActiveメソッドのテストを実行中...');
        const foods = app.getFoods();
        const food = foods.activeFoods.length > 0 ? foods.activeFoods[0] :
            app.getFoods().getFoodInstances()[0]; // publicアクセサーを追加する必要あり
        // 初期状態の確認
        const initialIsActive = food.isActive;
        expect(initialIsActive).toBe(false); // 初期状態は非アクティブであることを期待
        // toggleActiveを呼び出し
        food.toggleActive();
        // DOMが正しく更新されたことを確認
        const foodElement = food instanceof food_app_1.Food ? food.element : null;
        expect(foodElement).not.toBeNull();
        expect(foodElement.classList.contains('food--active')).toBe(true);
        // isActiveゲッターが正しい値を返すことを確認
        expect(food.isActive).toBe(true);
        // もう一度toggleActiveを呼び出し
        food.toggleActive();
        // 再び非アクティブ状態に戻ったことを確認
        expect(foodElement.classList.contains('food--active')).toBe(false);
        expect(food.isActive).toBe(false);
    });
    // スコア計算のテスト
    test('アクティブな食品のスコアが正しく合計されること', () => {
        const foods = app.getFoods();
        const food1 = foods.getFoodInstances()[0];
        const food2 = foods.getFoodInstances()[1];
        // 初期スコアの確認
        expect(app.getScore().totalScore).toBe(0);
        // 1つ目の食品をアクティブにする
        food1.toggleActive();
        food1.updateScore();
        // スコアが更新されたことを確認
        expect(app.getScore().totalScore).toBe(5);
        // 2つ目の食品もアクティブにする
        food2.toggleActive();
        food2.updateScore();
        // スコアがさらに更新されたことを確認
        expect(app.getScore().totalScore).toBe(7);
    });
    // クリーンアップのテスト
    test('Food.destroy()がイベントリスナーを正しく削除すること', () => {
        const foods = app.getFoods();
        const food = foods.getFoodInstances()[0];
        const foodElement = food.element;
        // スパイを使ってイベントリスナーの削除を監視
        const removeEventListenerSpy = jest.spyOn(foodElement, 'removeEventListener');
        // destroyメソッドを呼び出し
        food.destroy();
        // removeEventListenerが呼ばれたことを確認
        expect(removeEventListenerSpy).toHaveBeenCalled();
        expect(removeEventListenerSpy).toHaveBeenCalledWith('click', food.boundHandleClick);
    });
});
