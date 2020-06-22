module.exports = {
  HOST: 'email-scrapper-rds-aws.c5uvmtx8cfbv.us-east-1.rds.amazonaws.com',
  USER: 'root',
  PASSWORD: 'holberton',
  DB: 'un_mejor_empleo_test',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
