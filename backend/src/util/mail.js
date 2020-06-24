/**
 * Class SendEmail sends emails to applicants using nodemailer library
 */
// Import nodemailer and gmail credentials
const nodemailer = require('nodemailer');
const C = require('../config/sendemail.config');

/**
 * Class SendEmail contact applicants by email
 */
class SendEmail {
  /**
   * Initialize the nodemailer public variables (objects)
   * @date 2020-06-22
   * @returns {any}
   */
  constructor() {
    this.transporter = null;
    this.mailOption = null;
  }

  /**
   * getNoSentCandidates: make a list of applicant who have no been sent a email
   * @date 2020-06-22
   * @param {any} offers
   * @returns {any} a list of emails order by job offer name and company
   */
  static async getNoSentCandidates(offers) {
    const AllcleanData = [];
    for (const offer of offers) {
      if (offer) {
        const cleanData = {};
        cleanData.vacancy = offer.name;
        cleanData.jobOfferId = offer.id;
        cleanData.companies = {};
        for (const candidate of offer.users) {
          if (candidate) {
            if (candidate.user_offer.emailSentAt === null) {
              if (!(candidate.user_offer.company in cleanData.companies)) {
                cleanData.companies[candidate.user_offer.company] = {
                  emails: [],
                  sentEmail: false,
                };
              }
              cleanData.companies[candidate.user_offer.company].emails.push(candidate.email);
            }
          }
        }
        AllcleanData.push(cleanData);
      }
    }
    return AllcleanData;
  }

  /**
   * configureTransporter: set up a SMTP transporter
   * @date 2020-06-22
   * @returns {any}
   */
  async configureTransporter() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        // Do not forget Disable Gmail Feature: https://myaccount.google.com/lesssecureapps
        // NOTE: Make sure you don't have 2 factor authentication enabled, if so,
        // you will not temporary deactivate it, or use another gmail account that
        // don't have it enabled.
        user: C.user, // gmail account
        pass: C.pass, // gmail password
      },
    });
  }

  /**
   * setEmails: save the email in the transporter
   * @date 2020-06-22
   * @param {any} emails=[] emails to be sent
   * @returns {any}
   */
  async setEmails(emails = []) {
    const emailsToSend = emails.join();
    /* if (emails.includes('luis@torre.co')) {
      emailsToSend = 'luis@torre.co';
    } else if (emails.includes('arvichan@hotmail.com')) {
      emailsToSend = 'arvichan@hotmail.com';
    } else if (emails.includes('sebas969696@hotmail.com')) {
      emailsToSend = 'sebas969696@hotmail.com';
    } else {
      emailsToSend = '';
    } */
    this.mailOption = {
      from: 'Torre recruiters', // sender address
      bcc: emailsToSend, // list of receivers
      subject: '', // Subject line
      html: '', // html text body
    };
  }

  /**
   * makeMessage: build a custom message
   * @date 2020-06-22
   * @param {any} jobInfo={} torre vacancy and links
   * @param {any} lang language
   * @returns {any}
   */
  async makeMessage(jobInfo = {}, lang) {
    if (jobInfo) {
      if (lang === 'en') {
        const messageEn = `<p>Hi, I am David, <a href="https://torre.co/es">Torre.co</a> external recruiter advisor, for the ${jobInfo.company} company a pleasure to connect with you!<br><br>
        As a next step in the selection process, I would like to know more about your experience and additional information, which you can fill out on our platform by applying to the vacancy using the “Quick apply” button that you’ll find at the following link:<br><br>
        ${jobInfo.quickApply}<br><br>
        This new profile can be used for the role of ${jobInfo.vacancy} and other vacancies.<br>
        Also, could you please send me the link of your profile as soon as you complete it? I don’t want it to get confused among other candidates.<br><br>
        If you have doubts about how to create your Bio inside Torre, we will explain it to you in the following <a href="${jobInfo.explainme}">video</a>!</p>`;
        this.mailOption.html = messageEn;
        this.mailOption.subject = `Continue the process for the job vacancy: ${jobInfo.vacancy}`;
      } else {
        const messageEs = `<p>Hola, soy David, reclutador de <a href="https://torre.co/es">Torre.co</a> para la empresa ${jobInfo.company} un gusto contactar contigo!<br><br>
        Como siguiente paso del proceso de selección, me gustaría conocer más de tu experiencia e información complementaria, que puedes llenar aquí en nuestra plataforma Torre aplicando a la vacante por medio del botón “Quick apply” que encontrarás en el siguiente link:<br><br>
        ${jobInfo.quickApply}<br><br>
        Este nuevo perfil podrás usarlo para el rol de ${jobInfo.vacancy} y otras vacantes.<br>
        Además, podrías por favor enviarme por acá el link de tu perfil apenas lo completes? No quisiera que se me confundiera entre otros candidatos.<br><br>
        Si tienes dudas sobre como crear tu Bio dentro de Torre, en el siguiente video te lo explicamos <a href="${jobInfo.explainme}">aquí</a>!</p>`;
        this.mailOption.html = messageEs;
        this.mailOption.subject = `Continua el proceso para la vacante de empleo: ${jobInfo.vacancy}`;
      }
      console.log(this.mailOption);
    }
  }

  /**
   * sendEmailsToAll: send emails
   * @date 2020-06-22
   * @returns {any} return the info of the message sent
   */
  async sendEmailsToAll() {
    const info = this.transporter.sendMail(this.mailOption).catch(() => {
      return false;
    });
    return info;
  }
}
// export the class
module.exports = { SendEmail };
