const fs = require('fs');
const unmejorempleo = require('./src/util/scrapper');

const scrapperFunction = async () => {
  const data = await unmejorempleo.main();
  const json = JSON.stringify(data);
  fs.writeFileSync('data.json', json, 'utf8');
};

scrapperFunction();
