// Русские темы (бывшие lessonsByTheme)
export const russianLessonsByTheme = [
  { name: "А, О и Г", letters: ['а', 'о', 'г'] },
  { name: "в,у,л и ш", letters: ['в', 'у', 'л', 'ш'] },
  { name: "ы,ц,д,щ", letters: ['ы', 'ц', 'д', 'щ'] },
  { name: "п,е,р,н", letters: ['п', 'е', 'р', 'н'] },
  { name: "ф,й,з", letters: ['ф', 'й', 'з'] },
  { name: "к,и,т", letters: ['к', 'и', 'т'] },
  { name: "м,ь,с", letters: ['м', 'ь', 'с'] },
  { name: "ч,я", letters: ['ч', 'я'] },
  { name: "х,ъ", letters: ['х', 'ъ'] },
  { name: "ж,э", letters: ['ж', 'э'] },
  { name: "б,ю", letters: ['б', 'ю'] }
];

// Английские темы (аналогичное количество)
export const englishLessonsByTheme = [
  { name: "A, B, C", letters: ['a', 'b', 'c'] },
  { name: "D, E, F", letters: ['d', 'e', 'f'] },
  { name: "G, H, I", letters: ['g', 'h', 'i'] },
  { name: "J, K, L", letters: ['j', 'k', 'l'] },
  { name: "M, N, O", letters: ['m', 'n', 'o'] },
  { name: "P, Q, R", letters: ['p', 'q', 'r'] },
  { name: "S, T, U", letters: ['s', 't', 'u'] },
  { name: "V, W, X", letters: ['v', 'w', 'x'] },
  { name: "Y, Z", letters: ['y', 'z'] },
  { name: "Повторение A-M", letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'] },
  { name: "Повторение N-Z", letters: ['n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] }
];

// Количество уроков в каждой теме (одинаково для всех тем)
const LESSONS_PER_THEME = 5; // 5 типов упражнений

// Генератор текста урока – теперь учитывает язык
export function generateLessonText(themeIndex, lessonIndex, lang) {
  // Выбираем нужный набор тем
  const themes = lang === 'russian' ? russianLessonsByTheme : englishLessonsByTheme;
  const currentLetters = themes[themeIndex].letters;
  const step = lessonIndex % LESSONS_PER_THEME;

  // Тип упражнения в зависимости от номера урока внутри темы
  if (step === 0) {
    // Повтор каждой буквы по 3 раза
    let result = [];
    for (let i = 0; i < 3; i++) {
      currentLetters.forEach(l => {
        result.push(l.repeat(3));
      });
    }
    return result.join(' ');
  } else if (step === 1) {
    // Случайные одиночные буквы
    let result = [];
    for (let i = 0; i < 20; i++) {
      result.push(currentLetters[Math.floor(Math.random() * currentLetters.length)]);
    }
    return result.join(' ');
  } else if (step === 2) {
    // Двухбуквенные сочетания
    let result = [];
    for (let i = 0; i < 15; i++) {
      const l1 = currentLetters[Math.floor(Math.random() * currentLetters.length)];
      const l2 = currentLetters[Math.floor(Math.random() * currentLetters.length)];
      result.push(l1 + l2);
    }
    return result.join(' ');
  } else if (step === 3) {
    // Трёхбуквенные сочетания
    let result = [];
    for (let i = 0; i < 12; i++) {
      const l1 = currentLetters[Math.floor(Math.random() * currentLetters.length)];
      const l2 = currentLetters[Math.floor(Math.random() * currentLetters.length)];
      const l3 = currentLetters[Math.floor(Math.random() * currentLetters.length)];
      result.push(l1 + l2 + l3);
    }
    return result.join(' ');
  } else {
    // Короткие "слова" из 2-5 букв
    let result = [];
    for (let i = 0; i < 10; i++) {
      let len = 2 + Math.floor(Math.random() * 4);
      let word = '';
      for (let j = 0; j < len; j++) {
        word += currentLetters[Math.floor(Math.random() * currentLetters.length)];
      }
      result.push(word);
    }
    return result.join(' ');
  }
}

// Для обратной совместимости (если где-то используется старый экспорт)
export const lessonsByTheme = russianLessonsByTheme;