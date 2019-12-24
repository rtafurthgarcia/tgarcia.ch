#!/bin/bash

git fetch
if [ $(git rev-parse HEAD) == $(git rev-parse @{u}) ]; then 
	echo "Nouvelle version détectée, mise à jour du contenu"
	git stash
	git pull 

	npm install
	npm run build

	rm -rf $web_path/*
	cp -r public/* $web_path/
fi
echo "Aucune màj disponible"