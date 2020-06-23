# EmailScrapper

## Description :book:

Email Scrapper service scraps recruiters' accounts from job boards like "Un mejor empleo" every 10 minutes and get the email addresses of the applicants to the offers published by those accounts. Once the applicants' emails have been obtained, the app will send a custom message, by email, with the following steps to the job application.

  
## Visuals :video_camera:

Go to the video bellow to check the working of the project.

  [EmailScrapperWorking](https://www.youtube.com/watch?v=FoQe3cGh-aQ)

## Installation :floppy_disk:

In Ubuntu 16:

Go inside the folder job_email_scrapper:

- cd job_email_scrapper

Give permissions and run the script installDockerCompose

- chmod u+x installDockerCompose && ./installDockerCompose

If you do not have Ubuntu 16, install Docker and Docker-Compose in yor machine


## Usage :open_file_folder:

0. Go inside the folder job_email_scrapper:

- cd job_email_scrapper
 
1. Set the "Un mejor empleo" credentials in backend/src/config/scrapper.config.js 

2. Set the "Gmail" credentials in backend/src/config/sendemail.config.js

3. Set the "Mysql" credentials in backend/src/config/db.config.js

4. Give permissions and run the emailScrapperUp file:

- chmod u+x emailScrapperUp && ./emailScrapperUp

5. Monitoring the emails sent in 127.0.0.1:3000 or 0.0.0.0:80

6. Monitoring the API in 127.0.0.1:4000/api/useroffer/{number} or 0.0.0.0:4000/api/useroffer/{number}. Note: the endpoints are /api/countdata, /api/useroffer/{number},

7. Monitoring the LandPage in 127.0.0.1:80/landing or 0.0.0.0:80/landing

Note: If you want to change the message go to backend/src/util/mail.js funtion "makeMessage(jobInfo =  {},  lang)"

## Support :email:

LinkedIn:

- [Arturo Victoria Rincon](https://www.linkedin.com/in/arvicrin/)
- [Sebastian Lopez Herrera](https://www.linkedin.com/in/sebas119/)

## Authors and acknowledgment :school:

Thanks to Luis Mesa from Torre.co for accompanying us in the process of development of this project.

And thanks to Holberton School that taught the way to learn by ourselves.

## License :warning:

:copyright: 2020 All rights reserved.

## Related projects :grey_question:

[Voici d'emploi](https://github.com/GHJ-INC)

## Project status :white_check_mark:

This project just automate the process to contact a job applicants from "Un mejor empleo" job board and it is complete finished.

## Author :black_nib:

* __Arturo Victoria Rincon__ <[arvicrin](https://github.com/arvicrin)>
* __Sebastian Lopez Herrera__ <[sebas119](https://github.com/sebas119)>
