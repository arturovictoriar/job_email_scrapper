const puppeteer = require('puppeteer');

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
    this.pageCurriculum = null;
  }

  async startBrowser(showBrowser = false, showDevTools = false, isDeploy = true) {
    const options = [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--headless',
      '--disable-gpu',
      '--disable-dev-shm-usage',
    ];
    this.browser = await puppeteer.launch({
      devtools: showDevTools,
      headless: !showBrowser,
      args: isDeploy ? options : [],
    });
    this.page = await this.browser.newPage();
    const pageList = await this.browser.pages();
    pageList[0].close();
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

  async getNameCompany(result) {
    for (const key in result) {
      if (key) {
        await this.page.click(result[key]);
        await this.page.waitFor(1000);
        const pageList = await this.browser.pages();
        await this.page.waitFor(1000);
        await pageList[pageList.length - 1].bringToFront();
        await pageList[pageList.length - 1].waitForSelector(
          'body > div.container.detalle > div > div:nth-child(2) > section > article > h4:nth-child(8)'
        );
        const selectorCompany =
          'body > div.container.detalle > div > div:nth-child(2) > section > article';
        const company = await pageList[pageList.length - 1].evaluate((selectorCompany) => {
          const infoJob = document.querySelector(selectorCompany).innerText.split('\n');
          if (infoJob[13] === 'Descripción de la Plaza') {
            return infoJob[14];
          }
          let index = 1;
          while (infoJob[13 + index] !== 'Descripción de la Plaza') {
            index++;
          }
          return infoJob[13 + index + 1];
        }, selectorCompany);
        // eslint-disable-next-line no-param-reassign
        result[key] = company;
        pageList[pageList.length - 1].close();
      }
    }
    return result;
  }

  async getNamesJobs() {
    const result = await this.page.evaluate(() => {
      const rows = document.querySelectorAll(
        'body > div.container > div > div > section > article > div.row.padd_arriba > div > table > tbody > tr'
      );
      const namesJobs = {};
      for (const [index, row] of rows.entries()) {
        const jobSelector = `body > div.container > div.white-container > div > section > article > div.row.padd_arriba > div > table > tbody > tr:nth-child(${
          index + 1
        }) > td:nth-child(6) > a:nth-child(2)`;
        namesJobs[
          row.querySelector('td:nth-child(1) > strong').innerText
        ] = `https://www.unmejorempleo.com.co/${document
          .querySelector(jobSelector)
          .getAttribute('href')}`;
      }
      return namesJobs;
    });
    // const JobsandCompanyNames = await this.getNameCompany(result);
    // return JobsandCompanyNames;
    return result;
  }

  static async appendSelectorNameJobs(nameJobsDic) {
    const nameJobs = Object.keys(nameJobsDic);
    const jobOffers = {};
    for (let index = 1; index <= nameJobs.length; index++) {
      jobOffers[nameJobs[index - 1]] = {
        company: nameJobsDic[nameJobs[index - 1]],
        emails: [
          `body > div.container > div > div > section > article > div.row.padd_arriba > div > table > tbody > tr:nth-child(${index}) > td:nth-child(6) > a:nth-child(1)`,
        ],
      };
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
            const SelectorHref = `body > div.container.resultados > div > div > section > article > table tr#${rowId} > td:nth-child(7) > a:nth-child(1)`;
            const href = document.querySelector(SelectorHref).getAttribute('href');
            return `https://www.unmejorempleo.com.co/${href}`;
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
    const candidateCurrriculumLink = allCurriculumSelectors[index].email;
    const selectorCorreo = 'body > div > div:nth-child(2) > div.col-xs-12.col-md-6.text-left > h4';
    this.pageCurriculum = await this.browser.newPage();
    await this.pageCurriculum.goto(candidateCurrriculumLink);
    await this.pageCurriculum.waitFor(1000);
    await this.pageCurriculum.bringToFront();
    await this.pageCurriculum.waitForSelector(selectorCorreo);
  }

  async getOneEmail() {
    const selectorCorreo = 'body > div > div > div > div.dato_borde';
    const email = await this.pageCurriculum.evaluate((selectorCorreo) => {
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
    await this.pageCurriculum.close();
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