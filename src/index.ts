import './definitions';
import * as RemarkParse from 'remark-parse';

import MathTokenizer from './MathTokenizer';
import InlineMathTokenizer from './InlineMathTokenizer';
import transformer from './transformer';

function attacher(this: RemarkParse) {
  const Parser = this.Parser;

  const blockTokenizers = Parser.prototype.blockTokenizers;
  const blockMethods = Parser.prototype.blockMethods;
  blockTokenizers['math'] = MathTokenizer;
  blockMethods.splice(blockMethods.indexOf('paragraph'), 0, 'math');

  const inlineTokenizers = Parser.prototype.inlineTokenizers;
  const inlineMethods = Parser.prototype.inlineMethods;
  inlineTokenizers['inlineMath'] = InlineMathTokenizer;
  inlineMethods.splice(inlineMethods.indexOf('escape'), 0, 'inlineMath');

  return transformer;
}

export = attacher;
