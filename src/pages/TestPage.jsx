import React, { useState, useEffect, useRef } from 'react';
import { russianWords, englishWords, quotes, punctuationMarks } from '../data/dictionaries';
import KeyboardGuide from '../components/KeyboardGuide';
import StatsDashboard from '../components/StatsDashboard';
import ComboSystem from '../components/ComboSystem';

const TestPage = ({ userData, updateUserData, practiceKeys = [], onPracticeComplete, keyboardTheme }) => {
  const [mode, setMode] = useState('words');
  const [wordCount, setWordCount] = useState(10);
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
  const [lastInputTime, setLastInputTime] = useState(Date.now());
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [practiceProblemKeys, setPracticeProblemKeys] = useState([]);
  const [typingHistory, setTypingHistory] = useState([]); // массив для хранения показателей по секундам

  const dictionary = language === 'russian' ? russianWords : englishWords;

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    settings: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
      marginBottom: '2rem',
      justifyContent: 'center'
    },
    btn: {
      background: '#3a3a4a',
      border: 'none',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer'
    },
    btnActive: {
      background: '#4caf50',
      boxShadow: '0 0 8px #4caf50'
    },
    select: {
      background: '#3a3a4a',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer'
    },
    timer: {
      textAlign: 'center',
      fontSize: '2rem',
      marginBottom: '1rem',
      color: '#ffd700'
    },
    typingArea: {
      background: '#2d2d3a',
      padding: '2rem',
      borderRadius: '20px',
      margin: '1rem 0'
    },
    textToType: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
      marginBottom: '1.5rem',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      justifyContent: 'center'
    },
    word: {
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '8px',
      fontFamily: 'monospace',
      transition: 'all 0.1s'
    },
    wordActive: {
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      borderRadius: '8px'
    },
    wordDone: {
      opacity: 0.6
    },
    charCorrect: {
      color: '#ffffff',
      textShadow: '0 0 5px #4caf50'
    },
    charCorrectStatic: {
      color: '#e0e0e0'
    },
    charIncorrect: {
      color: '#f44336',
      backgroundColor: 'rgba(244, 67, 54, 0.3)',
      borderRadius: '3px'
    },
    charCurrent: {
      color: '#ffd700',
      backgroundColor: 'rgba(255, 215, 0, 0.2)',
      borderBottom: '2px solid #ffd700',
      borderRadius: '3px'
    },
    charPending: {
      color: '#888'
    },
    progress: {
      textAlign: 'center',
      marginTop: '1rem',
      fontSize: '0.9rem',
      opacity: 0.7
    },
    input: {
      width: '100%',
      padding: '12px',
      fontSize: '1.2rem',
      background: '#1e1e2f',
      border: '2px solid #4a4a5a',
      color: 'white',
      borderRadius: '12px',
      outline: 'none',
      textAlign: 'center'
    },
    nextWordHint: {
      textAlign: 'center',
      marginTop: '1rem',
      fontSize: '0.8rem',
      opacity: 0.5
    }
  };

  const generateText = () => {
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
    setLastInputTime(Date.now());
    const newText = generateText();
    setCurrentText(newText);
    setTypingHistory([]);
  };

  const startTest = () => {
    if (!isActive) {
      setIsActive(true);
      setStartTime(Date.now());
      if (mode === 'time') {
        timerRef.current = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(timerRef.current);
              finishTest();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    }
  };

  const finishTest = async () => {
  if (!isActive) return;
  setIsActive(false);
  if (timerRef.current) clearInterval(timerRef.current);

  const endTime = Date.now();
  const duration = mode === 'time' ? 30 - timeLeft : (endTime - startTime) / 1000;
  const totalWords = currentWordIndex;
  const totalChars = correctChars + mistakesCount;
  const accuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 0;
  const wpm = totalWords > 0 ? (totalWords / (duration / 60)) : 0;
  const cpm = correctChars > 0 ? (correctChars / (duration / 60)) : 0;

  // Вместо generateTypingHistory, просто дополняем историю финальной точкой
const finalPoint = {
  second: Math.round(duration),
  wpm: Math.round(wpm),
  raw: Math.round(cpm),  // CPM — это символы в минуту, то есть RAW
  burst: Math.round(wpm) + 5,
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
    type: `${mode === 'time' ? 'Время' : mode === 'quote' ? 'Цитата' : 'Слова'} ${language === 'russian' ? 'Рус' : 'Eng'}${punctuation ? ' + пунктуация' : ''}`,
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

  const handleInput = (e) => {
    const value = e.target.value;
    if (!isActive && value) startTest();
    const currentWord = currentText[currentWordIndex];
    if (!currentWord) { finishTest(); return; }
    if (value.length < userInput.length) {
      setUserInput(value);
      setCurrentCharIndex(prev => Math.max(0, prev - 1));
      setLastInputTime(Date.now());
      return;
    }
    const lastChar = value[value.length - 1];
    if (lastChar === ' ') {
      if (currentCharIndex === currentWord.length) {
        setCurrentWordIndex(prev => prev + 1);
        setUserInput('');
        setCurrentCharIndex(0);
        setLastInputTime(Date.now());
        if (mode !== 'time' && currentWordIndex + 1 >= currentText.length) finishTest();
      } else {
        e.target.value = userInput;
        return;
      }
    } else if (currentCharIndex < currentWord.length) {
      const expectedChar = currentWord[currentCharIndex];
      if (lastChar === expectedChar) {
        setCorrectChars(prev => prev + 1);
        setCombo(prev => prev + 1);
        setLastInputTime(Date.now());
      } else {
        setMistakesCount(prev => prev + 1);
        setCombo(0);
        setLastInputTime(Date.now());
        setErrors(prev => ({ ...prev, [expectedChar.toLowerCase()]: (prev[expectedChar.toLowerCase()] || 0) + 1 }));
      }
      setUserInput(value);
      setCurrentCharIndex(prev => prev + 1);
    } else {
      e.target.value = userInput;
    }
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
              return <span key={charIdx} style={charStyle}>{char}</span>;
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

  useEffect(() => { resetTest(); }, [mode, wordCount, punctuation, language]);
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

  // Запись реальной скорости каждую секунду
useEffect(() => {
  if (isActive && startTime) {
      const recordInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const totalChars = correctChars + mistakesCount;
      const currentWPM = totalChars > 0 ? Math.round((totalChars / (elapsed / 60)) / 5) : 0;  // слова в минуту
      const currentRaw = totalChars > 0 ? Math.round(totalChars / (elapsed / 60)) : 0;        // символы в минуту (RAW)
      
      setTypingHistory(prev => {
        // Обновляем последнюю запись или добавляем новую
        if (prev.length > 0 && prev[prev.length - 1].second === elapsed) {
          const updated = [...prev];
          updated[updated.length - 1] = {
            second: elapsed,
            wpm: currentWPM,
            raw: currentRaw,
            burst: Math.max(prev[prev.length - 1].burst, currentWPM),
            errors: mistakesCount
          };
          return updated;
        }
        return [...prev, {
          second: elapsed,
          wpm: currentWPM,
          raw: currentRaw,
          burst: currentWPM,
          errors: mistakesCount
        }];
      });
    }, 1000);
    
    return () => clearInterval(recordInterval);
  }
}, [isActive, startTime, correctChars, mistakesCount]);

  // Добавьте этот useEffect после других
// Запись реальной скорости КАЖДУЮ СЕКУНДУ (независимо от ошибок)
useEffect(() => {
  if (isActive && startTime) {
    const recordInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const totalChars = correctChars + mistakesCount;
      
      // WPM = слова в минуту (символы/5)
      const currentWPM = totalChars > 0 && elapsed > 0 ? Math.round((totalChars / (elapsed / 60)) / 5) : 0;
      // RAW = символы в минуту
      const currentRAW = totalChars > 0 && elapsed > 0 ? Math.round(totalChars / (elapsed / 60)) : 0;
      
      setTypingHistory(prev => {
        // Проверяем, есть ли уже запись на эту секунду
        const existingIndex = prev.findIndex(item => item.second === elapsed);
        
        const newRecord = {
          second: elapsed,
          wpm: currentWPM,
          raw: currentRAW,
          burst: currentWPM,
          errors: mistakesCount
        };
        
        if (existingIndex !== -1) {
          // Обновляем существующую запись
          const updated = [...prev];
          updated[existingIndex] = {
            ...newRecord,
            burst: Math.max(updated[existingIndex].burst, currentWPM)
          };
          return updated;
        }
        // Добавляем новую запись
        return [...prev, newRecord];
      });
    }, 1000);
    
    return () => clearInterval(recordInterval);
  }
}, [isActive, startTime, correctChars, mistakesCount]);

  const currentWord = currentText[currentWordIndex];
  let nextChar = currentWord ? currentWord[currentCharIndex] : null;
  if (currentWord && currentCharIndex >= currentWord.length) nextChar = ' ';

  return (
    <div style={styles.container}>
      <div style={styles.settings}>
        <select style={styles.select} value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="words">Слова</option>
          <option value="time">Время (30с)</option>
          <option value="quote">Цитата</option>
        </select>
        {mode === 'words' && (
          <select style={styles.select} value={wordCount} onChange={(e) => setWordCount(Number(e.target.value))}>
            <option value={10}>10 слов</option>
            <option value={25}>25 слов</option>
            <option value={50}>50 слов</option>
          </select>
        )}
        <button style={{ ...styles.btn, ...(punctuation ? styles.btnActive : {}) }} onClick={() => setPunctuation(!punctuation)}>!? Пунктуация</button>
        <button style={styles.btn} onClick={() => setLanguage(language === 'russian' ? 'english' : 'russian')}>{language === 'russian' ? '🇷🇺 RU' : '🇬🇧 EN'}</button>
        <button style={{ ...styles.btn, background: '#f44336' }} onClick={resetTest}>🔄 Сброс</button>
      </div>

      {mode === 'time' && <div style={styles.timer}>⏱️ {timeLeft} сек</div>}

      <div style={styles.typingArea}>
        <div style={styles.textToType}>{renderTextWithHighlight()}</div>
        <div style={styles.progress}>
          {mode !== 'time' ? `Слово ${currentWordIndex + 1} из ${currentText.length}` : `Напечатано слов: ${currentWordIndex} | Осталось: ${timeLeft} сек`}
          {' | '}✅ {correctChars} | ❌ {mistakesCount} | 🔥 x{combo}
        </div>
        <input ref={inputRef} type="text" value={userInput} onChange={handleInput}
          placeholder="Начните печатать... После каждого слова нажимайте ПРОБЕЛ"
          style={styles.input} autoFocus disabled={stats !== null} />
        <div style={styles.nextWordHint}>
          💡 Следующая буква: <strong style={{ color: '#ffd700' }}>{nextChar === ' ' ? 'ПРОБЕЛ' : nextChar || '✨'}</strong>
          {' | '} <strong>Backspace</strong> – удалить
        </div>
      </div>

      {stats && (
        <>
          <StatsDashboard stats={stats} title="📊 Результаты теста" typingHistory={typingHistory} />
          {practiceProblemKeys.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button onClick={() => {
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
              }}>🔁 Отработать ошибки ({practiceProblemKeys.join(', ')})</button>
            </div>
          )}
        </>
      )}

      {isActive && <ComboSystem combo={combo} lastAccuracy={Math.round((correctChars / (correctChars + mistakesCount)) * 100)} isActive={isActive} />}
      <KeyboardGuide nextChar={nextChar} keyboardTheme={keyboardTheme} />
    </div>
  );
};

export default TestPage;