import { DeclarationReflection } from 'typedoc';

export function memberSymbol(this: DeclarationReflection) {
  const symbol = '*';
  return symbol;
}
