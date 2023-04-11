export enum KeyGroup {
  NUMERIC,
  ALPHABETIC,
  ALPHANUMERIC,
  SYMBOLIC,
  NUMBOLIC,
  SYMBALPHANUMERIC,
  SYMBOLICOPERATORS,
  ARITHMETIC,
  ALL
}

export const keywords = Object.freeze(["true", "false"]);

export function CheckForExpression(word: string, keyGroup: KeyGroup): boolean {
  const regexString = new RegExp(`${getKeygroup(keyGroup)}`, 'gi');

  if ((word.toString().match(regexString)|| []).join('').length === word.length) {
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
    case KeyGroup.SYMBOLICOPERATORS:
      return '[+-/*()% ]';
    case KeyGroup.SYMBOLIC:
      return '[!%*()+=/<>|& ]|-';
    case KeyGroup.NUMBOLIC:
      return getKeygroup(KeyGroup.NUMERIC) + "|" + getKeygroup(KeyGroup.SYMBOLIC);
    case KeyGroup.SYMBALPHANUMERIC:
      return getKeygroup(KeyGroup.ALPHANUMERIC) + "|" + getKeygroup(KeyGroup.SYMBOLIC);
    case KeyGroup.ARITHMETIC:
      return getKeygroup(KeyGroup.ALPHANUMERIC) + "|" + getKeygroup(KeyGroup.SYMBOLICOPERATORS);
    default:
      return '';
  }
}
