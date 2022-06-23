import range from '../range';

describe('range', () => {
  it('should ', () => {
    expect(range(1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4, 5]);
  });
});
