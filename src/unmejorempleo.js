const puppeteer = require('puppeteer');

const BASE_URL = 'https://www.unmejorempleo.com.co/';
const VACANTES_PUBLICADAS =
  'body > div.container.resultados > div > div > section > article > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(3) > a';
const REVIEW_APLICACIONES =
  'body > div.container > div > div > section > article > div.row.padd_arriba > div > table > tbody > tr > td:nth-child(6) > a:nth-child(1)';

class MejorEmpleo {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async startBrowser(showBrowser = false, showDevTools = false) {
    this.browser = await puppeteer.launch({
      devtools: showDevTools,
      headless: !showBrowser,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--headless',
        '--disable-gpu',
        '--disable-dev-shm-usage',
      ],
    });
    this.page = await this.browser.newPage();
    this.page.setViewport({ width: 1366, height: 768 });
  }

  async closeBrowser() {
    this.browser.close();
  }

  async login(username, password) {
    // const { page } = await this.startBrowser();
    await this.page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    await this.page.type('#form_login > div:nth-child(1) > input', username, { delay: 50 });
    await this.page.type('#form_login > div:nth-child(2) > input', password, { delay: 50 });

    const loginButton = await this.page.$('#form_login > div.form-group.text-right > button');
    await loginButton.click();
    /* button of vacantes publicadas */
    await this.page.waitForSelector(
      'body > div.container.resultados > div > div > section > article > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(3) > a'
    );
  }

  async gotoVacantesPublicadas() {
    await this.page.click(VACANTES_PUBLICADAS);
    await this.page.waitForSelector(REVIEW_APLICACIONES);
    await this.page.click(REVIEW_APLICACIONES);
  }
}

module.exports = { MejorEmpleo };
