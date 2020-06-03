const nodemailer = require('nodemailer');
const C = require('../config/sendemail.config');

class SendEmail {
  // create reusable transporter object using the default SMTP transport
  constructor() {
    this.transporter = null;
    this.mailOption = null;
  }

  static async getNoSentCandidates(offers) {
    const AllcleanData = [];
    for (const offer of offers) {
      if (offer) {
        const cleanData = {};
        cleanData.vacancy = offer.name;
        cleanData.companies = {};
        for (const candidate of offer.users) {
          if (candidate) {
            if (candidate.user_offer.emailSentAt === null) {
              if (!(candidate.user_offer.company in cleanData.companies)) {
                cleanData.companies[candidate.user_offer.company] = [];
              }
              cleanData.companies[candidate.user_offer.company].push(candidate.email);
            }
          }
        }
        AllcleanData.push(cleanData);
      }
    }
    return AllcleanData;
  }

  /* async configureTransporter() {
  const transporter = nodemailer.createTransport({
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
    } */
  async configureTransporter() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: C.user, // generated ethereal user
        pass: C.pass, // generated ethereal password
      },
    });
  }

  async setEmails(emails = []) {
    this.mailOption = {
      from: 'Torre recruiters', // sender address
      bcc: emails.join(), // list of receivers
      subject: '', // Subject line
      text: '', // plain text body
    };
  }

  async makeMessage(jobInfo = {}, lang) {
    if (jobInfo) {
      if (lang === 'en') {
        const messageEn = `Hi, I am David, Torre.co external recruiter advisor, for the company ${jobInfo.company} a pleasure to connect with you!
As a next step in the selection process, I would like to know more about your experience and additional information, which you can fill out on our platform by applying to the vacancy using the “Quick apply” button that you’ll find at the following link:
${jobInfo.quickApply}
This new profile can be used for the role of ${jobInfo.vacancy} and other vacancies.
Also, could you please send me the link of your profile as soon as you complete it? I don’t want it to get confused among other candidates.
If you have doubts about how to create your Bio inside Torre, we will explain it to you in the following video! ${jobInfo.explainme}`;
        this.mailOption.text = messageEn;
        this.mailOption.subject = `Continue the process for the job vacancy: ${jobInfo.vacancy}`;
      } else {
        const messageEs = `Hola, soy David, reclutador de Torre.co para la empresa ${jobInfo.company} un gusto contactar contigo!
Como siguiente paso del proceso de selección, me gustaría conocer más de tu experiencia e información complementaria, que puedes llenar aquí en nuestra plataforma Torre aplicando a la vacante por medio del botón “Quick apply” que encontrarás en el siguiente link:
${jobInfo.quickApply}
Este nuevo perfil podrás usarlo para el rol de ${jobInfo.vacancy} y otras vacantes.
Además, podrías por favor enviarme por acá el link de tu perfil apenas lo completes? No quisiera que se me confundiera entre otros candidatos.
Si tienes dudas sobre como crear tu Bio dentro de Torre, en el siguiente video te lo explicamos aquí! ${jobInfo.explainme}`;
        this.mailOption.text = messageEs;
        this.mailOption.subject = `Continua el proceso para la vacante de empleo: ${jobInfo.vacancy}`;
      }
      console.log(this.mailOption);
    }
  }

  // send mail with defined transport object
  async sendEmailsToAll() {
    const info = await this.transporter.sendMail(this.mailOption);
    return info;
  }
}

module.exports = { SendEmail };
