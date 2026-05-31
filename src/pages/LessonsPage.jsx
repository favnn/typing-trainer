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
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    header: { marginBottom: '2rem' },
    langSwitch: { display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' },
    langBtn: { background: '#3a3a4a', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' },
    langBtnActive: { background: '#4caf50' },
    progressBarContainer: { background: '#2d2d3a', borderRadius: '20px', padding: '0.5rem', marginBottom: '1rem', position: 'relative' },
    progressBar: { background: '#4caf50', height: '30px', borderRadius: '15px', transition: 'width 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' },
    themesList: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    themeCard: { background: '#2a2a3b', borderRadius: '16px', padding: '1rem' },
    themeTitle: { marginBottom: '1rem', color: '#ffd700' },
    lessonsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' },
    lessonBtn: { background: '#3a3a4a', border: 'none', color: 'white', padding: '10px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' },
    lessonCompleted: { background: '#4caf50', color: 'white' },
    lessonLocked: { background: '#2a2a3a', opacity: 0.5, cursor: 'not-allowed' },
    stats: { fontSize: '0.7rem', marginTop: '5px', color: '#aaa' }
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
      <div style={styles.header}>
        <div style={styles.langSwitch}>
          <button style={{ ...styles.langBtn, ...(selectedLang === 'russian' ? styles.langBtnActive : {}) }} onClick={() => setSelectedLang('russian')}>🇷🇺 Русский</button>
          <button style={{ ...styles.langBtn, ...(selectedLang === 'english' ? styles.langBtnActive : {}) }} onClick={() => setSelectedLang('english')}>🇬🇧 English</button>
        </div>
        <div style={styles.progressBarContainer}>
          <div style={{ ...styles.progressBar, width: `${percentComplete}%` }}>{percentComplete}%</div>
        </div>
        <p style={{ textAlign: 'center' }}>Пройдено уроков: {completedLessons} из {totalLessons}</p>
      </div>
      <div style={styles.themesList}>
        {currentThemes.map((theme, themeIdx) => {
          const themeCompleted = [...Array(LESSONS_PER_THEME)].filter((_, lessonIdx) => progress[`${themeIdx}_${lessonIdx}`]).length;
          return (
            <div key={themeIdx} style={styles.themeCard}>
              <h3 style={styles.themeTitle}>Тема {themeIdx + 1}: {theme.name} <span style={{ fontSize: '0.8rem', marginLeft: '10px' }}>({themeCompleted}/{LESSONS_PER_THEME})</span></h3>
              <div style={styles.lessonsGrid}>
                {[...Array(LESSONS_PER_THEME)].map((_, lessonIdx) => {
                  const isCompleted = progress[`${themeIdx}_${lessonIdx}`];
                  const isUnlocked = isLessonUnlocked(themeIdx, lessonIdx);
                  let buttonStyle = { ...styles.lessonBtn };
                  if (isCompleted) buttonStyle = { ...buttonStyle, ...styles.lessonCompleted };
                  else if (!isUnlocked) buttonStyle = { ...buttonStyle, ...styles.lessonLocked };
                  return (
                    <button key={lessonIdx} style={buttonStyle} onClick={() => handleSelectLesson(themeIdx, lessonIdx)} disabled={!isUnlocked}>
                      Урок {lessonIdx + 1}{isCompleted && ' ✓'}
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