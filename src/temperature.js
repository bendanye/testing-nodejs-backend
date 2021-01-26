const isWeatherHot = temperature => {
  if (temperature >= 30) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  isWeatherHot
};
