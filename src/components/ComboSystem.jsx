import React, { useEffect, useState } from 'react';

const ComboSystem = ({ combo, lastAccuracy, isActive, onComboChange }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const [notificationColor, setNotificationColor] = useState('#4895ef');

  // Мотивационные фразы для юных программистов
  const comboMessages = React.useMemo(() => ({
    5: { text: "Код ускоряется", color: "#4895ef" },
    10: { text: "Ровный темп", color: "#4895ef" },
    15: { text: "Серия растет", color: "#4895ef" },
    20: { text: "Отличный ритм", color: "#4895ef" },
    30: { text: "Сильная серия", color: "#4895ef" },
    50: { text: "Максимальная серия", color: "#4895ef" }
  }), []);

  // Фразы за идеальное попадание
  const perfectMessages = React.useMemo(() => [
    "Безупречно",
    "Точное попадание",
    "Хороший темп",
    "Ровно",
    "Чистый ввод"
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
      setNotificationColor('#4895ef');
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
      background: '#272e35',
      borderRadius: '8px',
      padding: '10px 20px',
      textAlign: 'center',
      border: `1px solid ${combo >= 10 ? 'rgba(72, 149, 239, 0.45)' : 'rgba(203, 208, 223, 0.08)'}`,
      boxShadow: 'none',
      transition: 'all 0.3s ease',
      animation: combo >= 10 ? 'pulse 0.5s ease' : 'none'
    },
    comboValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#cbd0df'
    },
    comboLabel: {
      fontSize: '0.8rem',
      color: '#6d7887',
      marginTop: '5px'
    },
    multiplier: {
      fontSize: '1rem',
      color: '#4895ef',
      marginTop: '5px'
    },
    notification: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: notificationColor,
      padding: '15px 30px',
      borderRadius: '8px',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#22272e',
      whiteSpace: 'nowrap',
      zIndex: 2000,
      animation: 'flyInOut 1.5s ease forwards',
      boxShadow: 'none'
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
