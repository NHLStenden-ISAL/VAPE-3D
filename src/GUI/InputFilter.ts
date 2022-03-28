export enum KeyGroup {
  NUMERIC,
  ALPHABETIC,
  ALPHANUMERIC,
  SYMBOLIC,
  NUMBOLIC,
  SYMBALPHANUMERIC,
  ALL
}

export function CheckForExpression(word: string, keyGroup: KeyGroup): boolean {
  const regexString = new RegExp(`${getKeygroup(keyGroup)}`, 'gi');

  if ((word.match(regexString) || []).join('').length === word.length ) {
    return true;
  }

  return false;
}

export function FilterString(word: string, keyGroup: KeyGroup): string {
  const regexString = new RegExp(`${getKeygroup(keyGroup)}`, "gi");

  return (word.match(regexString) || []).join('');
}

function getKeygroup(keyGroup: KeyGroup): string {
  switch (keyGroup) {
    case KeyGroup.NUMERIC:
      return '[0-9]';
    case KeyGroup.ALPHABETIC:
      return '[a-z]';
    case KeyGroup.ALPHANUMERIC:
      return getKeygroup(KeyGroup.NUMERIC) + "|" + getKeygroup(KeyGroup.ALPHABETIC);
    case KeyGroup.SYMBOLIC:
      return '[!%*()+=/<>|& ]|\-';
    case KeyGroup.NUMBOLIC:
      return getKeygroup(KeyGroup.NUMERIC) + "|" + getKeygroup(KeyGroup.SYMBOLIC);
    case KeyGroup.SYMBALPHANUMERIC:
      return getKeygroup(KeyGroup.ALPHANUMERIC) + "|" + getKeygroup(KeyGroup.SYMBOLIC);
    default:
      return '';
  }
}
