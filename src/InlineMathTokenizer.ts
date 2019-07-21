import * as mdast from 'mdast';
import RemarkParse from 'remark-parse';

import { parse, ParseResult } from './peg/inlineMath';

const InlineMathLocator: RemarkParse.Locator = (value, fromIndex) => {
  let location = value.indexOf('$', fromIndex);
  if (location === -1) {
    location = value.indexOf('\\(', fromIndex);
  }
  return location;
};

const InlineMathTokenizerFunction = (eat: RemarkParse.Eat, value: string, silent?: boolean) => {
  let result: ParseResult;
  try {
    result = parse(value);
  } catch (err) {
    return silent ? false : undefined;
  }

  if (silent) {
    return true;
  }

  const matchStr = value.substring(result.location.start.offset, result.location.end.offset);

  const node: mdast.InlineMath = {
    type: 'inlineMath',
    value: matchStr,
    math: result.math,
  };

  return eat(matchStr)(node);
};

const InlineMathTokenizer = Object.assign(InlineMathTokenizerFunction, {
  locator: InlineMathLocator,
  notInBlock: true,
  notInList: true,
  notInLink: true,
} as Partial<RemarkParse.Tokenizer>) as RemarkParse.Tokenizer;

export default InlineMathTokenizer;
