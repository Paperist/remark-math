import test, { ContextualTestContext } from 'ava';
import { locateInlineMathjax } from '../lib/index';

function macro(
  t: ContextualTestContext,
  input: string,
  expected: any
) {
  t.is(locateInlineMathjax(input, 0), expected);
}

Object.assign(macro, {
  title: (_title: string, input: string, _expected: any) => input,
});

test(macro, '$x^2 + y^2 = 1$', 0);
test(macro, '\\(x^2 + y^2 = 1\\)', 0);
test(macro, 'hoge$x^2 + y^2 = 1$', 4);
test(macro, 'hoge\\(x^2 + y^2 = 1\\)', 4);
test(macro, 'hoge', -1);
