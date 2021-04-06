# lapostoj.fr

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/lapostoj/lapostoj.fr/main/LICENSE)

Author: lapostoj

Contact: jerome.lapostolet@gmail.com

## Description

Personal website used as an online CV, portfolio and blog.
The goals is to have a lightweight, fast website where adding content is relatively easy and straightforward.

I ended up using [Gatsby](https://www.gatsbyjs.org/) and the [Lumen](https://github.com/alxshelepenok/gatsby-starter-lumen) starter kit.

Expected URL: [lapostoj.fr](https://www.lapostoj.fr)

## Features

* Online CV
* Portfolio
* Blog
* Summary of books

## Technology

* [Gatsby](https://www.gatsbyjs.org/)
* [React](https://reactjs.org/)
* [Firebase](https://firebase.google.com/)

## How To Use

### Running in Development

`gatsby develop`

### Building

`gatsby build`

### Deploy with Firebase

`npm install -g firebase-tools`

`firebase login`

`firebase init`

`firebase deploy`

To generate a favicon.ico based on png files of different sizes
Generate the png files with the desired sizes (for example using an online tool like <https://cloudconvert.com/svg-to-png>), then run:

```bash
convert favicon16.png favicon32.png favicon152.png favicon.ico
```

## License

The MIT License (MIT)

Copyright (c) 2018 Jerome Lapostolet

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
