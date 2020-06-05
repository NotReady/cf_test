// libraries
const webdriver = require("selenium-webdriver");
const { By, until } = webdriver;
// utirities
const factory  = require("../driverUtil.js");
const screenshotUtil  = require("../screenshotUtil");
const generalUtil  = require("../generalUtil");
let driver;

/**
 * テストケース1つあたりのタイムアウト(msec)
 */
jest.setTimeout(60000);

const itTemeOutSecounds = 1000 * 60
    
// テストグループ
describe("デモ", () => {
  
  beforeAll(() => {
        // driverを取得します
        driver = factory.getDriver("chrome");
  });

  afterAll(() => {
    return driver.quit();
  });

  /**
   * @note トップページを表示し、レスポンスをタイトルの一致で検証します
   */
  it("サイトルートの疎通テスト", async () => {
    
    generalUtil.InfoLog("サイトルートの疎通テスト開始");
    await driver.get("https://n-ippo.jp/");

    // トップページのロード待ち
    //await driver.wait(until.titleContains('セキュリテ - インパクト投資プラットフォーム'), 10000);
    
    await driver.getTitle().then(function (title) {
      expect(title).toBe("にいがた、いっぽ　新しいことを始めたいあなたと、夢のあるプロジェクトを応援したいあなたをつなぎます。");
    });

    generalUtil.InfoLog("サイトルートの疎通テスト完了");
  });

  /**
   * @note ログインページへのクリック遷移を検証します
   */
  it("ログインページの遷移テスト", async () => {

    generalUtil.InfoLog("ログインページの疎通テスト開始");

    // ログインのリンク要素
    var aButton = await driver.findElement(By.xpath("/html/body/header/div/div/div/span/a[2]"));
    var href = await aButton.getAttribute("href");

    // クリック遷移
    await aButton.click();
    var checkUrl = await driver.getCurrentUrl();

    await driver.wait(until.urlIs(checkUrl), itTemeOutSecounds);
    
    // URL一致で疎通確認
    expect(checkUrl).toBe(href);

    generalUtil.InfoLog("ログインページの疎通テスト完了");
  });

  /**
   * @note ログインIDをお忘れの方へのクリック遷移を検証します
   */
  it("ログインIDをお忘れの方遷移テスト", async () => {

    generalUtil.InfoLog("ログインIDをお忘れの方遷移テスト開始");
    
    // ログインIDをお忘れの方リンク要素
    aButton = await driver.findElement(By.xpath('//*[@id="registration-page"]/div/div[2]/fieldset/form/div[1]/div/p/a'));
    var href = await aButton.getAttribute("href");

    // クリック遷移
    await aButton.click();
    var checkUrl = await driver.getCurrentUrl();

    await driver.wait(until.urlIs(checkUrl), itTemeOutSecounds);
    
    // URL一致で疎通確認
    expect(checkUrl).toBe(href);

    generalUtil.InfoLog("ログインIDをお忘れの方遷移テスト完了");
  });


  
});
