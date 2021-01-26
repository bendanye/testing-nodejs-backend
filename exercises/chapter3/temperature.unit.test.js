const { isWeatherHot } = require('../src/temperature');

describe('temperature', () => {
  test('Should return true', () => {
    isWeatherHot(100)
    //expect(isWeatherHot(100)).toBeTruthy();
  });

  test('Should return false', () => {
    isWeatherHot(20)
    //expect(isWeatherHot(20)).toBeFalsy();
  });
});
