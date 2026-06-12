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
    container: {
      minHeight: '100vh',
      maxWidth: '1040px',
      margin: '0 auto',
      padding: '36px clamp(20px, 6vw, 86px) 42px'
    },
    header: {
      minHeight: '44px',
      display: 'grid',
      gridTemplateColumns: '120px 1fr 120px',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '42px'
    },
    backBtn: {
      minHeight: '32px',
      background: '#272e35',
      border: 'none',
      color: '#6d7887',
      padding: '0 14px',
      borderRadius: '8px',
      fontFamily: 'inherit',
      fontSize: '14px'
    },
    title: { textAlign: 'center', color: '#6d7887' },
    titleHeading: { color: '#cbd0df', fontSize: '18px', marginBottom: '6px' },
    titleMeta: { color: '#6d7887', fontSize: '13px' },
    lessonDisplay: { background: 'transparent', padding: 0, margin: '0 0 18px' },
    lessonText: {
      minHeight: '134px',
      maxHeight: '220px',
      overflow: 'hidden',
      fontSize: '28px',
      lineHeight: '1.58',
      fontFamily: 'inherit',
      wordBreak: 'break-word',
      color: '#6d7887'
    },
    charCorrect: { color: '#cbd0df' },
    charIncorrect: { color: '#ff6b81', backgroundColor: 'rgba(255, 107, 129, 0.14)', borderRadius: '4px', display: 'inline-block', minWidth: '17px' },
    charCurrent: { color: '#cbd0df', borderLeft: '2px solid #4895ef', marginLeft: '-2px', paddingLeft: '2px', display: 'inline-block', minWidth: '17px' },
    charPending: { color: '#6d7887', display: 'inline-block', minWidth: '17px' },
    progress: { marginTop: '10px', fontSize: '0.9rem', color: '#6d7887' },
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
      marginTop: '18px'
    },
    completeScreen: { textAlign: 'left' },
    actions: { display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' },
    primaryBtn: { background: '#4895ef', border: 'none', color: '#22272e', padding: '12px 18px', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit', fontWeight: 700 },
    dangerBtn: { background: 'rgba(255, 107, 129, 0.14)', border: '1px solid rgba(255, 107, 129, 0.35)', color: '#ff6b81', padding: '12px 18px', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit' },
    hint: { textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: '#6d7887' },
    failMessage: { background: 'rgba(255, 107, 129, 0.14)', border: '1px solid rgba(255, 107, 129, 0.35)', borderRadius: '8px', padding: '1rem', marginTop: '1rem', color: '#ff6b81' },
    successMessage: { background: 'rgba(72, 149, 239, 0.1)', border: '1px solid rgba(72, 149, 239, 0.35)', borderRadius: '8px', padding: '1rem', marginTop: '1rem', color: '#4895ef' }
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
          <StatsDashboard stats={stats} title="Результат урока" typingHistory={typingHistory} />
          {canPass ? (
            <>
              <div style={styles.successMessage}>
                Отлично. Точность {stats.accuracy}%. Урок пройден. Монеты: {stats.coinsEarned}.
              </div>
            </>
          ) : (
            <div style={styles.failMessage}>
              Точность {stats.accuracy}% ниже требуемых {MIN_ACCURACY}%.<br/>
              Вам нужно пройти урок заново, чтобы получить монеты и открыть следующий урок.
            </div>
          )}
          <div style={styles.actions}>
            <button style={styles.backBtn} onClick={onBack}>К списку уроков</button>
            {!canPass && <button style={styles.dangerBtn} onClick={handleRetry}>Пройти заново</button>}
            {canPass && <button style={styles.primaryBtn} onClick={() => onComplete(stats)}>Забрать монеты</button>}
          </div>
          {!canPass && <div style={styles.hint}>Печатайте медленнее и точнее. Backspace работает.</div>}
        </div>
      </div>
    );
  }

  const nextChar = targetChars[currentCharIndex];
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={onBack}>Назад</button>
        <div style={styles.title}>
          <h2 style={styles.titleHeading}>{themeName}</h2>
          <p style={styles.titleMeta}>Урок {lessonNum} · {lang === 'russian' ? 'russian' : 'english'}</p>
        </div>
        <div style={{ width: '80px' }}></div>
      </div>
      <div style={styles.lessonDisplay}>{renderLessonText()}</div>
      <div style={styles.progress}>
        {currentCharIndex}/{targetChars.length} символов · ok {correctChars} · err {mistakesCount}
      </div>
      <input ref={inputRef} type="text" value={displayText} onKeyDown={handleKeyPress}
        onChange={(e) => e.preventDefault()} placeholder="нажмите любую клавишу" style={styles.input} autoFocus />

      <KeyboardGuide nextChar={nextChar} keyboardTheme={keyboardTheme} language={lang}/>
    </div>
  );
};

export default LessonTrainer;
