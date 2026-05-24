import React from 'react';
import Character from '../components/Character';

const Home = ({ userData }) => {
  const activeWardrobe = userData?.activeWardrobe || {};

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    hero: {
      textAlign: 'center',
      marginBottom: '3rem'
    },
    characterWrapper: {
      marginBottom: '1rem',
      display: 'flex',
      justifyContent: 'center'
    },
    rules: {
      background: 'rgba(255,255,255,0.05)',
      padding: '1.5rem',
      borderRadius: '16px',
      marginBottom: '2rem'
    },
    progress: {
      background: 'rgba(255,255,255,0.05)',
      padding: '1.5rem',
      borderRadius: '16px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1rem',
      marginTop: '1rem'
    },
    statCard: {
      textAlign: 'center'
    },
    statValue: {
      fontSize: '1.5rem',
      color: '#ffd700'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.characterWrapper}>
          <Character activeWardrobe={activeWardrobe} />
        </div>

        <h2>Тип-Мастер Клавиша</h2>
        <h3>Печатай быстрее, зарабатывай монеты!</h3>
        <p>Тренируй слепую печать, проходи уроки и соревнуйся сам с собой</p>
      </div>

      <div style={styles.rules}>
        <h3>📜 Как заработать монеты</h3>
        <ul style={{ marginTop: '1rem', marginLeft: '1.5rem' }}>
          <li>✅ Пройди урок без ошибок — получи бонус</li>
          <li>⚡ Улучши свою скорость (WPM) — заработай монеты</li>
          <li>🏆 Установи рекорд точности — двойная награда</li>
          <li>📈 Чем сложнее урок, тем больше монет</li>
        </ul>
      </div>

      <div style={styles.progress}>
        <h3>👤 Ваш прогресс</h3>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{userData.coins}</div>
            <div>🪙 Монет</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{userData.bestSpeedWPM}</div>
            <div>⚡ Рекорд WPM</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{userData.bestAccuracy}%</div>
            <div>🎯 Лучшая точность</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;