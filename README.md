# lapostoj.fr

Author: lapostoj

Contact: jerome.lapostolet@gmail.com

## Description
Personal website used as an online CV, portfolio and host for demos.
The goals is to used the latest and most modern technologies and framework to be at the edge, test and learn new things.
I will use Bootstrap 3 (Bootstrap 4 still lack some documentation and stability but might move to it later).
It will also be an opportunity for me to learn more about hosting a website and the different offers about this.

Expected URL: www.lapostoj.fr

## Features:
* Online CV - Portfolio.
* Host for demos.
* Testing new technologies/framework.

## Technology:
* Bootstrap 3
* Less
* Gulp

## How To Use:
[FIRST TIME]
```sh
$ npm install
```

To get the css files from the less ones to test locally:
```sh
$ npm start
```

To get the minify (prod) version:
```sh
$ npm run build
```

To generate a favicon.ico based on png files of different sizes
Generate the png files with the desired sizes (for example using an online tool like https://cloudconvert.com/svg-to-png), then run:
```sh
$ convert favicon16.png favicon32.png favicon152.png favicon.ico
```