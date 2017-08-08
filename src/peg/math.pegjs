All
  = match:Match .*
  {
    return match;
  }

Match
  = space:_* data:Math
  {
    return Object.assign(data, {
      location: location(),
    });
  }

Math
  = math:(DollarMath / BracketMath)
  {
    return {
      math: math.join(''),
    };
  }

DollarMath
  = '$$' math:(!'$$' c:Char { return c; })+ '$$'
  {
    return math;
  }

BracketMath
  = '\\[' math:(!'\\]' c:Char { return c; })+ '\\]'
  {
    return math;
  }


Char
  = c:('\\' . / !'\\' .) { return c.join(''); }

_ 'whitespace'
  = '\u0020' / '\u0009'
