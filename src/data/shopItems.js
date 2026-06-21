import wardrobeItems from './wardrobeItems';
import bg67 from '../assets/bg/67-bg.png';
import bgCheremsha from '../assets/bg/cheremsha-bg.webp';
import bgSigma from '../assets/bg/sigma-bg.jpg';
import bgBrainRot from '../assets/bg/brainrot-bg.JPG';
import bgFnaf from '../assets/bg/fnaf-bg.jpg';

const shopItems = [
  // ========== ОБОИ ==========
  { 
    id: 'bg_default', name: 'Стандартный', category: 'background', price: 0, default: true,
    style: { background: '#22272e' }
  },
  { 
    id: 'bg_ocean', name: 'Океан', category: 'background', price: 150,
    style: { background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' }
  },
  { 
    id: 'bg_sunset', name: 'Закат', category: 'background', price: 200,
    style: { background: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)' }
  },
  { 
    id: 'bg_forest', name: 'Лес', category: 'background', price: 250,
    style: { background: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)' }
  },
  { 
    id: 'bg_galaxy', name: 'Галактика', category: 'background', price: 500,
    style: { background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }
  },
  {
    id: 'bg_67',
    name: 'Фон 67',
    category: 'background',
    price: 420,
    style: {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)), url(${bg67})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#1e1e2f'
    }
  },
  {
    id: 'bg_cheremsha',
    name: 'Черемша мем',
    category: 'background',
    price: 420,
    style: {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.10), rgba(0,0,0,0.10)), url(${bgCheremsha})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#fee7cf'
    }
  },
  {
    id: 'bg_sigma',
    name: 'Сигма',
    category: 'background',
    price: 500,
    style: {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.20), rgba(0,0,0,0.20)), url(${bgSigma})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#101827'
    },
    hidden: true
  },
  {
    id: 'bg_brainrot',
    name: 'Брейнрот',
    category: 'background',
    price: 500,
    style: {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.20), rgba(0,0,0,0.20)), url(${bgBrainRot})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#101827'
    }
  },
  {
    id: 'bg_fnaf',
    name: 'Fnaf',
    category: 'background',
    price: 500,
    style: {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.20), rgba(0,0,0,0.20)), url(${bgFnaf})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#101827'
    }
  },

  // ========== РАСКЛАДКИ ==========
  { 
    id: 'kb_default', name: 'Классическая', category: 'keyboard', price: 0, default: true,
    style: { keyBg: 'transparent', keyBorder: '#cbd0df', keyText: '#cbd0df', highlightBg: '#cbd0df', highlightText: '#22272e' }
  },
  { 
    id: 'kb_neon', name: 'Неон', category: 'keyboard', price: 300,
    style: { keyBg: '#1a1a2e', keyBorder: '#e94560', keyText: '#ffffff', highlightBg: '#e94560', highlightText: '#ffffff' }
  },
  { 
    id: 'kb_aurora', name: 'Аврора', category: 'keyboard', price: 400,
    style: { keyBg: '#16213e', keyBorder: '#0f3460', keyText: '#e0e0e0', highlightBg: '#533483', highlightText: '#ffffff' }
  },
  { 
    id: 'kb_gold', name: 'Золотая', category: 'keyboard', price: 600,
    style: { keyBg: '#2d2d3a', keyBorder: '#ffd700', keyText: '#ffd700', highlightBg: '#ffd700', highlightText: '#1e1e2f' }
  },

  // ========== ГАРДЕРОБ (все предметы) ==========
  ...Object.values(wardrobeItems).map(item => ({
    ...item,
    category: item.slot      // категория = слот (head, body, arms, legs, shoes, hat)
  }))
];

export default shopItems;
