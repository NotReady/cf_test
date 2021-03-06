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
    await driver.get("https://fan-akita.sakigake.jp");

    // トップページのロード待ち
    //await driver.wait(until.titleContains('セキュリテ - インパクト投資プラットフォーム'), 10000);
    
    await driver.getTitle().then(function (title) {
      expect(title).toBe("FAN AKITA(ファンあきた)");
    });

    generalUtil.InfoLog("サイトルートの疎通テスト完了");
  });

  /**
   * @note ログインページへのクリック遷移を検証します
   */
  it("ログインページの遷移テスト", async () => {

    generalUtil.InfoLog("ログインページの疎通テスト開始");

    // ログインのリンク要素
    var aButton = await driver.findElement(By.xpath("/html/body/div[3]/div/div[2]/ul/li[4]/a"));
    var href = await aButton.getAttribute("href");

    // クリック遷移待ち
    await aButton.click();
    await driver.wait(until.urlIs(href), itTemeOutSecounds);

    // URL一致で疎通確認
    var checkUrl = await driver.getCurrentUrl();
    expect(checkUrl).toBe(href);

    generalUtil.InfoLog("ログインページの疎通テスト完了");
  });

  /**
   * @note ログインIDをお忘れの方へのクリック遷移を検証します
   */
  it("ログインIDをお忘れの方遷移テスト", async () => {

    generalUtil.InfoLog("ログインIDをお忘れの方遷移テスト開始");
    
    // ログインIDをお忘れの方リンク要素
    aButton = await driver.findElement(By.xpath('/html/body/div[4]/div/div/div[1]/form/div/div/div[2]/div/div/dl/dd/div/a'));
    var href = await aButton.getAttribute("href");

    // クリック遷移
    await aButton.click();
    await driver.wait(until.urlIs(href), itTemeOutSecounds);

    // URL一致で疎通確認
    var checkUrl = await driver.getCurrentUrl();
    expect(checkUrl).toBe(href);

    generalUtil.InfoLog("ログインIDをお忘れの方遷移テスト完了");
  });

  /**
   * @note ログインIDリマインダーでメール疎通を検証します
   */
  it("メール疎通テスト", async () => {

    generalUtil.InfoLog("メール疎通テスト開始");
    
    // ログインフォームを入力してログイン
    await driver.findElement(By.xpath('/html/body/div[4]/div/div/form/div/div[1]/div/div[3]/div[2]/div/div[1]/input')).sendKeys(process.env.BIRTH_Y);
    await driver.findElement(By.xpath('/html/body/div[4]/div/div/form/div/div[1]/div/div[3]/div[2]/div/div[2]/select')).sendKeys(process.env.BIRTH_M);
    await driver.findElement(By.xpath('/html/body/div[4]/div/div/form/div/div[1]/div/div[3]/div[2]/div/div[3]/select')).sendKeys(process.env.BIRTH_D);
    await driver.findElement(By.xpath('/html/body/div[4]/div/div/form/div/div[1]/div/div[5]/div[2]/div/input[1]')).sendKeys(process.env.CF_MAIL_USER);
    await driver.findElement(By.xpath('/html/body/div[4]/div/div/form/div/div[1]/div/div[5]/div[2]/div/input[2]')).sendKeys(process.env.CF_MAIL_DOMAIN);
    await driver.findElement(By.xpath('/html/body/div[4]/div/div/form/div/div[2]/div[2]/div/div/input')).click();

    const successUrl = "https://fan-akita.sakigake.jp/member/recover/login/thanks";
    await driver.wait(until.urlIs(successUrl), itTemeOutSecounds);
    
    // URL一致で疎通確認
    var checkUrl = await driver.getCurrentUrl();
    expect(checkUrl).toBe(successUrl);

    generalUtil.InfoLog("メール疎通テストテスト完了");
  });

  
});
