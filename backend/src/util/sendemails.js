const fetch = require('node-fetch');
// const jobOfferList = require('./data');
const Mails = require('./mail');
const controllers = require('../controllers');

async function getCompanyNameAndLinks(companyLink) {
  // const idCompanyLink = companyLink.split('/')[3];
  // const companyMetaHol = await fetch(`https://hugo/api/opportunities/${idCompanyLink}`);
  // const companyMetaHolJson = companyMetaHol.json().source;
  const companyMetaHolJson = {};
  companyMetaHolJson.source = '0wxbBOr2';
  const companyMetaTorre = await fetch(
    `https://torre.co/api/opportunities/${companyMetaHolJson.source}`
  );
  const companyMetaTorreJson = await companyMetaTorre.json();
  const linkJobTorre = `https://torre.co/jobs/${companyMetaHolJson.source}`;
  const nameCompany = companyMetaTorreJson.organizations[0].name;
  const language = companyMetaTorreJson.languages[0].language.code;
  let explainLink = '';
  if (language === 'en') {
    explainLink =
      'https://www.youtube.com/watch?v=6_zBo6EtuWk&list=PLIQS10CfZaEWn1adIi-_loTW9BKbYEtTb&index=3';
  } else {
    explainLink =
      'https://www.youtube.com/watch?v=r35ovTmDhEg&list=PLIQS10CfZaEWn1adIi-_loTW9BKbYEtTb&index=2';
  }
  console.log(
    linkJobTorre,
    nameCompany,
    language,
    companyLink,
    companyMetaHolJson.source,
    companyMetaTorre
  );
  return {
    company: nameCompany,
    quickApply: linkJobTorre,
    explainme: explainLink,
    lang: language,
  };
}

const main = async () => {
  const sendEmail = new Mails.SendEmail();
  const jobOfferList = await controllers.JobOffer.getAllJobOffers();
  const allJobOffers = await Mails.SendEmail.getNoSentCandidates(jobOfferList);
  await sendEmail.configureTransporter();
  const idMessage = [];
  // get the emails from db

  /* const allJobOffers = [
    {
      vacancy: 'PHP and JavaScript Developer',
      companies: { Torre: { emails: ['arvichan@hotmail.com'] } },
    },
  ]; */

  for (const jobOffer of allJobOffers) {
    if (jobOffer) {
      const { vacancy } = jobOffer;
      for (const companyLink in jobOffer.companies) {
        if (companyLink) {
          await sendEmail.setEmails(jobOffer.companies[companyLink].emails);
          const { company, quickApply, explainme, lang } = await getCompanyNameAndLinks(
            companyLink
          );
          await sendEmail.makeMessage(
            {
              company,
              quickApply,
              vacancy,
              explainme,
            },
            lang
          );
          const sendOk = await sendEmail.sendEmailsToAll();
          if (sendOk.messageId) {
            jobOffer.companies[companyLink].sentEmail = true;
          }
          idMessage.push(sendOk.messageId);
        }
      }
    }
  }
  console.log(idMessage, idMessage.length, JSON.stringify(allJobOffers));
  return allJobOffers;
};

module.exports = { main };

// Comment this in production
// main();
