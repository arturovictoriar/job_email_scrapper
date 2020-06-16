#!/usr/bin/env bash

# Ensure the log file exists
touch /var/log/crontab.log
touch /var/log/crontab.error.log

# Added a cronjob in a new crontab
echo "*/5 * * * * /usr/local/bin/node /home/node/app/app.js >> /var/log/crontab.log 2> /var/log/crontab.error.log" > /etc/crontab

# Registering the new crontab
crontab /etc/crontab

# Starting the cron
/usr/sbin/service cron start

# Displaying logs
# Useful when executing docker-compose logs mycron
tail -f /var/log/crontab.log