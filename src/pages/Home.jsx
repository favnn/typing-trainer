import React from 'react';
import Character from '../components/Character';

const Home = ({ userData }) => {
  const activeWardrobe = userData?.activeWardrobe || {};

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
    summary: {
      display: 'flex',
      gap: '8px',
      color: '#6d7887',
      fontSize: '13px'
    },
    pill: {
      minHeight: '35px',
      padding: '0 12px',
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: '8px',
      background: '#272e35'
    },
    hero: {
      display: 'grid',
      gridTemplateColumns: 'minmax(220px, 340px) 1fr',
      gap: '32px',
      alignItems: 'center',
      marginBottom: '32px'
    },
    characterWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '300px',
      overflow: 'hidden',
      borderRadius: '8px',
      background: '#272e35',
      border: '1px solid rgba(203, 208, 223, 0.08)'
    },
    intro: {
      color: '#cbd0df'
    },
    introTitle: {
      marginBottom: '12px',
      color: '#cbd0df',
      fontSize: '28px',
      fontWeight: 600
    },
    introText: {
      maxWidth: '560px',
      color: '#6d7887',
      lineHeight: 1.7
    },
    rules: {
      background: '#272e35',
      padding: '1.5rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      border: '1px solid rgba(203, 208, 223, 0.08)'
    },
    progress: {
      background: '#272e35',
      padding: '1.5rem',
      borderRadius: '8px',
      border: '1px solid rgba(203, 208, 223, 0.08)'
    },
    sectionTitle: {
      color: '#6d7887',
      fontSize: '16px',
      marginBottom: '1rem'
    },
    list: {
      marginLeft: '1.2rem',
      color: '#cbd0df',
      lineHeight: 1.8
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      gap: '1rem',
      marginTop: '1rem'
    },
    statCard: {
      padding: '1rem',
      textAlign: 'center',
      borderRadius: '8px',
      background: '#22272e'
    },
    statValue: {
      fontSize: '1.8rem',
      color: '#cbd0df',
      fontWeight: 600
    },
    statLabel: {
      marginTop: '6px',
      color: '#6d7887',
      fontSize: '12px'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Главная</h1>
        <div style={styles.summary}>
          <span style={styles.pill}>{userData.bestSpeedWPM} wpm</span>
          <span style={styles.pill}>{userData.coins} coins</span>
        </div>
      </header>

      <section style={styles.hero}>
        <div style={styles.characterWrapper}>
          <Character activeWardrobe={activeWardrobe} />
        </div>

        <div style={styles.intro}>
          <h2 style={styles.introTitle}>Тип-Мастер Клавиша</h2>
          <p style={styles.introText}>
            Тренируй слепую печать, проходи уроки, отслеживай скорость и точность.
          </p>
        </div>
      </section>

      <div style={styles.rules}>
        <h3 style={styles.sectionTitle}>Как заработать монеты</h3>
        <ul style={styles.list}>
          <li>Пройти урок без ошибок.</li>
          <li>Улучшить скорость WPM.</li>
          <li>Поставить рекорд точности.</li>
          <li>Проходить более сложные уроки.</li>
        </ul>
      </div>

      <div style={styles.progress}>
        <h3 style={styles.sectionTitle}>Ваш прогресс</h3>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{userData.coins}</div>
            <div style={styles.statLabel}>монет</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{userData.bestSpeedWPM}</div>
            <div style={styles.statLabel}>рекорд wpm</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{userData.bestAccuracy}%</div>
            <div style={styles.statLabel}>лучшая точность</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
