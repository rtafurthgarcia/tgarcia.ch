#!/bin/bash
lxc exec mothergoose:yunohost -- rm -rf /var/www/webapp_adidal/tgarcia.ch_/*
lxc file push -r public/* mothergoose:yunohost/var/www/webapp_adidal/tgarcia.ch_/.
lxc exec mothergoose:yunohost -- systemctl restart nginx
lxc exec mothergoose:yunohost -- chmod 644 -R /var/www/webapp_adidal/tgarcia.ch_
lxc exec mothergoose:yunohost -- chmod 755 /var/www/webapp_adidal/tgarcia.ch_
lxc exec mothergoose:yunohost -- chmod 755 /var/www/webapp_adidal/tgarcia.ch_/css
lxc exec mothergoose:yunohost -- chmod 755 /var/www/webapp_adidal/tgarcia.ch_/fonts
lxc exec mothergoose:yunohost -- chmod 755 /var/www/webapp_adidal/tgarcia.ch_/images
lxc exec mothergoose:yunohost -- chmod 755 /var/www/webapp_adidal/tgarcia.ch_/js
lxc exec mothergoose:yunohost -- chown -R www-data:www-data /var/www/webapp_adidal/tgarcia.ch_
lxc exec mothergoose:yunohost -- systemctl restart nginx