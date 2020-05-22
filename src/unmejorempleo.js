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

  async getBasicInfoCandidate() {
    await this.page.waitForSelector('body > div.container.resultados > div > div > section > article > table tr');
    const result = await this.page.evaluate(() => {
      const rows = document.querySelectorAll('body > div.container.resultados > div > div > section > article > table tr');
      return Array.from(rows, row => {
        let rowId = row.getAttribute('id');
        const columns = row.querySelectorAll('td');
        return Array.from(columns, (column) => {
          if (column.hasAttribute('nowrap')) {
            console.log(rowId);
            return `body > div.container.resultados > div > div > section > article > table tr#${rowId} > td:nth-child(7) > a:nth-child(1)`;
          }
          return column.innerText;
        });
      });
    });
    return result;
  }

  async curriculumSelectors(result) {
    const allCurriculumSelectors = [];
    result.forEach((item) => {
      if (item.length) {
        allCurriculumSelectors.push(item[item.length - 1]);
      }
    });
    return allCurriculumSelectors;
  }

  async getEmail(allCurriculumSelectors, emails, index) {
    if (index >= allCurriculumSelectors.length) {
      return emails;
    }

    const modal = allCurriculumSelectors[index];
    const selectorClose = '#modal_perfil > div > div > div.modal-footer > button';
    const selectorCorreo = '#modal_perfil > div > div > div.modal-body div.dato_borde';
    await this.page.waitForSelector(modal);
    await this.page.click(modal);
    await this.page.waitForSelector(selectorCorreo, { visible: true });

    const email = await this.page.evaluate((selectorCorreo) => {
      const sel = document.querySelectorAll(selectorCorreo);
      console.log(sel);
      for (let i = 0; i < sel.length; i++) {
        if (sel[i].firstElementChild.innerText === 'Correo:') {

          return sel[i].innerHTML.split(';')[1];
        }
      }
    }, selectorCorreo);

    await this.page.waitForSelector(selectorClose);
    await this.page.click(selectorClose).then(() => {emails.push(email)});
    await this.page.waitFor(1000);
    
    return await this.getEmail(allCurriculumSelectors, emails, index + 1,);
  }

}

module.exports = { MejorEmpleo };
