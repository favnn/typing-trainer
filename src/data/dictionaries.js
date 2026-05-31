export const russianWords = [
  // Базовые (30)
  'мама', 'папа', 'дом', 'кот', 'собака', 'солнце', 'луна', 'звезда', 'вода', 'огонь',
  'земля', 'воздух', 'радость', 'грусть', 'бег', 'сон', 'еда', 'работа', 'игра', 'книга',
  'стол', 'стул', 'окно', 'дверь', 'город', 'дерево', 'цветок', 'птица', 'рыба', 'машина',
  
  // Дополнительные (70)
  'друг', 'подруга', 'семья', 'школа', 'учитель', 'урок', 'задание', 'компьютер', 'интернет', 'сайт',
  'программа', 'разработка', 'код', 'ошибка', 'решение', 'вопрос', 'ответ', 'пример', 'страница', 'текст',
  'клавиша', 'кнопка', 'экран', 'мышь', 'клавиатура', 'монитор', 'ноутбук', 'телефон', 'планшет', 'приложение',
  'утро', 'день', 'вечер', 'ночь', 'неделя', 'месяц', 'год', 'время', 'минута', 'секунда',
  'работа', 'отдых', 'спорт', 'музыка', 'фильм', 'книга', 'путешествие', 'природа', 'здоровье', 'счастье',
  'любовь', 'дружба', 'успех', 'мечта', 'цель', 'радость', 'удача', 'вдохновение', 'творчество', 'развитие',
  'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье', 'зима', 'весна', 'лето',
  'осень', 'север', 'юг', 'запад', 'восток', 'гора', 'река', 'море', 'океан', 'лес'
];

export const englishWords = [
  // Basic (30)
  'hello', 'world', 'cat', 'dog', 'sun', 'moon', 'star', 'water', 'fire', 'earth',
  'air', 'joy', 'sad', 'run', 'sleep', 'food', 'work', 'play', 'book', 'table',
  'chair', 'window', 'door', 'city', 'tree', 'flower', 'bird', 'fish', 'car', 'house',
  
  // Additional (70)
  'friend', 'family', 'school', 'teacher', 'lesson', 'task', 'computer', 'internet', 'website', 'program',
  'development', 'code', 'error', 'solution', 'question', 'answer', 'example', 'page', 'text', 'key',
  'button', 'screen', 'mouse', 'keyboard', 'monitor', 'laptop', 'phone', 'tablet', 'app', 'morning',
  'day', 'evening', 'night', 'week', 'month', 'year', 'time', 'minute', 'second', 'work',
  'rest', 'sport', 'music', 'movie', 'book', 'travel', 'nature', 'health', 'happiness', 'love',
  'friendship', 'success', 'dream', 'goal', 'luck', 'inspiration', 'creativity', 'development', 'monday', 'tuesday',
  'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'winter', 'spring', 'summer', 'autumn', 'north',
  'south', 'west', 'east', 'mountain', 'river', 'sea', 'ocean', 'forest', 'sky', 'cloud'
];

export const codeSnippetsByDifficulty = {
  easy: [
    'let lives = 3;',
    'let score = 0;',
    'const speed = 10;',
    'const name = "Alex";',
    'let isReady = true;',
    'score = score + 1;',
    'lives = lives - 1;',
    'console.log("hello");',
    'const coins = 100;',
    'let level = 1;',
    'const age = 12;',
    'let timer = 30;',
    'const color = "red";',
    'let isWin = false;',
    'console.log(score);'
  ],

  medium: [
    'const user = { name: "Alex", level: 7 };',
    'const keys = ["a", "s", "d", "f"];',
    'if (score > 100) { level++; }',
    'if (isReady) { start(); } else { wait(); }',
    'for (let i = 0; i < 5; i++) { coins += i; }',
    'const result = speed >= 30 ? "fast" : "slow";',
    'array.map(item => item.name);',
    'button.addEventListener("click", startGame);',
    'while (timer > 0) { timer--; }',
    'game.score += combo * 2;',
    'const player = { hp: 100, mana: 50 };',
    'const numbers = [1, 2, 3, 4, 5];',
    'if (lives === 0) { gameOver(); }',
    'const total = price * count;',
    'items.filter(item => item.active);'
  ],

  hard: [
    'export default function App() { return <main>Hello</main>; }',
    'function add(a, b) { return a + b; }',
    'try { saveResult(); } catch (error) { console.log(error); }',
    '<div className="card">Hello</div>',
    '<button onClick={startGame}>Start</button>',
    'document.querySelector(".btn").classList.add("active");',
    'const handleClick = () => { setScore(score + 1); };',
    'useEffect(() => { resetTest(); }, [mode]);',
    'const newItems = items.map(item => ({ ...item, active: true }));',
    'async function loadData() { const data = await fetch(url); }',
    'return users.filter(user => user.level > 5).map(user => user.name);',
    'const App = () => <div className="app">Typing</div>;',
    'localStorage.setItem("userData", JSON.stringify(userData));',
    'const updatedUser = { ...user, coins: user.coins + 10 };',
    'window.addEventListener("keydown", handleKeyDown);'
  ]
};

export const punctuationMarks = ['!', ',', '.', '?', '(', ')', '"', '-', ';', ':'];

export const quotes = [
  { text: "The only limit is your mind.", lang: 'en' },
  { text: "Быстрее, выше, сильнее!", lang: 'ru' },
  { text: "To be or not to be, that is the question.", lang: 'en' },
  { text: "Умом Россию не понять.", lang: 'ru' },
  { text: "The secret of getting ahead is getting started.", lang: 'en' },
  { text: "Не ошибается тот, кто ничего не делает.", lang: 'ru' },
  { text: "Life is what happens when you're busy making other plans.", lang: 'en' },
  { text: "Без труда не выловишь и рыбку из пруда.", lang: 'ru' },
  { text: "Code is poetry.", lang: 'en' },
  { text: "Программирование — это искусство.", lang: 'ru' }
];