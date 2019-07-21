import * as mdast from 'mdast';
import RemarkParse from 'remark-parse';

import { parse, ParseResult } from './peg/math';

const MathTokenizer = (eat: RemarkParse.Eat, value: string, silent?: boolean) => {
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

  const node: mdast.Math = {
    type: 'math',
    value: matchStr,
    math: result.math,
  };

  return eat(matchStr)(node);
};

export default MathTokenizer;
