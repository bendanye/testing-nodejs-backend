const { isWeatherHot } = require('../src/temperature');

describe('temperature', () => {
  test('Should return true', () => {
    expect(isWeatherHot(100)).toBeTruthy();
  });

  test('Should return false', () => {
    expect(isWeatherHot(20)).toBeFalsy();
  });
});
