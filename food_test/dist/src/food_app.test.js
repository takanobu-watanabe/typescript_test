//import { JSDOM } from 'jsdom';
const { JSDOM } = require('jsdom');
import { FoodApp } from './food_app';
describe('Food クラスのテスト', () => {
    let app;
    let document;
    let foodElements;
    beforeAll(() => {
        // 各テスト前に新しいDOM環境を作成
        const dom = new JSDOM(`<!DOCTYPE html>
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
            </html>`, {
            url: "http://localhost",
            runScripts: "dangerously",
            resources: "usable",
            pretendToBeVisual: true
        });
        // グローバル変数に割り当て
        global.document = dom.window.document;
        global.window = dom.window;
        //document = dom.window.document;
        console.log("hello");
    });
    // スコア表示のテスト
    test('初期スコアが0であること', () => {
        if (global.document.readyState === 'complete') {
            app = FoodApp.initialize();
        }
        // テストで使用するDOMエレメントを取得
        foodElements = Array.from(global.document.querySelectorAll('.food'));
        const scoreElement = global.document.querySelector('.score__number');
        console.log(scoreElement);
        expect(scoreElement).not.toBeNull();
        expect(scoreElement?.textContent).toBe('0');
    });
});
