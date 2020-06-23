/**
 * Class MejorEmpleo scraps emails in "un mejor empleo" job board using node js and puppeter
 */

// Import puppeter library which simulate human interaction
const puppeteer = require('puppeteer');

// Set the url of the job Board (strings)
const BASE_URL = 'https://www.unmejorempleo.com.co/';

// Set the selectors to navegate in the job Board (strings)
const VACANTES_PUBLICADAS =
  'body > div.container.resultados > div > div > section > article > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(3) > a';
const REVIEW_APLICACIONES =
  'body > div.container > div > div > section > article > div.row.padd_arriba > div > table > tbody > tr > td:nth-child(6) > a:nth-child(1)';
const RETURN_VACANTES =
  'body > div.container.resultados > div > div > section > article > div.row > div > button:nth-child(2)';

/**
 * Class MejorEmpleo scraps emails in "un mejor empleo" job board
 */
class MejorEmpleo {
  /**
   * Initialize the puppeter public variables (objects)
   * @date 2020-06-22
   * @returns {any}
   */
  constructor() {
    this.browser = null;
    this.page = null;
    this.pageCurriculum = null;
  }

  /**
   * startBrowser: Initialize a chromiun browser and a page with puppeter
   * @date 2020-06-22
   * @param {any} showBrowser=false. true if you want to check the process otherwise false (boolean)
   * @param {any} showDevTools=false. true if you want to inspect the page otherwise false (boolean)
   * @param {any} isDeploy=true. true in production to not use the grafic card otherwise false (boolean)
   * @returns {any}
   */
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

  /**
   * closeBrowser: close the chromiun browser
   * @date 2020-06-22
   * @returns {any}
   */
  async closeBrowser() {
    this.browser.close();
  }

  /**
   * login: log in into "un mejor empleo" account
   * @date 2020-06-22
   * @param {any} username user credential of "un mejor empleo" account (string)
   * @param {any} password password credential of "un mejor empleo" account (string)
   * @returns {any}
   */
  async login(username, password) {
    await this.page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    await this.page.type('#form_login > div:nth-child(1) > input', username, { delay: 50 });
    await this.page.type('#form_login > div:nth-child(2) > input', password, { delay: 50 });
    const loginButton = await this.page.$('#form_login > div.form-group.text-right > button');
    await loginButton.click();
    await this.page.waitForSelector(
      'body > div.container.resultados > div > div > section > article > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(3) > a'
    );
  }

  /**
   * getNamesJobs: Get the Job Name and URL using HTML selectors
   * @date 2020-06-22
   * @returns {any} a list of objects containing names and links job Offers
   */
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
        const vacancy = row.querySelector('td:nth-child(1) > strong').innerText;
        if (!(vacancy in namesJobs)) {
          namesJobs[vacancy] = [];
        }
        namesJobs[vacancy].push(
          `https://www.unmejorempleo.com.co/${document
            .querySelector(jobSelector)
            .getAttribute('href')}`
        );
      }
      return namesJobs;
    });
    return result;
  }

  /**
   * appendSelectorNameJobs: create an object to organize the emails applicants by link and name Jobs
   * @date 2020-06-22
   * @param {any} nameJobsDic Names and Links Jobs List
   * @returns {any} Object of objects containing name, link and selector of the applicants' job
   */
  static async appendSelectorNameJobs(nameJobsDic) {
    const nameJobs = Object.keys(nameJobsDic);
    const jobOffers = {};
    let numLinkCompany = 0;
    for (let index = 1; index <= nameJobs.length; index++) {
      jobOffers[nameJobs[index - 1]] = [];
      for (const linkCompany of nameJobsDic[nameJobs[index - 1]]) {
        numLinkCompany++;
        jobOffers[nameJobs[index - 1]].push({
          company: linkCompany,
          emails: [
            `body > div.container > div > div > section > article > div.row.padd_arriba > div > table > tbody > tr:nth-child(${numLinkCompany}) > td:nth-child(6) > a:nth-child(1)`,
          ],
        });
      }
    }
    return jobOffers;
  }

  /**
   * gotoVacantesPublicadas: go into the Job Offers published
   * @date 2020-06-22
   * @returns {any} Ok on success otherwise undefined
   */
  async gotoVacantesPublicadas() {
    let isDead = false;
    await this.page.click(VACANTES_PUBLICADAS, { waitUntil: 'networkidle2' });
    await this.page.waitForSelector(REVIEW_APLICACIONES).catch(() => {
      isDead = true;
    });
    if (isDead) {
      return undefined;
    }
    return 'Ok';
  }

  /**
   * gotoReviewApplication: go into the Job Offer published
   * @date 2020-06-22
   * @param {any} REVIEWAPLICACIONES Job Offer selector
   * @returns {any} Ok on success otherwise undefined
   */
  async gotoReviewApplication(REVIEWAPLICACIONES) {
    await this.page.waitForSelector(REVIEWAPLICACIONES);
    await this.page.click(REVIEWAPLICACIONES, { waitUntil: 'networkidle2' });
    const noCandidatesSelector =
      'body > div.container.resultados > div > div > section > article > table tr';
    let isDead = false;
    try {
      await this.page.waitForSelector(noCandidatesSelector, { timeout: 5000 });
    } catch {
      isDead = true;
    }
    if (isDead) {
      return undefined;
    }
    return 'Ok';
  }

  /**
   * returnVacantesAplicadas: go back to applicants list
   * @date 2020-06-22
   * @returns {any}
   */
  async returnVacantesAplicadas() {
    await this.page.waitForSelector(RETURN_VACANTES);
    await this.page.goBack();
  }

  /**
   * getBasicInfoCandidate: get
   * @date 2020-06-22
   * @returns {any} name, gendre, state, age, date, read and link curriculum
   */
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

  /**
   * curriculumSelectors: get the curriculum whose candidate have no been scraped
   * @date 2020-06-22
   * @param {any} result all applicants' curriculums
   * @returns {any} candidates have no been scraped
   */
  static async curriculumSelectors(result) {
    const allCurriculumSelectors = [];
    result.forEach((item) => {
      if (item.length && item[item.length - 2] === 'NO') {
        allCurriculumSelectors.push({ name: item[0], email: item[item.length - 1] });
      }
    });
    return allCurriculumSelectors;
  }

  /**
   * gotoCurriculum: go to the curriculum's applicant link
   * @date 2020-06-22
   * @param {any} allCurriculumSelectors list of all applicants' curriculums have no been scraped
   * @param {any} index determinate the applicant in the list
   * @returns {any}
   */
  async gotoCurriculum(allCurriculumSelectors, index) {
    const candidateCurrriculumLink = allCurriculumSelectors[index].email;
    const selectorCorreo = 'body > div > div:nth-child(2) > div.col-xs-12.col-md-6.text-left > h4';
    this.pageCurriculum = await this.browser.newPage();
    await this.pageCurriculum.goto(candidateCurrriculumLink, { waitUntil: 'networkidle2' });
    await this.pageCurriculum.waitFor(1000);
    await this.pageCurriculum.bringToFront();
    await this.pageCurriculum.waitForSelector(selectorCorreo);
  }

  /**
   * getOneEmail: get the applicant's email
   * @date 2020-06-22
   * @returns {any} applicant's email
   */
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

  /**
   * goBackCandidate: return to the list of applicants
   * @date 2020-06-22
   * @returns {any}
   */
  async goBackCandidate() {
    await this.pageCurriculum.close();
  }

  /**
   * getEmails: get all applicants' emails of a job offer recursively
   * @date 2020-06-22
   * @param {any} allCurriculumSelectors list of all applicants' curriculums have no been scraped
   * @param {any} emails all the applicants' emails
   * @param {any} index determinate the applicant in the list
   * @returns {any} a list of emails
   */
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

  /**
   * getPagesVacancies: check if exist a nex page of job offers
   * @date 2020-06-22
   * @returns {any} a number on succes otherwise undefined
   */
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

  /**
   * changePageVacancies: go to the next page of job offers
   * @date 2020-06-22
   * @param {any} nextPage number of the next page
   * @returns {any} Ok on success otherwise undefined
   */
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

  /**
   * morePageVacancies: check if are there more pages of job offers
   * @date 2020-06-22
   * @returns {any} true on succes otherwise false
   */
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
// export the class
module.exports = { MejorEmpleo };
