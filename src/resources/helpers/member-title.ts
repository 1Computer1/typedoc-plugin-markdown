import { DeclarationReflection } from 'typedoc';

export function memberTitle(this: DeclarationReflection) {
  const md = [];

  if (this.flags) {
    md.push(this.flags.map(x => x.toLowerCase()).join(' '));
  }
  md.push(this.name);
  return md.join(' ');
}
