# remark-mathjax

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> wooorm/remark plugin for mathjax

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

```
npm i remark 3846masa/remark-mathjax#build
```

## Usage

```js
const remark = require('remark');
const mathjax = require('remark-mathjax');
const crossref = require('remark-crossref');
const latex = require('remark-latex');

remark()
.use(mathjax)
.use(crossref)
.use(latex)
.process(markdown, (err, vfile) => {
  if (err) {
    console.error(err);
  }
  console.log(vfile);
});
```

## Contribute

PRs accepted.

## License

MIT © 3846masa
