# @paperist/remark-math

[![LICENSE][license-badge]][license]
[![NPM][npm-badge]][npm]
[![standard-readme compliant][standard-readme-badge]][standard-readme]

[npm]: https://www.npmjs.com/package/@paperist/remark-math
[license]: https://3846masa.mit-license.org
[standard-readme]: https://github.com/RichardLitt/standard-readme
[npm-badge]: https://flat.badgen.net/npm/v/@paperist/remark-math
[license-badge]: https://flat.badgen.net/badge/license/MIT/blue
[standard-readme-badge]: https://flat.badgen.net/badge/standard-readme/OK/green

> [wooorm/remark] plugin for math likes [KaTeX] / [MathJax]

[wooorm/remark]: https://github.com/wooorm/remark
[katex]: https://khan.github.io/KaTeX/
[mathjax]: https://www.mathjax.org/

## Table of Contents

<!-- TOC depthFrom:2 depthTo:3 updateOnSave:false -->

- [Install](#install)
- [Usage](#usage)
- [AST](#ast)
  - [`Math`](#math)
  - [`InlineMath`](#inlinemath)
- [Contribute](#contribute)
- [License](#license)

<!-- /TOC -->

## Install

```
npm i remark @paperist/remark-math
```

## Usage

```js
const unified = require('unified');
const parser = require('remark-parse');
const math = require('@paperist/remark-math');

const markdown = `
In an x-y Cartesian coordinate system,
the circle with centre coordinates \\((a, b)\\) and
radius \\(r\\) is the set of all points \\((x, y)\\) such that

\\[
(x - a)^2 + (y - b)^2 = r^2
\\]

> https://en.wikipedia.org/wiki/Circle
`;

const processor = unified()
  .use(parser)
  .use(math);
const ast = processor.parse(markdown);

processor.run(ast).then((ast) => {
  console.dir(ast, { depth: null });
});
```

## AST

See also [mdast], [unist].

[mdast]: https://github.com/syntax-tree/mdast
[unist]: https://github.com/syntax-tree/unist

### `Math`

`Math` extends [`Literal`][unist-literal].

```typescript
interface Math extends Literal {
  type: 'math';
  math: string;
}
```

For example, the following markdown:

```md
\[
x^2 + y^2 = r^2
\]
```

Yields:

```json
{
  "type": "math",
  "value": "\\[\nx^2 + y^2 = r^2\n\\]",
  "math": "\nx^2 + y^2 = r^2\n"
}
```

### `InlineMath`

`InlineMath` extends [`Literal`][unist-literal].

```typescript
interface InlineMath extends Literal {
  type: 'inlineMath';
  math: string;
}
```

For example, the following markdown:

```md
\(E = mc^2\)
```

Yields:

```json
{
  "type": "inlineMath",
  "value": "\\(E = mc^2\\)",
  "math": "E = mc^2"
}
```

[unist-literal]: https://github.com/syntax-tree/unist#literal

## Contribute

PRs accepted.

## License

[MIT (c) 3846masa](https://3846masa.mit-license.org)
