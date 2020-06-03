// const jobOfferList = require('./data');
const Mails = require('./mail');
const controllers = require('../controllers');

async function getCompanyNameAndLinks(companyLink) {
  return {
    company: companyLink,
    quickApply: 'https://www.torre.co/trabajosymastrabajos',
    explainme: 'https://www.torre.co/home',
  };
}

const main = async () => {
  const sendEmail = new Mails.SendEmail();
  const jobOfferList = await controllers.JobOffer.getAllJobOffers();
  const allJobOffers = await Mails.SendEmail.getNoSentCandidates(jobOfferList);
  await sendEmail.configureTransporter();
  const idMessage = [];
  // get the emails from db
  for (const jobOffer of allJobOffers) {
    if (jobOffer) {
      const { vacancy } = jobOffer;
      for (const companyLink in jobOffer.companies) {
        if (companyLink) {
          await sendEmail.setEmails(jobOffer.companies[companyLink]);
          const { company, quickApply, explainme } = await getCompanyNameAndLinks(companyLink);
          await sendEmail.makeMessage(
            {
              company,
              quickApply,
              vacancy,
              explainme,
            },
            'es'
          );
          const timeSendEmails = await sendEmail.sendEmailsToAll();
          idMessage.push(timeSendEmails.messageId);
        }
      }
    }
  }
  console.log(idMessage, idMessage.length);
};

module.exports = { main };

// Comment this in production
// main();
