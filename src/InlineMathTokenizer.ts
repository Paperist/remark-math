import { MDAST } from 'mdast';
import * as RemarkParse from 'remark-parse';

import { parse, ParseResult } from './peg/inlineMath';

const InlineMathLocator: RemarkParse.Locator = (value, fromIndex) => {
  let location = value.indexOf('$', fromIndex);
  if (location === -1) {
    location = value.indexOf('\\(', fromIndex);
  }
  return location;
};

const InlineMathTokenizerFunction: RemarkParse.TokenizerFunction = (
  eat,
  value,
  silent
) => {
  let result: ParseResult;
  try {
    result = parse(value);
  } catch (err) {
    return silent ? false : undefined;
  }

  if (silent) {
    return true;
  }

  const matchStr = value.substring(
    result.location.start.offset,
    result.location.end.offset
  );

  const node: MDAST.InlineMath = {
    type: 'inlineMath',
    value: matchStr,
    math: result.math,
  };

  return eat(matchStr)(node);
};

const InlineMathTokenizer: RemarkParse.Tokenizer = Object.assign(
  InlineMathTokenizerFunction,
  {
    locator: InlineMathLocator,
    notInBlock: true,
    notInList: true,
    notInLink: true,
  }
);

export default InlineMathTokenizer;
