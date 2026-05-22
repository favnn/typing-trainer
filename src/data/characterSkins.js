const characterSkins = {
  'char_default': {
    id: 'char_default',
    name: 'Обычный',
    price: 0,
    default: true,
    skin: {
      headColor: '#f5cba7',    // телесный
      bodyColor: '#95a5a6',    // серая футболка
      pantsColor: '#2980b9',   // синие джинсы
      shoesColor: '#2c3e50',
      hat: null,               // без головного убора
      accessory: null
    }
  },
  'char_ninja': {
    id: 'char_ninja',
    name: 'Ниндзя',
    price: 300,
    skin: {
      headColor: '#f5cba7',
      bodyColor: '#1e1e1e',    // чёрный костюм
      pantsColor: '#1e1e1e',
      shoesColor: '#111',
      hat: { type: 'mask', color: '#c0392b' },   // красная маска
      accessory: null
    }
  },
  'char_wizard': {
    id: 'char_wizard',
    name: 'Волшебник',
    price: 500,
    skin: {
      headColor: '#f5cba7',
      bodyColor: '#8e44ad',    // фиолетовая мантия
      pantsColor: '#5b2c6f',
      shoesColor: '#2c3e50',
      hat: { type: 'wizardHat', color: '#8e44ad' },
      accessory: { type: 'wand', color: '#f1c40f' } // палочка
    }
  },
  'char_robot': {
    id: 'char_robot',
    name: 'Робот',
    price: 400,
    skin: {
      headColor: '#bdc3c7',    // металлик
      bodyColor: '#7f8c8d',
      pantsColor: '#7f8c8d',
      shoesColor: '#34495e',
      hat: { type: 'antenna', color: '#e74c3c' },
      accessory: null
    }
  },
  'char_dragon': {
    id: 'char_dragon',
    name: 'Дракон',
    price: 800,
    skin: {
      headColor: '#f5cba7',
      bodyColor: '#27ae60',    // зелёный комбинезон
      pantsColor: '#1e8449',
      shoesColor: '#145a32',
      hat: null,
      accessory: { type: 'wings', color: '#2ecc71' } // крылья
    }
  }
};

export default characterSkins;