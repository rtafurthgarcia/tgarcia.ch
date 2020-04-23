#!/bin/bash
lxc exec mothergoose:yunohost -- rm -rf /var/www/webapp_adidal/tgarcia.ch_/*
lxc file push -r public/* mothergoose:yunohost/var/www/webapp_adidal/tgarcia.ch_/.
lxc exec mothergoose:yunohost -- systemctl reload nginx