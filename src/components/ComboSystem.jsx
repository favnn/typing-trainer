import React, { useEffect, useState } from 'react';

const ComboSystem = ({ combo, lastAccuracy, isActive, onComboChange }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const [notificationColor, setNotificationColor] = useState('#ffd700');

  // Мотивационные фразы для юных программистов
  const comboMessages = React.useMemo(() => ({
    5: { text: "🔥 Код ускоряется!", color: "#ff9800" },
    10: { text: "💻 Ты печатаешь как джуниор!", color: "#ff5722" },
    15: { text: "⚡ Мидл-разработчик в деле!", color: "#4caf50" },
    20: { text: "🚀 Сеньор, ты гений!", color: "#2196f3" },
    30: { text: "👑 Легенда клавиатуры!", color: "#ffd700" },
    50: { text: "🏆 Твой код ждет весь мир!", color: "#e91e63" }
  }), []);

  // Фразы за идеальное попадание
  const perfectMessages = React.useMemo(() => [
    "✨ Безупречно!",
    "🎯 Точное попадание!",
    "💪 Так держать!",
    "⭐ Звездный час!",
    "🔥 Горячая клавиша!"
  ], []);

  useEffect(() => {
    // Показываем уведомление при достижении нового уровня комбо
    if (combo in comboMessages && combo > 0) {
      setNotificationText(comboMessages[combo].text);
      setNotificationColor(comboMessages[combo].color);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1500);
    }
    
    // Сообщаем родителю об изменении комбо
    if (onComboChange) {
      onComboChange(combo);
    }
  }, [combo, comboMessages, onComboChange]);

  // Показываем уведомление при идеальном вводе
  useEffect(() => {
    if (lastAccuracy === 100 && isActive && combo > 0) {
      const randomMessage = perfectMessages[Math.floor(Math.random() * perfectMessages.length)];
      setNotificationText(randomMessage);
      setNotificationColor('#4caf50');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 800);
    }
  }, [lastAccuracy, isActive, combo, perfectMessages]);

  // Расчет множителя монет
  const getMultiplier = () => {
    if (combo >= 50) return 3.0;
    if (combo >= 30) return 2.5;
    if (combo >= 20) return 2.0;
    if (combo >= 10) return 1.5;
    if (combo >= 5) return 1.2;
    return 1.0;
  };

  const styles = {
    container: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px'
    },
    comboDisplay: {
      background: 'linear-gradient(135deg, #2d2d3a, #1e1e2f)',
      borderRadius: '20px',
      padding: '10px 20px',
      textAlign: 'center',
      border: `2px solid ${combo >= 10 ? '#ffd700' : '#4a4a5a'}`,
      boxShadow: combo >= 10 ? '0 0 20px rgba(255, 215, 0, 0.3)' : 'none',
      transition: 'all 0.3s ease',
      animation: combo >= 10 ? 'pulse 0.5s ease' : 'none'
    },
    comboValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#ffd700',
      textShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
    },
    comboLabel: {
      fontSize: '0.8rem',
      color: '#e0e0e0',
      marginTop: '5px'
    },
    multiplier: {
      fontSize: '1rem',
      color: '#4caf50',
      marginTop: '5px'
    },
    notification: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: `linear-gradient(135deg, ${notificationColor}, ${notificationColor}cc)`,
      padding: '15px 30px',
      borderRadius: '50px',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'white',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
      whiteSpace: 'nowrap',
      zIndex: 2000,
      animation: 'flyInOut 1.5s ease forwards',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
    }
  };

  const multiplier = getMultiplier();

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes flyInOut {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.5);
            }
            20% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1.2);
            }
            80% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -100%) scale(0.5);
            }
          }
        `}
      </style>
      
      <div style={styles.container}>
        <div style={styles.comboDisplay}>
          <div style={styles.comboValue}>x{combo}</div>
          <div style={styles.comboLabel}>КОМБО</div>
          {multiplier > 1 && (
            <div style={styles.multiplier}>x{multiplier} монет</div>
          )}
        </div>
      </div>
      
      {showNotification && (
        <div style={styles.notification}>
          {notificationText}
        </div>
      )}
    </>
  );
};

export default ComboSystem;