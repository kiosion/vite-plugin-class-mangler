import { describe, it, expect } from 'vitest';
import { getRandomClassName } from '../src/utils';

describe('getRandomClassName', () => {
  it('should return a random class name with lengt of 5', () => {
    const result = getRandomClassName({ length: 5 });
    expect(result.length).toBe(5);
  });
  it('should return a random class name with lengt of 4', () => {
    const result = getRandomClassName({ length: 4 });
    expect(result.length).toBe(4);
  });
  it('should return a random class name with lengt of 6', () => {
    const result = getRandomClassName({ length: 6 });
    expect(result.length).toBe(6);
  });
  it('should return a random class name with random length', () => {
    const result = getRandomClassName({ min: 6, max: 7 });
    expect(result.length).toBeGreaterThanOrEqual(6);
    expect(result.length).toBeLessThanOrEqual(7);
  });
  it('should return a random class name with random length', () => {
    const result = getRandomClassName({ min: 1, max: 2 });
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result.length).toBeLessThanOrEqual(2);
  });
});
