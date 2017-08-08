All
  = match:Match .*
  {
    return match;
  }

Match
  = space:_* data:InlineMath
  {
    return Object.assign(data, {
      location: location(),
    });
  }

InlineMath
  = math:(DollarInlineMath / BracketInlineMath)
  {
    return {
      math: math.join(''),
    };
  }

DollarInlineMath
  = '$' math:(!'$' c:Char { return c; })+ '$'
  {
    return math;
  }

BracketInlineMath
  = '\\(' math:(!'\\)' c:Char { return c; })+ '\\)'
  {
    return math;
  }


Char
  = c:('\\' [^\n] / !'\\' [^\n]) { return c.join(''); }

_ 'whitespace'
  = '\u0020' / '\u0009'
