// eslint-disable-next-line import/no-extraneous-dependencies
const chromeLambda = require('chrome-aws-lambda');

const BASE_URL = 'https://www.unmejorempleo.com.co/';
const VACANTES_PUBLICADAS =
  'body > div.container.resultados > div > div > section > article > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(3) > a';
const REVIEW_APLICACIONES =
  'body > div.container > div > div > section > article > div.row.padd_arriba > div > table > tbody > tr > td:nth-child(6) > a:nth-child(1)';
const RETURN_VACANTES =
  'body > div.container.resultados > div > div > section > article > div.row > div > button:nth-child(2)';

class MejorEmpleo {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async startBrowser(showBrowser = false, showDevTools = false) {
    this.browser = await chromeLambda.puppeteer.launch({
      devtools: showDevTools,
      headless: !showBrowser,
      args: chromeLambda.args,
      executablePath: await chromeLambda.executablePath,
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

  async getNamesJobs() {
    const result = await this.page.evaluate(() => {
      const rows = document.querySelectorAll(
        'body > div.container > div > div > section > article > div.row.padd_arriba > div > table > tbody > tr'
      );
      const namesJobs = [];
      for (const row of rows) {
        namesJobs.push(row.querySelector('td:nth-child(1) > strong').innerText);
      }
      return namesJobs;
    });
    return result;
  }

  static async appendSelectorNameJobs(nameJobs) {
    const jobOffers = {};
    for (let index = 1; index <= nameJobs.length; index++) {
      jobOffers[nameJobs[index - 1]] = [
        `body > div.container > div > div > section > article > div.row.padd_arriba > div > table > tbody > tr:nth-child(${index}) > td:nth-child(6) > a:nth-child(1)`,
      ];
    }
    return jobOffers;
  }

  async gotoVacantesPublicadas() {
    let isDead = false;
    await this.page.click(VACANTES_PUBLICADAS);
    await this.page.waitForSelector(REVIEW_APLICACIONES).catch(() => {
      isDead = true;
    });
    if (isDead) {
      return undefined;
    }
    return 'Ok';
  }

  async gotoReviewApplication(REVIEWAPLICACIONES) {
    await this.page.waitForSelector(REVIEWAPLICACIONES);
    await this.page.click(REVIEWAPLICACIONES);
    let isDead = false;
    await this.page
      .waitForSelector('body > div.container.resultados > div > div > section > article > table tr')
      .catch(() => {
        isDead = true;
      });
    if (isDead) {
      return undefined;
    }
    return 'Ok';
  }

  async returnVacantesAplicadas() {
    await this.page.waitForSelector(RETURN_VACANTES);
    await this.page.goBack();
  }

  async getBasicInfoCandidate() {
    const result = await this.page.evaluate(() => {
      const rows = document.querySelectorAll(
        'body > div.container.resultados > div > div > section > article > table tr'
      );
      return Array.from(rows, (row) => {
        const rowId = row.getAttribute('id');
        const columns = row.querySelectorAll('td');
        return Array.from(columns, (column) => {
          if (column.hasAttribute('nowrap')) {
            return `body > div.container.resultados > div > div > section > article > table tr#${rowId} > td:nth-child(7) > a:nth-child(1)`;
          }
          return column.innerText;
        });
      });
    });
    return result;
  }

  static async curriculumSelectors(result) {
    const allCurriculumSelectors = [];
    result.forEach((item) => {
      if (item.length) {
        allCurriculumSelectors.push({ name: item[0], email: item[item.length - 1] });
      }
    });
    return allCurriculumSelectors;
  }

  async gotoCurriculum(allCurriculumSelectors, index) {
    const candidateCurrriculumSelector = allCurriculumSelectors[index].email;
    const selectorCorreo = '#modal_perfil > div > div > div.modal-body div.dato_borde';
    await this.page.waitForSelector(candidateCurrriculumSelector);
    await this.page.click(candidateCurrriculumSelector);
    await this.page.waitForSelector(selectorCorreo, { visible: true });
  }

  async getOneEmail() {
    const selectorCorreo = '#modal_perfil > div > div > div.modal-body div.dato_borde';
    const email = await this.page.evaluate((selectorCorreo) => {
      const sel = document.querySelectorAll(selectorCorreo);
      for (let i = 0; i < sel.length; i++) {
        if (sel[i].firstElementChild.innerText === 'Correo:') {
          return sel[i].innerHTML.split(';')[1];
        }
      }
      return '';
    }, selectorCorreo);
    return email;
  }

  async goBackCandidate() {
    const selectorClose = '#modal_perfil > div > div > div.modal-footer > button';
    await this.page.waitForSelector(selectorClose);
    await this.page.click(selectorClose);
    await this.page.waitFor(1000);
  }

  async getEmails(allCurriculumSelectors, emails, index) {
    if (index >= allCurriculumSelectors.length) {
      return emails;
    }

    await this.gotoCurriculum(allCurriculumSelectors, index);

    const email = await this.getOneEmail();

    emails.push({ name: allCurriculumSelectors[index].name, email });

    await this.goBackCandidate();

    return this.getEmails(allCurriculumSelectors, emails, index + 1);
  }

  async getPagesVacancies() {
    const selectorPagesVacancies =
      'body > div.container > div.white-container > div > section > article > div:nth-child(6) > div > ul > li';

    const pages = await this.page.evaluate((selectorPagesVacancies) => {
      const pagesVacancies = document.querySelectorAll(selectorPagesVacancies);
      if (pagesVacancies) {
        let currentPage = '';
        let currentPageChild = 1;
        for (const nextPage of pagesVacancies) {
          if (nextPage && nextPage.className === 'active') {
            currentPage = nextPage.querySelector('a').innerText;
            break;
          }
          currentPageChild++;
        }
        if (pagesVacancies[currentPageChild]) {
          const nextPage = pagesVacancies[currentPageChild].innerText;
          if (parseInt(currentPage, 10) + 1 === parseInt(nextPage, 10)) {
            return currentPageChild + 1;
          }
        }
      }
      return undefined;
    }, selectorPagesVacancies);
    return pages;
  }

  async changePageVacancies(nextPage) {
    const selectorNextPage = `body > div.container > div.white-container > div > section > article > div:nth-child(6) > div > ul > li:nth-child(${nextPage}) > a`;
    console.log(selectorNextPage);
    let isDead = false;
    await this.page.click(selectorNextPage);
    await this.page.waitForSelector(REVIEW_APLICACIONES).catch(() => {
      isDead = true;
    });
    if (isDead) {
      return undefined;
    }
    return 'Ok';
  }

  async morePageVacancies() {
    const nextPageChild = await this.getPagesVacancies();
    let changePageOk;
    if (nextPageChild) {
      changePageOk = await this.changePageVacancies(nextPageChild);
    }
    if (changePageOk) {
      return true;
    }
    return false;
  }
}

module.exports = { MejorEmpleo };
