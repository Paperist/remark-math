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
npm i remark @paperist/remark-mathjax
```

## Usage

```js
const remark = require('remark');
const mathjax = require('remark-mathjax');

const ast = remark().use(mathjax).parse(markdown);
console.dir(ast, { depth: null });
```

## Contribute

PRs accepted.

## License

MIT © 3846masa
