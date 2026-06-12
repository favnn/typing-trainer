import React, { useMemo } from 'react';

const StatsPage = ({ userData, onPracticeErrors }) => {
  const styles = {
    container: {
      minHeight: '100vh',
      maxWidth: '1040px',
      margin: '0 auto',
      padding: '36px clamp(20px, 6vw, 86px) 42px'
    },
    title: {
      color: '#6d7887',
      fontSize: '18px',
      lineHeight: 1.2,
      fontWeight: 600,
      marginBottom: '42px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    },
    statCard: {
      background: '#272e35',
      borderRadius: '8px',
      padding: '1.5rem',
      textAlign: 'center',
      border: '1px solid rgba(203, 208, 223, 0.08)'
    },
    statValue: {
      fontSize: '2.3rem',
      fontWeight: 700,
      color: '#cbd0df',
      marginBottom: '0.5rem'
    },
    statLabel: {
      fontSize: '0.9rem',
      color: '#6d7887'
    },
    sectionTitle: {
      fontSize: '16px',
      marginBottom: '1rem',
      color: '#cbd0df'
    },
    problemKeysSection: {
      background: '#272e35',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '16px',
      border: '1px solid rgba(203, 208, 223, 0.08)'
    },
    problemKeysList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.8rem'
    },
    problemKey: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    keyName: {
      background: '#22272e',
      padding: '0.3rem 0.8rem',
      borderRadius: '8px',
      fontFamily: 'inherit',
      fontSize: '1.1rem',
      fontWeight: 600,
      minWidth: '50px',
      textAlign: 'center',
      color: '#cbd0df'
    },
    errorBar: {
      flex: 1,
      height: '30px',
      background: '#22272e',
      borderRadius: '8px',
      overflow: 'hidden'
    },
    errorFill: {
      height: '100%',
      background: '#ff6b81',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: '10px',
      color: '#22272e',
      fontSize: '0.8rem',
      fontWeight: 700
    },
    errorCount: {
      minWidth: '60px',
      textAlign: 'right'
    },
    achievements: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem'
    },
    achievement: {
      background: '#22272e',
      borderRadius: '8px',
      padding: '1rem',
      textAlign: 'center',
      border: '1px solid rgba(72, 149, 239, 0.25)',
      color: '#cbd0df'
    },
    emptyState: {
      textAlign: 'center',
      padding: '2rem',
      opacity: 0.6
    },
    practiceButton: {
      marginTop: '1.5rem',
      padding: '12px 24px',
      background: '#4895ef',
      border: 'none',
      borderRadius: '8px',
      color: '#22272e',
      fontWeight: 700,
      fontSize: '16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      width: '100%',
      fontFamily: 'inherit'
    },
    barTrack: {
      background: '#22272e',
      borderRadius: '8px',
      height: '30px',
      overflow: 'hidden'
    },
    barFill: {
      background: '#4895ef',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#22272e',
      fontWeight: 700
    },
    muted: {
      color: '#6d7887'
    },
    list: {
      marginLeft: '1.2rem',
      lineHeight: 1.8,
      color: '#cbd0df'
    }
  };

  const problemKeysList = useMemo(() => {
    if (!userData) return [];
    return Object.entries(userData.problemKeys || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [userData]);
  
  const maxErrors = problemKeysList.length > 0 ? problemKeysList[0][1] : 1;

  const handlePracticeErrors = () => {
    if (problemKeysList.length > 0) {
      const problemKeys = problemKeysList.map(([key]) => key);
      if (onPracticeErrors) {
        onPracticeErrors(problemKeys);
      } else {
        window.location.href = '/test?practice=' + encodeURIComponent(problemKeys.join(','));
      }
    }
  };

  const achievements = [];
  if (!userData) return <div>Загрузка...</div>; // простая защита

  if (userData.bestSpeedWPM >= 70) achievements.push("Легендарный (70+ WPM)");
  else if (userData.bestSpeedWPM >= 60) achievements.push("Сверхзвуковой (60+ WPM)");
  else if (userData.bestSpeedWPM >= 50) achievements.push("Быстрый (50+ WPM)");
  else if (userData.bestSpeedWPM >= 40) achievements.push("Продвинутый (40+ WPM)");
  else if (userData.bestSpeedWPM >= 30) achievements.push("Средний (30+ WPM)");
  else if (userData.bestSpeedWPM >= 20) achievements.push("Начинающий (20+ WPM)");
  
  if (userData.bestAccuracy >= 99) achievements.push("Абсолютная точность (99%+)");
  else if (userData.bestAccuracy >= 98) achievements.push("Идеальная точность (98%+)");
  else if (userData.bestAccuracy >= 95) achievements.push("Отличная точность (95%+)");
  else if (userData.bestAccuracy >= 90) achievements.push("Хорошая точность (90%+)");
  
  if (userData.coins >= 10000) achievements.push("Легендарный коллекционер (10000+ монет)");
  else if (userData.coins >= 5000) achievements.push("Магнат (5000+ монет)");
  else if (userData.coins >= 2000) achievements.push("Коллекционер (2000+ монет)");
  else if (userData.coins >= 1000) achievements.push("Инвестор (1000+ монет)");
  else if (userData.coins >= 500) achievements.push("Накопитель (500+ монет)");
  
  if (achievements.length === 0) achievements.push("Новичок (Продолжайте тренировки)");

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Статистика</h1>
      
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{userData.bestSpeedWPM}</div>
          <div style={styles.statLabel}>рекорд wpm</div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statValue}>{userData.bestSpeedCPM}</div>
          <div style={styles.statLabel}>рекорд cpm</div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statValue}>{userData.bestAccuracy}%</div>
          <div style={styles.statLabel}>лучшая точность</div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statValue}>{userData.lastAccuracy}%</div>
          <div style={styles.statLabel}>последний тест</div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statValue}>{userData.coins}</div>
          <div style={styles.statLabel}>монет</div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statValue}>{Math.round((userData.bestSpeedWPM / 70) * 100)}%</div>
          <div style={styles.statLabel}>до 70 wpm</div>
        </div>
      </div>
      
      <div style={styles.problemKeysSection}>
        <h3 style={styles.sectionTitle}>Проблемные клавиши</h3>
        {problemKeysList.length > 0 ? (
          <>
            <div style={styles.problemKeysList}>
              {problemKeysList.map(([key, count]) => (
                <div key={key} style={styles.problemKey}>
                  <span style={styles.keyName}>"{key}"</span>
                  <div style={styles.errorBar}>
                    <div style={{...styles.errorFill, width: `${(count / maxErrors) * 100}%`}}>
                      {count > 5 && `${count} раз`}
                    </div>
                  </div>
                  <span style={styles.errorCount}>{count} ошибок</span>
                </div>
              ))}
            </div>
            
            <button
              onClick={handlePracticeErrors}
              style={styles.practiceButton}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Отработать ошибки
            </button>
          </>
        ) : (
          <div style={styles.emptyState}>
            Проблемных клавиш нет.
          </div>
        )}
      </div>
      
      <div style={styles.problemKeysSection}>
        <h3 style={styles.sectionTitle}>Достижения</h3>
        <div style={styles.achievements}>
          {achievements.map((achievement, index) => (
            <div key={index} style={styles.achievement}>
              {achievement}
            </div>
          ))}
        </div>
      </div>
      
      <div style={styles.problemKeysSection}>
        <h3 style={styles.sectionTitle}>Ваш прогресс</h3>
        <div style={{marginBottom: '1rem'}}>
          <div style={{...styles.muted, marginBottom: '0.5rem'}}>Скорость печати</div>
          <div style={styles.barTrack}>
            <div style={{
              ...styles.barFill,
              width: `${Math.min((userData.bestSpeedWPM / 70) * 100, 100)}%`,
            }}>
              {userData.bestSpeedWPM} / 70 WPM
            </div>
          </div>
        </div>
        
        <div>
          <div style={{...styles.muted, marginBottom: '0.5rem'}}>Точность</div>
          <div style={styles.barTrack}>
            <div style={{
              ...styles.barFill,
              width: `${userData.bestAccuracy}%`,
            }}>
              {userData.bestAccuracy}%
            </div>
          </div>
        </div>
      </div>
      
      <div style={styles.problemKeysSection}>
        <h3 style={styles.sectionTitle}>Советы для улучшения</h3>
        <ul style={styles.list}>
          <li>Регулярно проходите тесты для улучшения скорости.</li>
          <li>Обратите внимание на клавиши, на которых чаще всего ошибаетесь.</li>
          <li>Выполняйте уроки по темам для закрепления навыков.</li>
          <li>Чем выше точность, тем больше монет вы получаете.</li>
          {problemKeysList.length > 0 && (
            <li>Особое внимание уделите клавишам: {problemKeysList.slice(0, 3).map(([k]) => `"${k}"`).join(', ')}.</li>
          )}
          {userData.bestSpeedWPM < 40 && (
            <li>Для увеличения скорости попробуйте режим "Время".</li>
          )}
          {userData.bestAccuracy < 90 && (
            <li>Для повышения точности проходите уроки с медленным темпом.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default StatsPage;
