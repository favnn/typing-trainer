import React, { useState, useEffect, useMemo } from 'react';

const StatsPage = ({ userData, onPracticeErrors }) => {
  const [allStats, setAllStats] = useState([]);
  
  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    title: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#ffd700'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    statCard: {
      background: '#2a2a3b',
      borderRadius: '20px',
      padding: '1.5rem',
      textAlign: 'center',
      backdropFilter: 'blur(10px)',
      transition: 'transform 0.2s',
      cursor: 'pointer'
    },
    statValue: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#ffd700',
      marginBottom: '0.5rem'
    },
    statLabel: {
      fontSize: '0.9rem',
      opacity: 0.8
    },
    sectionTitle: {
      fontSize: '1.3rem',
      marginBottom: '1rem',
      color: '#ffd700'
    },
    problemKeysSection: {
      background: '#2a2a3b',
      borderRadius: '20px',
      padding: '1.5rem',
      marginBottom: '2rem'
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
      background: '#3a3a4a',
      padding: '0.3rem 0.8rem',
      borderRadius: '8px',
      fontFamily: 'monospace',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      minWidth: '50px',
      textAlign: 'center'
    },
    errorBar: {
      flex: 1,
      height: '30px',
      background: '#2d2d3a',
      borderRadius: '15px',
      overflow: 'hidden'
    },
    errorFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #f44336, #ff9800)',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: '10px',
      color: 'white',
      fontSize: '0.8rem',
      fontWeight: 'bold'
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
      background: 'rgba(76, 175, 80, 0.1)',
      borderRadius: '12px',
      padding: '1rem',
      textAlign: 'center',
      border: '1px solid rgba(76, 175, 80, 0.3)'
    },
    emptyState: {
      textAlign: 'center',
      padding: '2rem',
      opacity: 0.6
    },
    practiceButton: {
      marginTop: '1.5rem',
      padding: '12px 24px',
      background: '#ff9800',
      border: 'none',
      borderRadius: '8px',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      width: '100%',
      transition: 'transform 0.2s'
    }
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem('testHistory');
    if (savedHistory) {
      setAllStats(JSON.parse(savedHistory));
    }
  }, []);

  // Безопасная подгрузка данных из localStorage, если userData не передан
  useEffect(() => {
    if (!userData) {
      const savedData = localStorage.getItem('userData');
      if (savedData) {
        // можно было бы установить userData через пропсы, но здесь просто используем локально
        // для избежания ошибки рендера – используем данные из localStorage для отображения
        // но так как userData берётся из пропсов, оставляем как есть, без перезагрузки
      }
    }
  }, [userData]);

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

  if (userData.bestSpeedWPM >= 70) achievements.push("🚀 Легендарный (70+ WPM)");
  else if (userData.bestSpeedWPM >= 60) achievements.push("⚡ Сверхзвуковой (60+ WPM)");
  else if (userData.bestSpeedWPM >= 50) achievements.push("🏃 Быстрый (50+ WPM)");
  else if (userData.bestSpeedWPM >= 40) achievements.push("📈 Продвинутый (40+ WPM)");
  else if (userData.bestSpeedWPM >= 30) achievements.push("👍 Средний (30+ WPM)");
  else if (userData.bestSpeedWPM >= 20) achievements.push("🌱 Начинающий (20+ WPM)");
  
  if (userData.bestAccuracy >= 99) achievements.push("👑 Абсолютная точность (99%+)");
  else if (userData.bestAccuracy >= 98) achievements.push("🎯 Идеальная точность (98%+)");
  else if (userData.bestAccuracy >= 95) achievements.push("👍 Отличная точность (95%+)");
  else if (userData.bestAccuracy >= 90) achievements.push("✅ Хорошая точность (90%+)");
  
  if (userData.coins >= 10000) achievements.push("💰 Легендарный коллекционер (10000+ монет)");
  else if (userData.coins >= 5000) achievements.push("💎 Магнат (5000+ монет)");
  else if (userData.coins >= 2000) achievements.push("🏆 Коллекционер (2000+ монет)");
  else if (userData.coins >= 1000) achievements.push("⭐ Инвестор (1000+ монет)");
  else if (userData.coins >= 500) achievements.push("🪙 Накопитель (500+ монет)");
  
  if (achievements.length === 0) achievements.push("🌱 Новичок (Продолжайте тренировки!)");

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Ваша статистика</h1>
      
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{userData.bestSpeedWPM}</div>
          <div style={styles.statLabel}>🏆 Рекорд скорости (слов/мин)</div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statValue}>{userData.bestSpeedCPM}</div>
          <div style={styles.statLabel}>⚡ Рекорд скорости (знаков/мин)</div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statValue}>{userData.bestAccuracy}%</div>
          <div style={styles.statLabel}>🎯 Рекорд точности</div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statValue}>{userData.lastAccuracy}%</div>
          <div style={styles.statLabel}>📝 Последний тест</div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statValue}>{userData.coins}</div>
          <div style={styles.statLabel}>🪙 Всего монет</div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statValue}>{Math.round((userData.bestSpeedWPM / 70) * 100)}%</div>
          <div style={styles.statLabel}>🎯 Прогресс до легенды</div>
        </div>
      </div>
      
      <div style={styles.problemKeysSection}>
        <h3 style={styles.sectionTitle}>🔴 Проблемные клавиши</h3>
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
              🔁 Отработать ошибки
            </button>
          </>
        ) : (
          <div style={styles.emptyState}>
            🎉 Отлично! У вас нет проблемных клавиш. Продолжайте в том же духе!
          </div>
        )}
      </div>
      
      <div style={styles.problemKeysSection}>
        <h3 style={styles.sectionTitle}>🏅 Достижения</h3>
        <div style={styles.achievements}>
          {achievements.map((achievement, index) => (
            <div key={index} style={styles.achievement}>
              {achievement}
            </div>
          ))}
        </div>
      </div>
      
      <div style={styles.problemKeysSection}>
        <h3 style={styles.sectionTitle}>📈 Ваш прогресс</h3>
        <div style={{marginBottom: '1rem'}}>
          <div style={{marginBottom: '0.5rem'}}>Скорость печати</div>
          <div style={{background: '#2d2d3a', borderRadius: '10px', height: '30px', overflow: 'hidden'}}>
            <div style={{
              background: 'linear-gradient(90deg, #4caf50, #ffd700)',
              width: `${Math.min((userData.bestSpeedWPM / 70) * 100, 100)}%`,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              {userData.bestSpeedWPM} / 70 WPM
            </div>
          </div>
        </div>
        
        <div>
          <div style={{marginBottom: '0.5rem'}}>Точность</div>
          <div style={{background: '#2d2d3a', borderRadius: '10px', height: '30px', overflow: 'hidden'}}>
            <div style={{
              background: 'linear-gradient(90deg, #2196f3, #4caf50)',
              width: `${userData.bestAccuracy}%`,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              {userData.bestAccuracy}%
            </div>
          </div>
        </div>
      </div>
      
      <div style={styles.problemKeysSection}>
        <h3 style={styles.sectionTitle}>💡 Советы для улучшения</h3>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>• Регулярно проходите тесты для улучшения скорости</li>
          <li>• Обратите внимание на клавиши, на которых чаще всего ошибаетесь</li>
          <li>• Выполняйте уроки по темам для закрепления навыков</li>
          <li>• Чем выше точность, тем больше монет вы получаете</li>
          {problemKeysList.length > 0 && (
            <li>• Особое внимание уделите клавишам: {problemKeysList.slice(0, 3).map(([k]) => `"${k}"`).join(', ')}</li>
          )}
          {userData.bestSpeedWPM < 40 && (
            <li>• Для увеличения скорости попробуйте режим "Время"</li>
          )}
          {userData.bestAccuracy < 90 && (
            <li>• Для повышения точности проходите уроки с медленным темпом</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default StatsPage;