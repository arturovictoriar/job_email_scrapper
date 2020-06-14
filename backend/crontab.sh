#!/usr/bin/env bash

# Ensure the log file exists
touch /home/node/app/crontab.log

# Added a cronjob in a new crontab
echo "*/5 * * * * /usr/local/bin/node /home/node/app/app.js >> /home/node/app/crontab.log 2>&1" > /etc/crontab

# Registering the new crontab
crontab /etc/crontab

# Starting the cron
/usr/sbin/service cron start

# Displaying logs
# Useful when executing docker-compose logs mycron
tail -f /home/node/app/crontab.log