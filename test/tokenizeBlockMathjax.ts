import test, { ContextualTestContext } from 'ava';
import { tokenizeBlockMathjax } from '../lib/index';

function macro(
  t: ContextualTestContext,
  input: string,
  expected: any
) {
  t.plan(3);
  const eat = (value: string) => {
    return (node: any) => {
      t.is(node.value, value);
      t.is(node.type, 'blockMathjax');
      t.is(node.mathjax, expected);
      return true;
    };
  };
  const result = tokenizeBlockMathjax(eat, input);
  if (!result) {
    t.fail();
  }
}

Object.assign(macro, {
  title: (_title: string, input: string, _expected: any) => input,
});

// basic
test(macro, '$$x^2 + y^2 = 1$$', 'x^2 + y^2 = 1');
test(macro, '\\[x^2 + y^2 = 1\\]', 'x^2 + y^2 = 1');

// ignore spaces
test(macro, '  $$x^2 + y^2 = 1$$', 'x^2 + y^2 = 1');
test(macro, '  \\[x^2 + y^2 = 1\\]', 'x^2 + y^2 = 1');

// escape
test(macro, '$$\\$1 = 100 JPY$$', '\\$1 = 100 JPY');
test(macro, '$$\\\\$$', '\\\\');
test(macro, '$$\\$$$', '\\$');
test(macro, '\\[\\begin{array}\\end{array}\\]', '\\begin{array}\\end{array}');
test(macro, '\\[\\\\]\\]', '\\\\]');

// multi line
test(macro, '$$\nx^2 + y^2 = 1\n$$', '\nx^2 + y^2 = 1\n');
test(macro, '\\[\nx^2 + y^2 = 1\n\\]', '\nx^2 + y^2 = 1\n');
