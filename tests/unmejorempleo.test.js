const unmejorempleo = require('../src/util/unmejorempleo');

const BASE_URL = 'https://www.unmejorempleo.com.co/';
let browser;
let page;

beforeAll(async () => {
  const miEmpleo = new unmejorempleo.MejorEmpleo();
  await miEmpleo.startBrowser();
  browser = miEmpleo.browser;
  page = miEmpleo.page;
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
}, 10000);

describe('Unmejorempleo start', () => {
  test('has username input', async () => {
    const usernameInput = await page.$('#form_login > div:nth-child(1) > input');
    expect(usernameInput).toBeTruthy();
  }, 10000);

  test('has password input', async () => {
    const passwordInput = await page.$('#form_login > div:nth-child(2) > input');
    expect(passwordInput).toBeTruthy();
  }, 10000);

  afterAll(async () => {
    await browser.close();
  }, 10000);
});
