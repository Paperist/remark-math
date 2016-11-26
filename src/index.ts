/**
 * Static
 */
const C_NEWLINE = '\n';
const C_SPACE = '\x20';
const C_TAB = '\t';
const C_ESCAPE = '\\';
const C_DOLLAR = '$';
const C_OPEN_BRACKET = '[';
const C_CLOSE_BRACKET = ']';
const C_OPEN_PARENTHESIS = '(';
const C_CLOSE_PARENTHESIS = ')';

/**
 * Tokenise a cross-ref label.
 *
 * @example
 *   tokenizeBlockMathjax(eat, '$$ x + y = 1 $$');
 *   tokenizeBlockMathjax(eat, '\[ x + y = 1 \]');
 */
export function tokenizeBlockMathjax (
  eat: any,
  value: string,
  silent: boolean = false,
) {
  const length = value.length;
  let content = '';
  let mathjax = '';
  let char = '';
  let idx = 0;

  for ( ; idx < length; idx++) {
    char = value.charAt(idx);
    content += char;
    if (char !== C_SPACE && char !== C_TAB) {
      break;
    }
  }

  const wrapType = (char === C_DOLLAR) ? C_DOLLAR : (char === C_ESCAPE) ? C_OPEN_BRACKET : '';
  if (!wrapType) {
    return;
  }

  char = value.charAt(++idx);
  if (char !== wrapType) {
    return;
  }
  content += char;

  for (idx++; idx < length; idx++) {
    char = value.charAt(idx);
    content += char;

    if (wrapType === C_DOLLAR && char === C_DOLLAR) {
      const char = value.charAt(++idx);

      if (char === C_DOLLAR) {
        content += char;
        break;
      } else {
        idx--;
      }
    }

    if (char === C_ESCAPE) {
      mathjax += char;
      char = value.charAt(++idx);
      content += char;

      if (wrapType === C_OPEN_BRACKET && char === C_CLOSE_BRACKET) {
        mathjax = mathjax.slice(0, -1);
        break;
      }
    }

    mathjax += char;
  }

  if (idx >= length) {
    return;
  }

  if (silent) {
    return true;
  }

  return eat(content)({
    type: 'blockMathjax',
    value: content,
    mathjax,
  });
}

/**
 * Tokenise a cross-ref label.
 *
 * @example
 *   tokenizeInlineMathjax(eat, '$ x + y = 1 $');
 */
export function tokenizeInlineMathjax (
  eat: any,
  value: string,
  silent: boolean = false,
) {
  const length = value.length;
  let content = '';
  let mathjax = '';
  let char = '';
  let idx = 0;

  char = value.charAt(idx++);
  const wrapType =
    (char === C_DOLLAR) ? C_DOLLAR :
    (char === C_ESCAPE) ? C_OPEN_PARENTHESIS : '';
  if (!wrapType) {
    return;
  }
  content += char;

  if (wrapType === C_OPEN_PARENTHESIS) {
    char = value.charAt(idx++);
    if (char !== C_OPEN_PARENTHESIS) {
      return;
    }
    content += char;
  }

  for ( ; idx < length; idx++) {
    char = value.charAt(idx);
    content += char;

    if (wrapType === C_DOLLAR && char === C_DOLLAR) {
      break;
    }

    if (char === C_ESCAPE) {
      mathjax += char;
      char = value.charAt(++idx);
      content += char;

      if (wrapType === C_OPEN_PARENTHESIS && char === C_CLOSE_PARENTHESIS) {
        mathjax = mathjax.slice(0, -1);
        break;
      }
    }

    if (char === C_NEWLINE) {
      return;
    }

    mathjax += char;
  }

  if (idx >= length) {
    return;
  }

  if (silent) {
    return true;
  }

  return eat(content)({
    type: 'inlineMathjax',
    value: content,
    mathjax,
  });
}

/**
 * Find a possible inline mathjax.
 *
 * @example
 *   locateInlineMathjax('$Hoge$'); // 1
 *
 */
export function locateInlineMathjax (
  value: string,
  fromIndex: number,
) {
  let idx = value.indexOf('$', fromIndex);
  if (idx === -1) {
    idx = value.indexOf('\\(', fromIndex);
  }
  return idx;
}

/**
 * Attacher.
 */
function attacher(remark: any) {
  const proto = remark.Parser.prototype;
  const blockMethods = proto.blockMethods;
  const inlineMethods = proto.inlineMethods;

  /**
   * Add a tokenizer to the `Parser`.
   */
  proto.blockTokenizers.blockMathjax = tokenizeBlockMathjax;
  blockMethods.splice(inlineMethods.indexOf('paragraph'), 0, 'blockMathjax');

  proto.inlineTokenizers.inlineMathjax =
    Object.assign(tokenizeInlineMathjax, { locator: locateInlineMathjax });
  inlineMethods.splice(inlineMethods.indexOf('escape'), 0, 'inlineMathjax');
}

/**
 * Expose.
 */

export default attacher;
