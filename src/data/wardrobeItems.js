const wardrobeItems = {
  // ========== ГОЛОВА (hair / headwear) ==========
  'head_default': {
    id: 'head_default',
    name: 'Короткие волосы',
    slot: 'head',
    price: 0,
    default: true,
    render: 'hair',
    color: '#4a3728',  // тёмные волосы
  },
  'head_blonde': {
    id: 'head_blonde',
    name: 'Светлые волосы',
    slot: 'head',
    price: 150,
    render: 'hair',
    color: '#f1c40f',
  },

  // ========== ТЕЛО (body) ==========
  'body_default': {
    id: 'body_default',
    name: 'Серая футболка',
    slot: 'body',
    price: 0,
    default: true,
    render: 'tshirt',
    color: '#95a5a6',
  },
  'body_hoodie': {
    id: 'body_hoodie',
    name: 'Худи',
    slot: 'body',
    price: 250,
    render: 'hoodie',
    color: '#e67e22',
  },
  'body_suit': {
    id: 'body_suit',
    name: 'Деловой костюм',
    slot: 'body',
    price: 500,
    render: 'suit',
    color: '#2c3e50',
  },

  // ========== РУКИ (arms) ==========
  'arms_default': {
    id: 'arms_default',
    name: 'Голые руки',
    slot: 'arms',
    price: 0,
    default: true,
    render: 'skin',
    color: null,  // использует цвет кожи
  },
  'arms_gloves': {
    id: 'arms_gloves',
    name: 'Перчатки',
    slot: 'arms',
    price: 150,
    render: 'gloves',
    color: '#7f8c8d',
  },
  'arms_bracers': {
    id: 'arms_bracers',
    name: 'Наручи',
    slot: 'arms',
    price: 300,
    render: 'bracers',
    color: '#f1c40f',
  },

  // ========== НОГИ (legs) ==========
  'legs_default': {
    id: 'legs_default',
    name: 'Синие джинсы',
    slot: 'legs',
    price: 0,
    default: true,
    render: 'pants',
    color: '#2980b9',
  },
  'legs_shorts': {
    id: 'legs_shorts',
    name: 'Шорты',
    slot: 'legs',
    price: 100,
    render: 'shorts',
    color: '#27ae60',
  },
  'legs_skirt': {
    id: 'legs_skirt',
    name: 'Юбка',
    slot: 'legs',
    price: 200,
    render: 'skirt',
    color: '#8e44ad',
  },

  // ========== ОБУВЬ (shoes) ==========
  'shoes_default': {
    id: 'shoes_default',
    name: 'Кроссовки',
    slot: 'shoes',
    price: 0,
    default: true,
    render: 'sneakers',
    color: '#2c3e50',
  },
  'shoes_boots': {
    id: 'shoes_boots',
    name: 'Ботинки',
    slot: 'shoes',
    price: 180,
    render: 'boots',
    color: '#7f8c8d',
  },
  'shoes_heels': {
    id: 'shoes_heels',
    name: 'Каблуки',
    slot: 'shoes',
    price: 250,
    render: 'heels',
    color: '#e74c3c',
  },

  // ========== ШЛЯПА (hat) ==========
  'hat_default': {
    id: 'hat_default',
    name: 'Без шляпы',
    slot: 'hat',
    price: 0,
    default: true,
    render: null,
    color: null,
  },
  'hat_wizard': {
    id: 'hat_wizard',
    name: 'Колпак волшебника',
    slot: 'hat',
    price: 400,
    render: 'wizard_hat',
    color: '#8e44ad',
  },
  'hat_top': {
    id: 'hat_top',
    name: 'Цилиндр',
    slot: 'hat',
    price: 350,
    render: 'top_hat',
    color: '#2c3e50',
  },
  'head_cap': {
    id: 'head_cap',
    name: 'Бейсболка',
    slot: 'hat',
    price: 200,
    render: 'cap',
    color: '#e74c3c',
  },
  'head_astronaut': {
    id: 'head_astronaut',
    name: 'Шлем астронавта',
    slot: 'hat',
    price: 500,
    render: 'astronaut_helmet',
    color: '#ecf0f1',
  },
};

export default wardrobeItems;