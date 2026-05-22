import React from 'react';

const KeyboardGuide = ({ nextChar, keyboardTheme }) => {
  // Значения по умолчанию (если тема не передана)
  const theme = keyboardTheme || {
    keyBg: '#2d2d3a',
    keyBorder: '#4a4a5a',
    keyText: '#e0e0e0',
    highlightBg: '#ffd700',
    highlightText: '#1e1e2f'
  };

  const keyboardRows = [
    ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\'],
    ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
    ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Shift'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Win', 'Ctrl']
  ];

  const isNextKey = (key) => {
    if (!nextChar) return false;
    if (key === 'Space' && nextChar === ' ') return true;
    return key.toLowerCase() === nextChar.toLowerCase();
  };

  const getDisplayText = (key) => {
    if (key === 'Space') return 'ПРОБЕЛ';
    if (key === 'Backspace') return '⌫';
    if (key === 'Enter') return '↵';
    if (key === 'Tab') return '⇆';
    if (key === 'CapsLock') return '⇪';
    if (key === 'Shift') return '⇧';
    if (key === 'Ctrl') return 'Ctrl';
    if (key === 'Win') return '⊞';
    if (key === 'Alt') return 'Alt';
    return key;
  };

  const styles = {
    container: {
      background: 'rgba(0, 0, 0, 0.4)',
      padding: '20px',
      borderRadius: '20px',
      marginTop: '20px',
      overflowX: 'auto'
    },
    title: {
      textAlign: 'center',
      marginBottom: '15px',
      fontSize: '14px',
      opacity: 0.9,
      color: '#ffd700'
    },
    nextCharHint: {
      textAlign: 'center',
      marginBottom: '15px',
      padding: '8px',
      background: 'rgba(255, 215, 0, 0.2)',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    keyboard: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      minWidth: '950px'
    },
    row: {
      display: 'flex',
      justifyContent: 'center',
      gap: '6px',
      marginBottom: '4px'
    },
    key: {
      minWidth: '55px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: 'bold',
      transition: 'all 0.1s',
      position: 'relative',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      // тема задаётся динамически ниже
    },
    keyWide: {
      minWidth: '85px'
    },
    keySpace: {
      minWidth: '380px'
    },
    legend: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '20px',
      paddingTop: '15px',
      borderTop: '1px solid rgba(255,255,255,0.1)'
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '12px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        ⌨️ Клавиатурный тренажер | Золотая клавиша = следующая
      </div>
      
      {nextChar && (
        <div style={styles.nextCharHint}>
          ⭐ Следующая клавиша: <strong style={{ fontSize: '24px', color: '#ffd700' }}>
            {nextChar === ' ' ? 'ПРОБЕЛ' : `"${nextChar}"`}
          </strong>
        </div>
      )}
      
      <div style={styles.keyboard}>
        {keyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} style={styles.row}>
            {row.map((key, keyIndex) => {
              const isNext = isNextKey(key);
              let keyStyle = { ...styles.key };

              // Размеры специальных клавиш
              if (key === 'Space') keyStyle = { ...keyStyle, ...styles.keySpace };
              else if (['Backspace', 'Enter', 'Shift', 'CapsLock', 'Tab'].includes(key)) {
                keyStyle = { ...keyStyle, ...styles.keyWide };
              }

              // Базовые цвета из темы
              keyStyle.backgroundColor = theme.keyBg;
              keyStyle.borderColor = theme.keyBorder;
              keyStyle.color = theme.keyText;

              // Подсветка следующей клавиши
              if (isNext) {
                keyStyle.backgroundColor = theme.highlightBg;
                keyStyle.borderColor = '#fff';
                keyStyle.color = theme.highlightText;
                keyStyle.transform = 'scale(1.02)';
                keyStyle.boxShadow = `0 0 20px ${theme.highlightBg}`;
              }

              return (
                <div key={keyIndex} style={keyStyle}>
                  {getDisplayText(key)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <div style={{width: '20px', height: '20px', backgroundColor: theme.highlightBg, borderRadius: '4px'}}></div>
          <span>Следующая клавиша</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{width: '20px', height: '20px', backgroundColor: theme.keyBg, border: `1px solid ${theme.keyBorder}`, borderRadius: '4px'}}></div>
          <span>Обычная клавиша</span>
        </div>
      </div>
    </div>
  );
};

export default KeyboardGuide;