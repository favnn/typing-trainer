import React, { useState, useEffect, useRef } from 'react';
import StatsDashboard from './StatsDashboard';
import KeyboardGuide from './KeyboardGuide';

const LessonTrainer = ({ lessonText, themeName, lessonNum, lang, onComplete, onBack, keyboardTheme }) => {
  const [startTime, setStartTime] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [stats, setStats] = useState(null);
  const [errors, setErrors] = useState({});
  const [correctChars, setCorrectChars] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [typingHistory, setTypingHistory] = useState([]);
  const inputRef = useRef(null);

  const targetText = lessonText;
  const targetChars = targetText.split('');
  const MIN_ACCURACY = 70;

  const styles = {
    container: { padding: '1rem', maxWidth: '1200px', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' },
    backBtn: { background: '#3a3a4a', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' },
    title: { textAlign: 'center' },
    lessonDisplay: { background: '#2d2d3a', padding: '10px', borderRadius: '20px', margin: '1rem 0' },
    lessonText: { fontSize: '1.8rem', lineHeight: '2.5rem', fontFamily: 'monospace', letterSpacing: '2px', wordBreak: 'break-all' },
    charCorrect: { color: '#ffffff', textShadow: '0 0 5px #4caf50' },
    charIncorrect: { color: '#f44336', backgroundColor: 'rgba(244, 67, 54, 0.3)', borderRadius: '3px', display: 'inline-block', minWidth: '20px' },
    charCurrent: { color: '#ffd700', backgroundColor: 'rgba(255, 215, 0, 0.2)', borderBottom: '2px solid #ffd700', borderRadius: '3px', display: 'inline-block', minWidth: '20px', animation: 'pulse 1s infinite' },
    charPending: { color: '#888', display: 'inline-block', minWidth: '20px' },
    progress: { textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', opacity: 0.7 },
    input: { width: '100%', padding: '12px', fontSize: '1.2rem', background: '#1e1e2f', border: '2px solid #4a4a5a', color: 'white', borderRadius: '12px', outline: 'none', marginTop: '1rem' },
    completeScreen: { textAlign: 'center', padding: '2rem' },
    actions: { display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' },
    primaryBtn: { background: '#4caf50', border: 'none', color: 'white', padding: '12px 24px', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' },
    dangerBtn: { background: '#f44336', border: 'none', color: 'white', padding: '12px 24px', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' },
    hint: { textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: '#ffd700' },
    failMessage: { background: 'rgba(244, 67, 54, 0.2)', border: '1px solid #f44336', borderRadius: '12px', padding: '1rem', marginTop: '1rem', color: '#f44336' },
    successMessage: { background: 'rgba(76, 175, 80, 0.2)', border: '1px solid #4caf50', borderRadius: '12px', padding: '1rem', marginTop: '1rem', color: '#4caf50' }
  };

  const startLesson = () => { setIsActive(true); setStartTime(Date.now()); };

  const finishLesson = () => {
    if (!isActive) return;
    const duration = (Date.now() - startTime) / 1000;
    const totalChars = correctChars + mistakesCount;
    const accuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 0;
    const cpm = Math.round((targetChars.length / duration) * 60);
    const wpm = Math.round(cpm / 5);
    const problemKeys = Object.keys(errors).sort((a, b) => errors[b] - errors[a]).slice(0, 5);
    const canPass = accuracy >= MIN_ACCURACY;
    let coinsEarned = 0;
    if (canPass) {
      coinsEarned = 20;
      if (accuracy > 95) coinsEarned += 15;
      if (wpm > 50) coinsEarned += 20;
      if (wpm > 70) coinsEarned += 30;
    }
    const finalPoint = {
      second: Math.max(1, Math.round(duration)),
      wpm: Math.round(wpm),
      raw: Math.round(cpm),
      burst: Math.round(wpm),
      errors: mistakesCount
    };

    setTypingHistory(prev => {
      if (prev.length > 0 && prev[prev.length - 1].second === finalPoint.second) {
        const updated = [...prev];
        updated[updated.length - 1] = finalPoint;
        return updated;
      }

      return [...prev, finalPoint];
    });
    setStats({
      wpm: Math.round(wpm), raw: Math.round(cpm), cpm, accuracy: Math.round(accuracy),
      duration: Math.round(duration), language: lang === 'russian' ? 'Русский' : 'English',
      type: `${themeName}, урок ${lessonNum}`, problemKeys, passed: canPass, coinsEarned
    });
    setIsActive(false);
  };

  const addTypingHistoryPoint = (newCorrectChars, newMistakesCount, newIndex) => {
  if (!startTime) return;

  const elapsed = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
  const totalTyped = newIndex;

  const cpm = Math.round(totalTyped / (elapsed / 60));
  const wpm = Math.round(cpm / 5);

  setTypingHistory(prev => {
    const existingIndex = prev.findIndex(item => item.second === elapsed);

    const point = {
      second: elapsed,
      wpm,
      raw: cpm,
      burst: wpm,
      errors: newMistakesCount
    };

    if (existingIndex !== -1) {
      const updated = [...prev];
      updated[existingIndex] = point;
      return updated;
    }

    return [...prev, point];
  });
};

const handleKeyPress = (e) => {
    const key = e.key === 'Spacebar' ? ' ' : e.key;
    if (e.metaKey || e.ctrlKey || e.altKey) {
      return;
    }

    if (key === 'Backspace') {
      e.preventDefault();

      if (currentCharIndex > 0) {
        setCurrentCharIndex(prev => prev - 1);
        setDisplayText(prev => prev.slice(0, -1));
      }

      return;
    }
    if (key.length !== 1) {
      return;
    }
    if (!isActive) {
      startLesson();
    }
    if (currentCharIndex >= targetChars.length) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    const expectedChar = targetChars[currentCharIndex];
    setDisplayText(prev => prev + key);

    let newCorrectChars = correctChars;
    let newMistakesCount = mistakesCount;

    if (key === expectedChar) {
      newCorrectChars = correctChars + 1;
      setCorrectChars(newCorrectChars);
    } else {
      newMistakesCount = mistakesCount + 1;
      setMistakesCount(newMistakesCount);

      setErrors(prev => ({
        ...prev,
        [expectedChar.toLowerCase()]: (prev[expectedChar.toLowerCase()] || 0) + 1
      }));
    }

    const newIndex = currentCharIndex + 1;

    addTypingHistoryPoint(newCorrectChars, newMistakesCount, newIndex);

    setCurrentCharIndex(newIndex);

    if (newIndex >= targetChars.length) {
      finishLesson();
    }
  };

  const handleRetry = () => {
    setDisplayText(''); setCurrentCharIndex(0); setCorrectChars(0); setMistakesCount(0);
    setErrors({}); setStats(null); setIsActive(false); setStartTime(null); setTypingHistory([]);
    setTimeout(() => { if (inputRef.current) inputRef.current.focus(); }, 100);
  };

  const renderLessonText = () => (
    <div style={styles.lessonText}>
      <style>{`@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.7; } }`}</style>
      {targetChars.map((char, index) => {
        let style = styles.charPending;
        if (index < currentCharIndex) {
          style = displayText[index] === char ? styles.charCorrect : styles.charIncorrect;
        } else if (index === currentCharIndex) {
          style = styles.charCurrent;
        }
        const isSpace = char === ' ';
        return (
          <span
            key={index}
            style={
              isSpace
                ? {
                    ...style,
                    borderBottom: 'none',
                    backgroundColor: 'transparent',
                    boxShadow: 'none'
                  }
                : style
            }
          >
            {isSpace ? '\u00A0' : char}
          </span>
        );
      })}
    </div>
  );

  useEffect(() => {
    if (isActive && startTime) {
      const recordInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);

        if (elapsed <= 0) return;

        const totalChars = correctChars + mistakesCount;

        const currentWPM = totalChars > 0
          ? Math.round((totalChars / 5) / (elapsed / 60))
          : 0;

        const currentRAW = totalChars > 0
          ? Math.round(totalChars / (elapsed / 60))
          : 0;

        setTypingHistory(prev => {
          const existingIndex = prev.findIndex(item => item.second === elapsed);

          const newRecord = {
            second: elapsed,
            wpm: currentWPM,
            raw: currentRAW,
            burst: currentWPM,
            errors: mistakesCount
          };

          if (existingIndex !== -1) {
            const updated = [...prev];
            updated[existingIndex] = {
              ...newRecord,
              burst: Math.max(updated[existingIndex].burst, currentWPM)
            };
            return updated;
          }

          return [...prev, newRecord];
        });
      }, 1000);

      return () => clearInterval(recordInterval);
    }
  }, [isActive, startTime, correctChars, mistakesCount]);

  useEffect(() => { if (inputRef.current && !stats) inputRef.current.focus(); }, [stats]);

  if (stats) {
    const canPass = stats.accuracy >= MIN_ACCURACY;
    return (
      <div style={styles.container}>
        <div style={styles.completeScreen}>
          <StatsDashboard stats={stats} title="📈 Результат урока" typingHistory={typingHistory} />
          {canPass ? (
            <>
              <div style={styles.successMessage}>
                ✅ Отлично! Вы набрали {stats.accuracy}% точности. Урок пройден! 💰 Вы заработали {stats.coinsEarned} монет!
              </div>
            </>
          ) : (
            <div style={styles.failMessage}>
              ❌ К сожалению, ваша точность {stats.accuracy}% ниже требуемых {MIN_ACCURACY}%.<br/>
              Вам нужно пройти урок заново, чтобы получить монеты и открыть следующий урок.
            </div>
          )}
          <div style={styles.actions}>
            <button style={styles.backBtn} onClick={onBack}>◀ К списку уроков</button>
            {!canPass && <button style={styles.dangerBtn} onClick={handleRetry}>🔄 Пройти урок заново</button>}
            {canPass && <button style={styles.primaryBtn} onClick={() => onComplete(stats)}>✅ Забрать монеты и продолжить</button>}
          </div>
          {!canPass && <div style={styles.hint}>💡 Совет: Печатайте медленнее, но точнее. Backspace работает - можно исправлять ошибки!</div>}
        </div>
      </div>
    );
  }

  const nextChar = targetChars[currentCharIndex];
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={onBack}>← Назад</button>
        <div style={styles.title}><h2>{themeName}</h2><p>Урок {lessonNum} | Язык: {lang === 'russian' ? 'Русский' : 'English'}</p></div>
        <div style={{ width: '80px' }}></div>
      </div>
      <div style={styles.lessonDisplay}>{renderLessonText()}</div>
      <div style={styles.progress}>
        Прогресс: {currentCharIndex} / {targetChars.length} символов | ✅ Правильно: {correctChars} | ❌ Ошибок: {mistakesCount}
      </div>
      <input ref={inputRef} type="text" value={displayText} onKeyDown={handleKeyPress}
        onChange={(e) => e.preventDefault()} placeholder="Нажмите любую клавишу для начала..." style={styles.input} autoFocus />

      <KeyboardGuide nextChar={nextChar} keyboardTheme={keyboardTheme} language={lang}/>
    </div>
  );
};

export default LessonTrainer;