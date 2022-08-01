import random from 'randomstring';
import Crypto from 'crypto';

export function escapeClassName(className: string) {
  let res = className.replace(/[/\\^$*+?.()|[\]{}]/g, '\\$&');
  res.charAt(0) === '"' && (res = res.slice(1));
  res.charAt(res.length - 1) === '"' && (res = res.slice(0, -1));
  return res;
}

export const cssPseudoSelector = [
  'active',
  'checked',
  'disabled',
  'empty',
  'enabled',
  'first-child',
  'first-of-type',
  'focus',
  'hover',
  'in-range',
  'invalid',
  'lang',
  'last-child',
  'last-of-type',
  'link',
  'not',
  'nth-child',
  'nth-last-child',
  'nth-last-of-type',
  'nth-of-type',
  'only-of-type',
  'only-child',
  'optional',
  'out-of-range',
  'read-only',
  'read-write',
  'required',
  'root',
  'target',
  'valid',
  'visited'
];

export const cssPseudoSelectorRegex = cssPseudoSelector.join('|');

export function removeCssPsuedoSelector(code: string) {
  return code.replace(new RegExp(`:(${cssPseudoSelectorRegex})[(\\w\\d)]*`, 'g'), '');
}

export function randomClassName(config: { length?: number; min?: number; max?: number }) {
  let length = 5;

  if (config.length) {
    length = config.length;
  } else if (config.min && config.max) {
    length = getRandomInt(config.min, config.max);
  }

  return random.generate({
    length,
    charset: 'alphabetic'
  });
}

function getRandomInt(min: number, max: number) {
  return (Crypto.randomBytes(1)[0] % (max - min + 1)) + min;
}

export function endsWithAny(suffixes: string[], string: string) {
  return suffixes.some(function (suffix) {
    return string.endsWith(suffix);
  });
}
