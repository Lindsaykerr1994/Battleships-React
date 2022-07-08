import data from "../../ships-coordinates/sheet.json"

export const toBoolean = (string) => {
  return string === 'true' ? true : false;
}

export const getOpponentCoords = () => {
  let randIndex = getRandomNumber(data.length);
  return data[randIndex];
}

export const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
}
