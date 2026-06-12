import React, { useState, useEffect } from 'react';
import { russianLessonsByTheme, englishLessonsByTheme, generateLessonText } from '../data/lessonsData';
import LessonTrainer from '../components/LessonTrainer';

const LESSONS_PER_THEME = 5;

const LessonsPage = ({ userData, updateUserData, keyboardTheme }) => {
  const [selectedLang, setSelectedLang] = useState('russian');
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [progress, setProgress] = useState({});
  const [lessonStats, setLessonStats] = useState({});

  const currentThemes = selectedLang === 'russian' ? russianLessonsByTheme : englishLessonsByTheme;

  const styles = {
    container: {
      minHeight: '100vh',
      maxWidth: '1040px',
      margin: '0 auto',
      padding: '36px clamp(20px, 6vw, 86px) 42px'
    },
    topbar: {
      height: '44px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      marginBottom: '42px'
    },
    title: {
      color: '#6d7887',
      fontSize: '18px',
      lineHeight: 1.2,
      fontWeight: 600
    },
    langSwitch: {
      display: 'inline-flex',
      overflow: 'hidden',
      borderRadius: '8px',
      background: '#272e35'
    },
    langBtn: {
      minHeight: '32px',
      padding: '0 14px',
      background: 'transparent',
      border: 'none',
      color: '#6d7887',
      fontFamily: 'inherit',
      fontSize: '14px',
      fontWeight: 500
    },
    langBtnActive: { color: '#4895ef' },
    header: {
      marginBottom: '28px',
      padding: '1.5rem',
      borderRadius: '8px',
      background: '#272e35',
      border: '1px solid rgba(203, 208, 223, 0.08)'
    },
    progressBarContainer: {
      background: '#22272e',
      borderRadius: '8px',
      height: '32px',
      overflow: 'hidden',
      marginBottom: '1rem'
    },
    progressBar: {
      background: '#4895ef',
      height: '100%',
      minWidth: '36px',
      transition: 'width 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#22272e',
      fontWeight: 700,
      fontSize: '13px'
    },
    progressText: {
      color: '#6d7887',
      textAlign: 'center',
      fontSize: '13px'
    },
    themesList: { display: 'flex', flexDirection: 'column', gap: '16px' },
    themeCard: {
      background: '#272e35',
      borderRadius: '8px',
      padding: '1rem',
      border: '1px solid rgba(203, 208, 223, 0.08)'
    },
    themeTitle: { marginBottom: '1rem', color: '#cbd0df', fontSize: '16px' },
    themeMeta: { color: '#6d7887', fontSize: '12px', marginLeft: '10px' },
    lessonsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' },
    lessonBtn: {
      minHeight: '44px',
      background: '#22272e',
      border: '1px solid rgba(203, 208, 223, 0.08)',
      color: '#6d7887',
      padding: '10px',
      borderRadius: '8px',
      fontFamily: 'inherit'
    },
    lessonCompleted: { color: '#4895ef', borderColor: 'rgba(72, 149, 239, 0.45)' },
    lessonLocked: { opacity: 0.4, cursor: 'not-allowed' },
    stats: { fontSize: '0.7rem', marginTop: '5px', color: '#6d7887' }
  };

  useEffect(() => {
    if (userData) {
      const progressKey = selectedLang === 'russian' ? 'lessonsProgressRu' : 'lessonsProgressEn';
      const statsKey = selectedLang === 'russian' ? 'lessonsStatsRu' : 'lessonsStatsEn';
      setProgress(userData[progressKey] || {});
      setLessonStats(userData[statsKey] || {});
    }
  }, [selectedLang, userData]);

  const totalLessons = currentThemes.length * LESSONS_PER_THEME;
  const completedLessons = Object.values(progress).filter(v => v === true).length;
  const percentComplete = Math.round((completedLessons / totalLessons) * 100);

  const isLessonUnlocked = (themeIndex, lessonIndex) => {
    if (themeIndex === 0 && lessonIndex === 0) return true;
    if (lessonIndex > 0 && !progress[`${themeIndex}_${lessonIndex - 1}`]) return false;
    if (themeIndex > 0 && !progress[`${themeIndex - 1}_${LESSONS_PER_THEME - 1}`]) return false;
    return true;
  };

  const handleSelectLesson = (themeIndex, lessonIndex) => {
    if (isLessonUnlocked(themeIndex, lessonIndex)) {
      setSelectedTheme(themeIndex);
      setSelectedLesson(lessonIndex);
    }
  };

  const handleLessonComplete = (stats) => {
    const lessonKey = `${selectedTheme}_${selectedLesson}`;
    const isAlreadyCompleted = progress[lessonKey] === true;
    const progressKey = selectedLang === 'russian' ? 'lessonsProgressRu' : 'lessonsProgressEn';
    const statsKey = selectedLang === 'russian' ? 'lessonsStatsRu' : 'lessonsStatsEn';

    if (stats.accuracy >= 70) {
      if (!isAlreadyCompleted) {
        let coinsEarned = 20;
        if (stats.accuracy > 95) coinsEarned += 15;
        if (stats.wpm > 50) coinsEarned += 20;
        if (stats.wpm > 70) coinsEarned += 30;
        const newProgress = { ...progress, [lessonKey]: true };
        const newStats = { ...lessonStats, [lessonKey]: stats };
        const updatedUserData = {
          ...userData,
          coins: userData.coins + coinsEarned,
          [progressKey]: newProgress,
          [statsKey]: newStats
        };
        updateUserData(updatedUserData);
        setProgress(newProgress);
        setLessonStats(newStats);
      } else {
        const newStats = { ...lessonStats, [lessonKey]: stats };
        updateUserData({ ...userData, [statsKey]: newStats });
        setLessonStats(newStats);
      }
    }
    setSelectedTheme(null);
    setSelectedLesson(null);
  };

  if (selectedTheme !== null && selectedLesson !== null) {
    const lessonText = generateLessonText(selectedTheme, selectedLesson, selectedLang);
    const themeName = currentThemes[selectedTheme].name;
    return (
      <LessonTrainer
        lessonText={lessonText}
        themeName={themeName}
        lessonNum={selectedLesson + 1}
        lang={selectedLang}
        onComplete={handleLessonComplete}
        onBack={() => { setSelectedTheme(null); setSelectedLesson(null); }}
        keyboardTheme={keyboardTheme}
      />
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.topbar}>
        <h1 style={styles.title}>Уроки</h1>
        <div style={styles.langSwitch}>
          <button style={{ ...styles.langBtn, ...(selectedLang === 'russian' ? styles.langBtnActive : {}) }} onClick={() => setSelectedLang('russian')}>russian</button>
          <button style={{ ...styles.langBtn, ...(selectedLang === 'english' ? styles.langBtnActive : {}) }} onClick={() => setSelectedLang('english')}>english</button>
        </div>
      </div>

      <div style={styles.header}>
        <div style={styles.progressBarContainer}>
          <div style={{ ...styles.progressBar, width: `${percentComplete}%` }}>{percentComplete}%</div>
        </div>
        <p style={styles.progressText}>Пройдено уроков: {completedLessons} из {totalLessons}</p>
      </div>

      <div style={styles.themesList}>
        {currentThemes.map((theme, themeIdx) => {
          const themeCompleted = [...Array(LESSONS_PER_THEME)].filter((_, lessonIdx) => progress[`${themeIdx}_${lessonIdx}`]).length;
          return (
            <div key={themeIdx} style={styles.themeCard}>
              <h3 style={styles.themeTitle}>
                Тема {themeIdx + 1}: {theme.name}
                <span style={styles.themeMeta}>({themeCompleted}/{LESSONS_PER_THEME})</span>
              </h3>
              <div style={styles.lessonsGrid}>
                {[...Array(LESSONS_PER_THEME)].map((_, lessonIdx) => {
                  const isCompleted = progress[`${themeIdx}_${lessonIdx}`];
                  const isUnlocked = isLessonUnlocked(themeIdx, lessonIdx);
                  let buttonStyle = { ...styles.lessonBtn };
                  if (isCompleted) buttonStyle = { ...buttonStyle, ...styles.lessonCompleted };
                  else if (!isUnlocked) buttonStyle = { ...buttonStyle, ...styles.lessonLocked };
                  return (
                    <button key={lessonIdx} style={buttonStyle} onClick={() => handleSelectLesson(themeIdx, lessonIdx)} disabled={!isUnlocked}>
                      Урок {lessonIdx + 1}{isCompleted && ' done'}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LessonsPage;
