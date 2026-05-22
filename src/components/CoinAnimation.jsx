import React, { useEffect, useState } from 'react';

const CoinAnimation = ({ coins, onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Получаем позицию кнопки "Получить монеты" и счетчика монет
    const coinButton = document.querySelector('.claim-coins-btn');
    const coinDisplay = document.querySelector('.coin-display');
    
    if (coinButton && coinDisplay) {
      const buttonRect = coinButton.getBoundingClientRect();
      const displayRect = coinDisplay.getBoundingClientRect();
      
      setPosition({
        startX: buttonRect.left + buttonRect.width / 2,
        startY: buttonRect.top,
        endX: displayRect.left + displayRect.width / 2,
        endY: displayRect.top
      });
    }
    
    // Анимация длится 1 секунду
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  if (!visible) return null;
  
  const styles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 9999
    },
    coin: {
      position: 'absolute',
      fontSize: '24px',
      animation: 'flyToCoin 1s ease-in-out forwards',
      left: position.startX,
      top: position.startY,
      '--end-x': `${position.endX - position.startX}px`,
      '--end-y': `${position.endY - position.startY}px`
    },
    coinCount: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '48px',
      fontWeight: 'bold',
      color: '#ffd700',
      textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
      animation: 'popAndFade 1s ease-out forwards',
      zIndex: 10000,
      whiteSpace: 'nowrap'
    }
  };
  
  // Добавляем CSS анимации
  const animationStyles = `
    @keyframes flyToCoin {
      0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translate(var(--end-x), var(--end-y)) rotate(720deg);
        opacity: 0;
      }
    }
    
    @keyframes popAndFade {
      0% {
        transform: translate(-50%, -50%) scale(0.5);
        opacity: 0;
      }
      20% {
        transform: translate(-50%, -50%) scale(1.2);
        opacity: 1;
      }
      80% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(-50%, -100%) scale(0.8);
        opacity: 0;
      }
    }
  `;
  
  return (
    <>
      <style>{animationStyles}</style>
      <div style={styles.container}>
        <div style={styles.coin}>
          🪙
        </div>
        <div style={styles.coinCount}>
          +{coins} 🪙
        </div>
      </div>
    </>
  );
};

export default CoinAnimation;