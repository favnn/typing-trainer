const characterBase = {
  skinColor: '#f5cba7',  // цвет кожи по умолчанию
  head: {
    offsetY: 0,
    width: 50,
    height: 50,
  },
  body: {
    offsetY: 50,
    width: 70,
    height: 70,
  },
  arms: {
    left: { offsetX: -30, offsetY: 55, width: 15, height: 60 },
    right: { offsetX: 85, offsetY: 55, width: 15, height: 60 },
  },
  legs: {
    left: { offsetX: 10, offsetY: 125, width: 20, height: 60 },
    right: { offsetX: 50, offsetY: 125, width: 20, height: 60 },
  },
  shoes: {
    left: { offsetX: 10, offsetY: 180, width: 20, height: 15 },
    right: { offsetX: 50, offsetY: 180, width: 20, height: 15 },
  },
  hat: {
    offsetY: -15,
  },
};

export default characterBase;