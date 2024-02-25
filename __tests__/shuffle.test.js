const shuffle = require("../src/shuffle");


describe('shuffle function', () => {
  const sampleArray = [1, 2, 3, 4, 5];

  test('should contain all the same items as the argument array', () => {
    const result = shuffle(sampleArray);
    expect(result).toEqual(expect.arrayContaining(sampleArray));
  });

  test('should has the same length as the argument array', () => {
    const result = shuffle(sampleArray);
    expect(result.length).toEqual(sampleArray.length);
  });

  test('should not return the same array if it shuffled', () => {
    const firstShuffle = shuffle(sampleArray);
    expect(firstShuffle).not.toStrictEqual(sampleArray);
  });
});