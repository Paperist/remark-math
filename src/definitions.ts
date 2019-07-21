import * as mdast from 'mdast';

declare module 'mdast' {
  export interface Math extends mdast.Literal {
    type: 'math';
    math: string;
  }

  export interface InlineMath extends mdast.Literal {
    type: 'inlineMath';
    math: string;
  }
}
