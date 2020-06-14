#!/usr/bin/env bash

# Ensure the log file exists
touch /home/node/app/crontab.log

touch /var/log/cron.log

# Added a cronjob in a new crontab
echo "* * * * * echo "Hello world" >> /var/log/cron.log 2>&1" > /etc/crontab

# Registering the new crontab
crontab /etc/crontab

# Starting the cron
/usr/sbin/service cron start

# Displaying logs
# Useful when executing docker-compose logs mycron
tail -f /home/node/app/crontab.log