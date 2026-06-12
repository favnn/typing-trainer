import React, { useState, useEffect, useRef } from 'react';
import { russianWords, englishWords, quotes, punctuationMarks, codeSnippetsByDifficulty } from '../data/dictionaries';
import KeyboardGuide from '../components/KeyboardGuide';
import StatsDashboard from '../components/StatsDashboard';
import ComboSystem from '../components/ComboSystem';

const TestPage = ({ userData, updateUserData, practiceKeys = [], onPracticeComplete, keyboardTheme }) => {
  const [mode, setMode] = useState('words');
  const [wordCount, setWordCount] = useState(10);
  const [codeDifficulty, setCodeDifficulty] = useState('easy');
  const [punctuation, setPunctuation] = useState(false);
  const [language, setLanguage] = useState('russian');
  const [currentText, setCurrentText] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [stats, setStats] = useState(null);
  const [errors, setErrors] = useState({});
  const [mistakesCount, setMistakesCount] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [combo, setCombo] = useState(0);
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [practiceProblemKeys, setPracticeProblemKeys] = useState([]);
  const [typingHistory, setTypingHistory] = useState([]); // массив для хранения показателей по секундам

  const dictionary = language === 'russian' ? russianWords : englishWords;
  const codeDifficultyLabels = {
    easy: 'Лёгкая',
    medium: 'Средняя',
    hard: 'Сложная'
  };
  const modeOptions = [
    { value: 'words', label: 'слова' },
    { value: 'time', label: 'время' },
    { value: 'quote', label: 'цитата' },
    { value: 'code', label: 'код' }
  ];
  const wordCountOptions = [10, 25, 50];
  const difficultyOptions = ['easy', 'medium', 'hard'];

  const styles = {
    container: {
      minHeight: '100vh',
      maxWidth: '1040px',
      margin: '0 auto',
      padding: '36px clamp(20px, 6vw, 86px) 42px'
    },
    header: {
      height: '44px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '42px'
    },
    title: {
      color: '#6d7887',
      fontSize: '18px',
      lineHeight: 1.2,
      fontWeight: 600
    },
    headerStats: {
      display: 'flex',
      gap: '8px',
      color: '#6d7887',
      fontSize: '13px'
    },
    statPill: {
      minWidth: '42px',
      minHeight: '35px',
      padding: '0 12px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px',
      background: '#272e35'
    },
    process: {
      display: 'flex',
      flexDirection: 'column',
      gap: '18px'
    },
    settings: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      flexWrap: 'wrap',
      minHeight: '35px'
    },
    btn: {
      minHeight: '32px',
      background: '#272e35',
      border: 'none',
      color: '#6d7887',
      padding: '0 14px',
      borderRadius: '8px',
      fontWeight: 500,
      fontSize: '14px',
      fontFamily: 'inherit'
    },
    btnActive: {
      color: '#4895ef',
      background: 'rgba(72, 149, 239, 0.1)'
    },
    btnDisabled: {
      opacity: 0.45,
      cursor: 'not-allowed'
    },
    iconBtn: {
      width: '35px',
      minHeight: '35px',
      padding: 0,
      fontSize: '18px'
    },
    group: {
      display: 'inline-flex',
      overflow: 'hidden',
      borderRadius: '8px',
      background: '#272e35'
    },
    groupBtn: {
      minHeight: '32px',
      padding: '0 14px',
      border: 0,
      background: 'transparent',
      color: '#6d7887',
      fontWeight: 500,
      fontSize: '14px',
      fontFamily: 'inherit'
    },
    groupBtnActive: {
      color: '#4895ef'
    },
    select: {
      background: '#272e35',
      color: '#6d7887',
      padding: '0 14px',
      minHeight: '32px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'inherit'
    },
    timer: {
      width: 'max-content',
      minHeight: '28px',
      display: 'inline-flex',
      alignItems: 'center',
      color: '#4895ef',
      fontSize: '14px',
      fontWeight: 600
    },
    typingArea: {
      background: 'transparent',
      padding: 0,
      margin: 0
    },
    textToType: {
      minHeight: '134px',
      maxHeight: '178px',
      overflow: 'hidden',
      fontSize: '28px',
      lineHeight: '1.58',
      marginBottom: '18px',
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'flex-start',
      gap: '0 17px',
      justifyContent: 'flex-start',
      color: '#6d7887'
    },
    word: {
      display: 'inline-block',
      padding: 0,
      borderRadius: 0,
      fontFamily: 'inherit',
      transition: 'color 0.1s ease'
    },
    wordActive: {
      color: '#8a94a5'
    },
    wordDone: {
      opacity: 0.62
    },
    charCorrect: {
      color: '#cbd0df'
    },
    charCorrectStatic: {
      color: '#cbd0df'
    },
    charIncorrect: {
      color: '#ff6b81',
      backgroundColor: 'rgba(255, 107, 129, 0.14)',
      borderRadius: '4px'
    },
    charCurrent: {
      color: '#cbd0df',
      borderLeft: '2px solid #4895ef',
      marginLeft: '-2px',
      paddingLeft: '2px'
    },
    charPending: {
      color: '#6d7887'
    },
    progress: {
      marginTop: '10px',
      fontSize: '0.9rem',
      color: '#6d7887'
    },
    input: {
      width: '100%',
      height: '35px',
      padding: '0 12px',
      fontSize: '16px',
      background: '#22272e',
      border: '1px solid #cbd0df',
      color: '#cbd0df',
      borderRadius: '8px',
      outline: 'none',
      textAlign: 'left'
    },
    practiceBanner: {
      width: 'max-content',
      maxWidth: '100%',
      padding: '8px 12px',
      borderRadius: '8px',
      background: 'rgba(72, 149, 239, 0.1)',
      color: '#4895ef',
      fontSize: '13px'
    },
    retryWrap: {
      marginTop: '18px',
      display: 'flex',
      justifyContent: 'center'
    }
  };

  const generateText = () => {
    if (mode === 'code') {
      const snippets = codeSnippetsByDifficulty[codeDifficulty] || codeSnippetsByDifficulty.easy;
      const randomSnippet = snippets[Math.floor(Math.random() * snippets.length)];

      return [randomSnippet];
    }

    if (mode === 'quote') {
      const availableQuotes = quotes.filter(q => q.lang === language);
      if (availableQuotes.length === 0) {
        return (language === 'russian' ? "Привет мир как дела у тебя все хорошо" : "hello world how are you doing today").split(' ');
      }
      const randomQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
      return randomQuote.text.split(' ');
    } else {
      let words = [...dictionary];
      if (punctuation && mode !== 'quote') {
        words = words.map(word => {
          if (Math.random() > 0.7) {
            const punct = punctuationMarks[Math.floor(Math.random() * punctuationMarks.length)];
            return word + punct;
          }
          if (Math.random() > 0.8) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }
          return word;
        });
      } else {
        words = words.map(w => w.toLowerCase());
      }
      let selected = [];
      let count = mode === 'time' ? 100 : wordCount;
      for (let i = 0; i < count; i++) {
        selected.push(words[Math.floor(Math.random() * words.length)]);
      }
      return selected;
    }
  };

  const resetTest = () => {
    setPracticeProblemKeys([]);
    setIsPracticeMode(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);
    setUserInput('');
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setStartTime(null);
    setStats(null);
    setTimeLeft(30);
    setErrors({});
    setMistakesCount(0);
    setCorrectChars(0);
    setCombo(0);
    const newText = generateText();
    setCurrentText(newText);
    setTypingHistory([]);
  };

  const startTest = () => {
    if (!isActive) {
      setIsActive(true);
      setStartTime(Date.now());

      if (mode === 'time') {
        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
          setTimeLeft(prev => Math.max(prev - 1, 0));
        }, 1000);
      }
    }
  };

  const finishTest = async () => {
  if (!isActive) return;
  setIsActive(false);
  if (timerRef.current) clearInterval(timerRef.current);

  const endTime = Date.now();
  const duration = mode === 'time' ? 30 : (endTime - startTime) / 1000;
  const totalWords = mode === 'code' ? 1 : currentWordIndex;
  const totalChars = correctChars + mistakesCount;
  const accuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 0;
  const wpm = totalWords > 0 ? (totalWords / (duration / 60)) : 0;
  const cpm = correctChars > 0 ? (correctChars / (duration / 60)) : 0;

  // Вместо generateTypingHistory, просто дополняем историю финальной точкой
  const finalSecond = Math.max(1, Math.round(duration));

  const finalPoint = {
    second: finalSecond,
    wpm: Math.round(wpm),
    raw: Math.round(cpm),
    burst: Math.round(wpm),
    errors: mistakesCount
  };

// Добавляем финальную точку, если её ещё нет
setTypingHistory(prev => {
  if (prev.length > 0 && prev[prev.length - 1].second === finalPoint.second) {
    const updated = [...prev];
    updated[updated.length - 1] = finalPoint;
    return updated;
  }
  return [...prev, finalPoint];
});

  // ================= РЕЖИМ ОТРАБОТКИ =================
  if (isPracticeMode) {
    if (accuracy >= 95 && mistakesCount === 0) {
      const newProblemKeys = { ...userData.problemKeys };
      practiceProblemKeys.forEach(key => delete newProblemKeys[key]);
      const updatedUserData = { ...userData, problemKeys: newProblemKeys };
      await updateUserData(updatedUserData);
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      alert('✅ Отработка успешна! Проблемные клавиши удалены.');
      if (onPracticeComplete) onPracticeComplete(true, updatedUserData);
    } else {
      alert('❌ Отработка не пройдена. Допущены ошибки.');
      if (onPracticeComplete) onPracticeComplete(false);
    }
    setIsPracticeMode(false);
    setPracticeProblemKeys([]);
    resetTest();
    return;
  }


  // ================= РАСЧЁТ МОНЕТ =================
  const problemKeys = Object.keys(errors).sort((a, b) => errors[b] - errors[a]).slice(0, 5);
  const multiplier = combo >= 50 ? 3.0 : combo >= 30 ? 2.5 : combo >= 20 ? 2.0 : combo >= 10 ? 1.5 : combo >= 5 ? 1.2 : 1.0;
  
  let baseCoins = 0;
  if (accuracy > 95) baseCoins += 25;
  else if (accuracy > 90) baseCoins += 15;
  else if (accuracy > 85) baseCoins += 10;
  else if (accuracy > 80) baseCoins += 5;
  
  if (wpm > 70) baseCoins += 40;
  else if (wpm > 60) baseCoins += 30;
  else if (wpm > 50) baseCoins += 20;
  else if (wpm > 40) baseCoins += 15;
  else if (wpm > 30) baseCoins += 10;
  else if (wpm > 20) baseCoins += 5;
  
  if (mode === 'time') {
    if (totalWords > 50) baseCoins += 30;
    else if (totalWords > 40) baseCoins += 20;
    else if (totalWords > 30) baseCoins += 15;
    else if (totalWords > 20) baseCoins += 10;
    else if (totalWords > 10) baseCoins += 5;
  }
  
  let coinsEarned = Math.round(baseCoins * multiplier);
  
  if (combo >= 50) coinsEarned += 100;
  else if (combo >= 30) coinsEarned += 60;
  else if (combo >= 20) coinsEarned += 35;
  else if (combo >= 15) coinsEarned += 20;
  else if (combo >= 10) coinsEarned += 10;
  else if (combo >= 5) coinsEarned += 5;
  
  if (accuracy === 100 && totalWords > 0) coinsEarned += 50;
  
  const isNewRecord = wpm > userData.bestSpeedWPM;
  if (isNewRecord) coinsEarned += 30;
  
  coinsEarned = Math.min(coinsEarned, 300);

  // ================= ФОРМИРОВАНИЕ СТАТИСТИКИ =================
  const newStats = {
    wpm: Math.round(wpm),
    cpm: Math.round(cpm),
    accuracy: Math.round(accuracy),
    duration: Math.round(duration),
    type: `${mode === 'time' ? 'Время' : mode === 'quote' ? 'Цитата' : mode === 'code' ? `Код (${codeDifficultyLabels[codeDifficulty]})` : 'Слова'} ${mode === 'code' ? 'Eng' : language === 'russian' ? 'Рус' : 'Eng'}${punctuation && mode !== 'code' ? ' + пунктуация' : ''}`,
    date: new Date().toLocaleDateString(),
    problemKeys: problemKeys,
    combo: combo,
    multiplier: multiplier,
    coinsEarned: coinsEarned,
    wordsTyped: totalWords,
    charsTyped: correctChars,
    isNewRecord: isNewRecord,
    raw: Math.round(cpm),  // CPM — это символы в минуту
    burst: Math.round(wpm) + 5,
    errorsCount: mistakesCount,
    typingHistory: typingHistory  
  };
  
  setStats(newStats);

  // ================= ОБНОВЛЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ =================
  updateUserData({
    coins: userData.coins + coinsEarned,
    bestSpeedWPM: Math.max(userData.bestSpeedWPM, Math.round(wpm)),
    bestSpeedCPM: Math.max(userData.bestSpeedCPM, Math.round(cpm)),
    lastAccuracy: Math.round(accuracy),
    bestAccuracy: Math.max(userData.bestAccuracy, Math.round(accuracy)),
    maxCombo: Math.max(userData.maxCombo || 0, combo),
    problemKeys: { ...userData.problemKeys, ...errors }
  });

  // ================= СОХРАНЕНИЕ ИСТОРИИ ТЕСТОВ =================
  const savedHistory = localStorage.getItem('testHistory');
  let history = savedHistory ? JSON.parse(savedHistory) : [];
  history.unshift(newStats);
  if (history.length > 20) history = history.slice(0, 20);
  localStorage.setItem('testHistory', JSON.stringify(history));

  // ================= ЗАПОМИНАЕМ ПРОБЛЕМНЫЕ КЛАВИШИ =================
  setPracticeProblemKeys(Object.keys(errors));
};

  useEffect(() => {
    if (mode === 'time' && isActive && timeLeft === 0 && !stats) {
      finishTest();
    }
  }, [timeLeft, mode, isActive, stats]);

  const handleInput = (e) => {
    const value = e.target.value;
    if (!isActive && value) startTest();
    const currentWord = currentText[currentWordIndex];
    if (!currentWord) { finishTest(); return; }

    if (mode === 'code') {
      if (value.length < userInput.length) {
        setUserInput(value);
        setCurrentCharIndex(value.length);
        return;
      }

      if (value.length > currentWord.length) {
        e.target.value = userInput;
        return;
      }

      const lastChar = value[value.length - 1];

      if (lastChar) {
        const expectedChar = currentWord[value.length - 1];

        let newCorrectChars = correctChars;
        let newMistakesCount = mistakesCount;

        if (lastChar === expectedChar) {
          newCorrectChars = correctChars + 1;
          setCorrectChars(newCorrectChars);
          setCombo(prev => prev + 1);
        } else {
          newMistakesCount = mistakesCount + 1;
          setMistakesCount(newMistakesCount);
          setCombo(0);

          setErrors(prev => ({
            ...prev,
            [expectedChar.toLowerCase()]: (prev[expectedChar.toLowerCase()] || 0) + 1
          }));
        }

        setUserInput(value);
        setCurrentCharIndex(value.length);
        addTypingHistoryPoint(newCorrectChars, newMistakesCount);
      }

      if (value === currentWord) {
        setTimeout(() => {
          finishTest();
        }, 100);
      }

      return;
    }
    if (value.length < userInput.length) {
      setUserInput(value);
      setCurrentCharIndex(prev => Math.max(0, prev - 1));
      return;
    }
    const lastChar = value[value.length - 1];
    if (lastChar === ' ') {
      if (currentCharIndex === currentWord.length) {
        setCurrentWordIndex(prev => prev + 1);
        setUserInput('');
        setCurrentCharIndex(0);
        if (mode !== 'time' && currentWordIndex + 1 >= currentText.length) finishTest();
      } else {
        e.target.value = userInput;
        return;
      }
    } else if (currentCharIndex < currentWord.length) {
      const expectedChar = currentWord[currentCharIndex];

      let newCorrectChars = correctChars;
      let newMistakesCount = mistakesCount;

      if (lastChar === expectedChar) {
        newCorrectChars = correctChars + 1;
        setCorrectChars(newCorrectChars);
        setCombo(prev => prev + 1);
      } else {
        newMistakesCount = mistakesCount + 1;
        setMistakesCount(newMistakesCount);
        setCombo(0);

        setErrors(prev => ({
          ...prev,
          [expectedChar.toLowerCase()]: (prev[expectedChar.toLowerCase()] || 0) + 1
        }));
      }

      setUserInput(value);
      setCurrentCharIndex(prev => prev + 1);

      addTypingHistoryPoint(newCorrectChars, newMistakesCount);
    } else {
      e.target.value = userInput;
    }
  };

  const addTypingHistoryPoint = (newCorrectChars, newMistakesCount) => {
    if (!startTime) return;

    const elapsed = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
    const totalChars = newCorrectChars + newMistakesCount;

    const currentRaw = totalChars > 0
      ? Math.round(totalChars / (elapsed / 60))
      : 0;

    const currentWPM = Math.round(currentRaw / 5);

    setTypingHistory(prev => {
      const existingIndex = prev.findIndex(item => item.second === elapsed);

      const point = {
        second: elapsed,
        wpm: currentWPM,
        raw: currentRaw,
        burst: currentWPM,
        errors: newMistakesCount
      };

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...point,
          burst: Math.max(updated[existingIndex].burst || 0, currentWPM)
        };
        return updated;
      }

      return [...prev, point];
    });
  };

  const renderTextWithHighlight = () => {
    return currentText.map((word, wordIdx) => {
      let wordStyle = { ...styles.word };
      if (wordIdx === currentWordIndex) wordStyle = { ...wordStyle, ...styles.wordActive };
      else if (wordIdx < currentWordIndex) wordStyle = { ...wordStyle, ...styles.wordDone };
      if (wordIdx === currentWordIndex) {
        const chars = word.split('');
        return (
          <span key={wordIdx} style={wordStyle}>
            {chars.map((char, charIdx) => {
              let charStyle = {};
              if (charIdx < currentCharIndex) {
                charStyle = userInput[charIdx] === char ? { ...styles.charCorrect, ...styles.charCorrectStatic } : styles.charIncorrect;
              } else if (charIdx === currentCharIndex) {
                charStyle = styles.charCurrent;
              } else {
                charStyle = styles.charPending;
              }
              const isSpace = char === ' ';

              return (
                <span
                  key={charIdx}
                  style={{
                    ...charStyle,
                    ...(isSpace
                      ? {
                          display: 'inline-block',
                          width: '14px',
                          backgroundColor: 'transparent',
                          borderBottom: 'none'
                        }
                      : {})
                  }}
                >
                  {isSpace ? '\u00A0' : char}
                </span>
              );
            })}
          </span>
        );
      }
      return <span key={wordIdx} style={wordStyle}>{word}</span>;
    });
  };

  const generatePracticeText = (problemKeys) => {
    const words = [...dictionary];
    const filteredWords = words.filter(word => problemKeys.some(key => word.includes(key)));
    let selected = [];
    let count = mode === 'time' ? 100 : wordCount;
    for (let i = 0; i < count; i++) {
      selected.push(filteredWords[i % filteredWords.length]);
    }
    return selected;
  };

  useEffect(() => { resetTest(); }, [mode, wordCount, codeDifficulty, punctuation, language]);
  useEffect(() => {
    if (inputRef.current && !stats) inputRef.current.focus();
  }, [currentText, currentWordIndex, stats]);

  useEffect(() => {
    if (practiceKeys && practiceKeys.length > 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsActive(false);
      setUserInput('');
      setCurrentWordIndex(0);
      setCurrentCharIndex(0);
      setStartTime(null);
      setStats(null);
      setTimeLeft(30);
      setErrors({});
      setMistakesCount(0);
      setCorrectChars(0);
      setCombo(0);
      setPracticeProblemKeys(practiceKeys);
      setIsPracticeMode(true);
      const practiceText = generatePracticeText(practiceKeys);
      setCurrentText(practiceText);
      setTimeout(() => { if (inputRef.current) inputRef.current.focus(); }, 100);
    }
  }, [practiceKeys]);

  const currentWord = currentText[currentWordIndex];
  let nextChar = currentWord ? currentWord[currentCharIndex] : null;
  if (currentWord && currentCharIndex >= currentWord.length) nextChar = mode === 'code' ? null : ' ';
  const modeTitle = mode === 'time' ? 'время' : mode === 'quote' ? 'цитата' : mode === 'code' ? 'код' : 'слова';
  const getButtonStyle = (active = false, extra = {}) => ({
    ...styles.btn,
    ...(active ? styles.btnActive : {}),
    ...extra
  });
  const getGroupButtonStyle = (active = false) => ({
    ...styles.groupBtn,
    ...(active ? styles.groupBtnActive : {})
  });

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Клавиатурный Тренажер</h1>
        <div style={styles.headerStats}>
          <span style={styles.statPill}>{userData.bestSpeedWPM || 0} wpm</span>
          <span style={styles.statPill}>{userData.bestAccuracy || 0}%</span>
        </div>
      </header>

      <section style={styles.process}>
        {isPracticeMode && (
          <div style={styles.practiceBanner}>
            отработка: {practiceProblemKeys.join(', ')}
          </div>
        )}

        {mode === 'time' && <div style={styles.timer}>{timeLeft}s</div>}

        <div style={styles.typingArea}>
          <div style={styles.textToType}>{renderTextWithHighlight()}</div>
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInput}
            placeholder={mode === 'code' ? 'печатайте код' : 'печатайте здесь'}
            style={styles.input}
            autoFocus
            disabled={stats !== null}
          />
          <div style={styles.progress}>
            {mode !== 'time'
              ? `${mode === 'code' ? 'элемент' : 'слово'} ${currentWordIndex + 1}/${currentText.length}`
              : `слов ${currentWordIndex} / осталось ${timeLeft}s`}
            {' · '}ok {correctChars} · err {mistakesCount} · x{combo}
          </div>
        </div>

        <div style={styles.settings}>
          <button style={{ ...getButtonStyle(false), ...styles.iconBtn }} onClick={resetTest} title="перезапустить">
            ↻
          </button>

          <button
            style={{
              ...getButtonStyle(false),
              ...(mode === 'code' ? styles.btnDisabled : {})
            }}
            onClick={() => setLanguage(language === 'russian' ? 'english' : 'russian')}
            disabled={mode === 'code'}
          >
            {mode === 'code' ? 'english' : language === 'russian' ? 'russian' : 'english'}
          </button>

          <div style={styles.group} aria-label="режим">
            {modeOptions.map(option => (
              <button
                key={option.value}
                style={getGroupButtonStyle(mode === option.value)}
                onClick={() => setMode(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>

          {mode === 'words' && (
            <div style={styles.group} aria-label="количество слов">
              {wordCountOptions.map(count => (
                <button
                  key={count}
                  style={getGroupButtonStyle(wordCount === count)}
                  onClick={() => setWordCount(count)}
                >
                  {count}
                </button>
              ))}
            </div>
          )}

          {mode === 'time' && (
            <div style={styles.group} aria-label="длительность">
              <button style={getGroupButtonStyle(true)}>30s</button>
            </div>
          )}

          {mode === 'code' && (
            <div style={styles.group} aria-label="сложность">
              {difficultyOptions.map(option => (
                <button
                  key={option}
                  style={getGroupButtonStyle(codeDifficulty === option)}
                  onClick={() => setCodeDifficulty(option)}
                >
                  {codeDifficultyLabels[option].toLowerCase()}
                </button>
              ))}
            </div>
          )}

          {mode !== 'code' && (
            <button style={getButtonStyle(punctuation)} onClick={() => setPunctuation(!punctuation)}>
              пунктуация
            </button>
          )}

          <span style={{ color: '#6d7887', fontSize: '13px' }}>{modeTitle}</span>
        </div>
      </section>

      {stats && (
        <>
          <StatsDashboard stats={stats} title="Результаты теста" typingHistory={typingHistory} />
          {practiceProblemKeys.length > 0 && (
            <div style={styles.retryWrap}>
              <button style={getButtonStyle(false)} onClick={() => {
                if (timerRef.current) clearInterval(timerRef.current);
                setIsActive(false);
                setUserInput('');
                setCurrentWordIndex(0);
                setCurrentCharIndex(0);
                setStartTime(null);
                setStats(null);
                setTimeLeft(30);
                setErrors({});
                setMistakesCount(0);
                setCorrectChars(0);
                setCombo(0);
                setIsPracticeMode(true);
                const practiceText = generatePracticeText(practiceProblemKeys);
                setCurrentText(practiceText);
                setTimeout(() => { if (inputRef.current) inputRef.current.focus(); }, 100);
              }}>Отработать ошибки ({practiceProblemKeys.join(', ')})</button>
            </div>
          )}
        </>
      )}

      {isActive && <ComboSystem combo={combo} lastAccuracy={Math.round((correctChars / (correctChars + mistakesCount)) * 100)} isActive={isActive} />}
      {
        !stats && (
          <KeyboardGuide nextChar={nextChar} keyboardTheme={keyboardTheme} language={mode === 'code' ? 'english' : language} />
        )}
    </div>
  );
};

export default TestPage;
