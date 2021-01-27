const { isWeatherHot } = require('../src/temperature');

/**
 *
 * @group fast
 * @group unit
 */
describe('temperature', () => {
  test('Should return true', () => {
    expect(isWeatherHot(100)).toBeTruthy();
  });

  test('Should return true for 30', () => {
    expect(isWeatherHot(30)).toBeTruthy();
  });

  test('Should return false', () => {
    expect(isWeatherHot(20)).toBeFalsy();
  });
});
