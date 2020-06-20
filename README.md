# EmailScrapper

## Description :book:

Email Scrapper service scraps recruiters' accounts from job boards like "Un mejor empleo" every 10 minutes and get the email addresses of the applicants to the offers published by those accounts. Once the applicants' emails have been obtained, the app will send a custom message, by email, with the following steps to the job application.

  
## Visuals :video_camera:

Go to the video bellow to check the working of the project.

  [EmailScrapperWorking](https://www.youtube.com/watch?v=FoQe3cGh-aQ)

## Installation :floppy_disk:

In linux:

Go inside the folder job_email_scrapper:

- cd job_email_scrapper

Run the script installDockerCompose

- sh config/installDockerCompose


## Usage :open_file_folder:

0. Go inside the folder job_email_scrapper:

- cd job_email_scrapper
 
1. Set the "Un mejor empleo" credentials in backend/src/config/scrapper.config.js 

2. Set the "Gmail" credentials in backend/src/config/sendemail.config.js

3. Set the Database credentials in backend/src/config/db.config.js

4. Give permission and run the emailScrapperUp file:

- chmod u+x config/emailScrapperUp && sh config/emailScrapperUp

5. Monitoring the emails sent in 127.0.0.1:3000 or 0.0.0.0:80

6. Monitoring the API in 127.0.0.1:4000/api/users/{number} or 0.0.0.0:4000/api/users/{number}. Note: the endpoints are /api/countdata, /api/users/{number},

7. Monitoring the LandPage in 127.0.0.1:80/landing or 0.0.0.0:80/landing

Note: If you want to change the message go to backend/src/util/mail.js funtion "makeMessage(jobInfo =  {},  lang)"

## Support :email:

Twitter:

- @arvicrin
- @sebas119

## Authors and acknowledgment :school:

Thanks to Luis Mesa from Torre.co for accompanying us in the process of development of this project.

And thanks to Holberton School that taught the way to learn by ourselves.

## License :warning:

:copyright: 2020 All rights reserved.

## Project status :white_check_mark:

This project just automate the process to contact a job applicants from "Un mejor empleo" job board and it is complete finished.

## Author :black_nib:

* __Arturo Victoria Rincon__ <[arvicrin](https://github.com/arvicrin)>
* __Sebastian Lopez Herrera__ <[sebas119](https://github.com/sebas119)>
