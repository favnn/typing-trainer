import React, { useState, useEffect } from 'react';
import HandsGuide from './HandsGuide';

const KeyboardGuide = ({ nextChar, keyboardTheme, language = 'russian' }) => {

  const [isShiftPressed, setIsShiftPressed] = useState(false);

  const [isLaptopLayout, setIsLaptopLayout] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 760 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLaptopLayout(window.innerWidth <= 760);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const referenceTheme = {
    keyBg: 'transparent',
    keyBorder: '#cbd0df',
    keyText: '#cbd0df',
    highlightBg: '#cbd0df',
    highlightText: '#22272e'
  };
  const isDefaultTheme = !keyboardTheme || keyboardTheme.highlightText === '#22272e';
  const theme = isDefaultTheme ? referenceTheme : keyboardTheme;

  const russianKeyboardRows = [
    [
      { id: 'Backquote', normal: 'ё', shift: 'Ё', hand: 'left' },
      { id: 'Digit1', normal: '1', shift: '!', hand: 'left' },
      { id: 'Digit2', normal: '2', shift: '"', hand: 'left' },
      { id: 'Digit3', normal: '3', shift: '№', hand: 'left' },
      { id: 'Digit4', normal: '4', shift: ';', hand: 'left' },
      { id: 'Digit5', normal: '5', shift: '%', hand: 'left' },
      { id: 'Digit6', normal: '6', shift: ':', hand: 'right' },
      { id: 'Digit7', normal: '7', shift: '?', hand: 'right' },
      { id: 'Digit8', normal: '8', shift: '*', hand: 'right' },
      { id: 'Digit9', normal: '9', shift: '(', hand: 'right' },
      { id: 'Digit0', normal: '0', shift: ')', hand: 'right' },
      { id: 'Minus', normal: '-', shift: '_', hand: 'right' },
      { id: 'Equal', normal: '=', shift: '+', hand: 'right' },
      { id: 'Backspace', normal: 'Backspace', special: true }
    ],
    [
      { id: 'Tab', normal: 'Tab', special: true },
      { id: 'KeyQ', normal: 'й', shift: 'Й', hand: 'left' },
      { id: 'KeyW', normal: 'ц', shift: 'Ц', hand: 'left' },
      { id: 'KeyE', normal: 'у', shift: 'У', hand: 'left' },
      { id: 'KeyR', normal: 'к', shift: 'К', hand: 'left' },
      { id: 'KeyT', normal: 'е', shift: 'Е', hand: 'left' },
      { id: 'KeyY', normal: 'н', shift: 'Н', hand: 'right' },
      { id: 'KeyU', normal: 'г', shift: 'Г', hand: 'right' },
      { id: 'KeyI', normal: 'ш', shift: 'Ш', hand: 'right' },
      { id: 'KeyO', normal: 'щ', shift: 'Щ', hand: 'right' },
      { id: 'KeyP', normal: 'з', shift: 'З', hand: 'right' },
      { id: 'BracketLeft', normal: 'х', shift: 'Х', hand: 'right' },
      { id: 'BracketRight', normal: 'ъ', shift: 'Ъ', hand: 'right' },
      { id: 'Backslash', normal: '\\', shift: '/', hand: 'right' }
    ],
    [
      { id: 'CapsLock', normal: 'CapsLock', special: true },
      { id: 'KeyA', normal: 'ф', shift: 'Ф', hand: 'left' },
      { id: 'KeyS', normal: 'ы', shift: 'Ы', hand: 'left' },
      { id: 'KeyD', normal: 'в', shift: 'В', hand: 'left' },
      { id: 'KeyF', normal: 'а', shift: 'А', hand: 'left' },
      { id: 'KeyG', normal: 'п', shift: 'П', hand: 'left' },
      { id: 'KeyH', normal: 'р', shift: 'Р', hand: 'right' },
      { id: 'KeyJ', normal: 'о', shift: 'О', hand: 'right' },
      { id: 'KeyK', normal: 'л', shift: 'Л', hand: 'right' },
      { id: 'KeyL', normal: 'д', shift: 'Д', hand: 'right' },
      { id: 'Semicolon', normal: 'ж', shift: 'Ж', hand: 'right' },
      { id: 'Quote', normal: 'э', shift: 'Э', hand: 'right' },
      { id: 'Enter', normal: 'Enter', special: true }
    ],
    [
      { id: 'ShiftLeft', normal: 'Shift', special: true },
      { id: 'KeyZ', normal: 'я', shift: 'Я', hand: 'left' },
      { id: 'KeyX', normal: 'ч', shift: 'Ч', hand: 'left' },
      { id: 'KeyC', normal: 'с', shift: 'С', hand: 'left' },
      { id: 'KeyV', normal: 'м', shift: 'М', hand: 'left' },
      { id: 'KeyB', normal: 'и', shift: 'И', hand: 'left' },
      { id: 'KeyN', normal: 'т', shift: 'Т', hand: 'right' },
      { id: 'KeyM', normal: 'ь', shift: 'Ь', hand: 'right' },
      { id: 'Comma', normal: 'б', shift: 'Б', hand: 'right' },
      { id: 'PeriodRuLetter', normal: 'ю', shift: 'Ю', hand: 'right' },
      { id: 'SlashRu', normal: '.', shift: ',', hand: 'right' },
      { id: 'ShiftRight', normal: 'Shift', special: true }
    ],
    [
      { id: 'ControlLeft', normal: 'Ctrl', special: true },
      { id: 'MetaLeft', normal: 'Win', special: true },
      { id: 'AltLeft', normal: 'Alt', special: true },
      { id: 'Space', normal: 'Space', special: true, hand: 'thumb' },
      { id: 'AltRight', normal: 'Alt', special: true },
      { id: 'MetaRight', normal: 'Win', special: true },
      { id: 'ControlRight', normal: 'Ctrl', special: true }
    ]
  ];

  const englishKeyboardRows = [
    [
      { id: 'Backquote', normal: '`', shift: '~', hand: 'left' },
      { id: 'Digit1', normal: '1', shift: '!', hand: 'left' },
      { id: 'Digit2', normal: '2', shift: '@', hand: 'left' },
      { id: 'Digit3', normal: '3', shift: '#', hand: 'left' },
      { id: 'Digit4', normal: '4', shift: '$', hand: 'left' },
      { id: 'Digit5', normal: '5', shift: '%', hand: 'left' },
      { id: 'Digit6', normal: '6', shift: '^', hand: 'right' },
      { id: 'Digit7', normal: '7', shift: '&', hand: 'right' },
      { id: 'Digit8', normal: '8', shift: '*', hand: 'right' },
      { id: 'Digit9', normal: '9', shift: '(', hand: 'right' },
      { id: 'Digit0', normal: '0', shift: ')', hand: 'right' },
      { id: 'Minus', normal: '-', shift: '_', hand: 'right' },
      { id: 'Equal', normal: '=', shift: '+', hand: 'right' },
      { id: 'Backspace', normal: 'Backspace', special: true }
    ],
    [
      { id: 'Tab', normal: 'Tab', special: true },
      { id: 'KeyQ', normal: 'q', shift: 'Q', hand: 'left' },
      { id: 'KeyW', normal: 'w', shift: 'W', hand: 'left' },
      { id: 'KeyE', normal: 'e', shift: 'E', hand: 'left' },
      { id: 'KeyR', normal: 'r', shift: 'R', hand: 'left' },
      { id: 'KeyT', normal: 't', shift: 'T', hand: 'left' },
      { id: 'KeyY', normal: 'y', shift: 'Y', hand: 'right' },
      { id: 'KeyU', normal: 'u', shift: 'U', hand: 'right' },
      { id: 'KeyI', normal: 'i', shift: 'I', hand: 'right' },
      { id: 'KeyO', normal: 'o', shift: 'O', hand: 'right' },
      { id: 'KeyP', normal: 'p', shift: 'P', hand: 'right' },
      { id: 'BracketLeft', normal: '[', shift: '{', hand: 'right' },
      { id: 'BracketRight', normal: ']', shift: '}', hand: 'right' },
      { id: 'Backslash', normal: '\\', shift: '|', hand: 'right' }
    ],
    [
      { id: 'CapsLock', normal: 'CapsLock', special: true },
      { id: 'KeyA', normal: 'a', shift: 'A', hand: 'left' },
      { id: 'KeyS', normal: 's', shift: 'S', hand: 'left' },
      { id: 'KeyD', normal: 'd', shift: 'D', hand: 'left' },
      { id: 'KeyF', normal: 'f', shift: 'F', hand: 'left' },
      { id: 'KeyG', normal: 'g', shift: 'G', hand: 'left' },
      { id: 'KeyH', normal: 'h', shift: 'H', hand: 'right' },
      { id: 'KeyJ', normal: 'j', shift: 'J', hand: 'right' },
      { id: 'KeyK', normal: 'k', shift: 'K', hand: 'right' },
      { id: 'KeyL', normal: 'l', shift: 'L', hand: 'right' },
      { id: 'Semicolon', normal: ';', shift: ':', hand: 'right' },
      { id: 'Quote', normal: "'", shift: '"', hand: 'right' },
      { id: 'Enter', normal: 'Enter', special: true }
    ],
    [
      { id: 'ShiftLeft', normal: 'Shift', special: true },
      { id: 'KeyZ', normal: 'z', shift: 'Z', hand: 'left' },
      { id: 'KeyX', normal: 'x', shift: 'X', hand: 'left' },
      { id: 'KeyC', normal: 'c', shift: 'C', hand: 'left' },
      { id: 'KeyV', normal: 'v', shift: 'V', hand: 'left' },
      { id: 'KeyB', normal: 'b', shift: 'B', hand: 'left' },
      { id: 'KeyN', normal: 'n', shift: 'N', hand: 'right' },
      { id: 'KeyM', normal: 'm', shift: 'M', hand: 'right' },
      { id: 'Comma', normal: ',', shift: '<', hand: 'right' },
      { id: 'Period', normal: '.', shift: '>', hand: 'right' },
      { id: 'Slash', normal: '/', shift: '?', hand: 'right' },
      { id: 'ShiftRight', normal: 'Shift', special: true }
    ],
    [
      { id: 'ControlLeft', normal: 'Ctrl', special: true },
      { id: 'MetaLeft', normal: 'Win', special: true },
      { id: 'AltLeft', normal: 'Alt', special: true },
      { id: 'Space', normal: 'Space', special: true, hand: 'thumb' },
      { id: 'AltRight', normal: 'Alt', special: true },
      { id: 'MetaRight', normal: 'Win', special: true },
      { id: 'ControlRight', normal: 'Ctrl', special: true }
    ]
  ];

  const keyboardRows = language === 'english' ? englishKeyboardRows : russianKeyboardRows;

    useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Shift') setIsShiftPressed(true);
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Shift') setIsShiftPressed(false);
    };

    const handleBlur = () => setIsShiftPressed(false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  const findKeyInfoByChar = (char) => {
    if (!char) return null;

    if (char === ' ') {
      return {
        keyId: 'Space',
        requiresShift: false,
        shiftKeyId: null,
        display: 'ПРОБЕЛ',
        hand: 'thumb'
      };
    }

    const targetChar = String(char);

    for (const row of keyboardRows) {
      for (const key of row) {
        if (key.normal === targetChar) {
          return {
            keyId: key.id,
            requiresShift: false,
            shiftKeyId: null,
            display: key.normal,
            hand: key.hand
          };
        }

        if (key.shift === targetChar) {
          const shiftKeyId = key.hand === 'left' ? 'ShiftRight' : 'ShiftLeft';

          return {
            keyId: key.id,
            requiresShift: true,
            shiftKeyId,
            display: key.shift,
            hand: key.hand
          };
        }
      }
    }

    const lowerChar = targetChar.toLowerCase();

    if (targetChar !== lowerChar) {
      for (const row of keyboardRows) {
        for (const key of row) {
          if (key.normal === lowerChar) {
            const shiftKeyId = key.hand === 'left' ? 'ShiftRight' : 'ShiftLeft';

            return {
              keyId: key.id,
              requiresShift: true,
              shiftKeyId,
              display: targetChar,
              hand: key.hand
            };
          }
        }
      }
    }

    return null;
  };

  const nextKeyInfo = findKeyInfoByChar(nextChar);
  const isShiftMode = isShiftPressed || nextKeyInfo?.requiresShift;

  const isNextKey = (key) => {
    if (!nextKeyInfo) return false;
    return key.id === nextKeyInfo.keyId || key.id === nextKeyInfo.shiftKeyId;
  };

  const getDisplayText = (key) => {
    if (key.normal === 'Space') return 'ПРОБЕЛ';
    if (key.normal === 'Backspace') return '⌫';
    if (key.normal === 'Enter') return '↵';
    if (key.normal === 'Tab') return '⇆';
    if (key.normal === 'CapsLock') return '⇪';
    if (key.normal === 'Shift') return '⇧';
    if (key.normal === 'Ctrl') return 'Ctrl';
    if (key.normal === 'Win') return '⊞';
    if (key.normal === 'Alt') return 'Alt';

    if (isShiftMode && key.shift) {
      return key.shift;
    }

    return key.normal;
  };

  const styles = {
    container: {
      background: 'transparent',
      padding: 0,
      borderRadius: 0,
      marginTop: '48px',
      overflowX: 'auto'
    },
    title: {
      textAlign: 'center',
      marginBottom: '15px',
      fontSize: '14px',
      opacity: 0.9,
      color: '#4895ef'
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
      gap: '5px',
      minWidth: '720px',
      transform: isLaptopLayout ? 'scale(0.76)' : 'scale(1)',
      transformOrigin: 'top center',
    },
    row: {
      display: 'flex',
      justifyContent: 'center',
      gap: '5px',
      marginBottom: '0'
    },
    key: {
      minWidth: '42px',
      height: '42px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid',
      borderRadius: '7px',
      fontSize: '12px',
      fontWeight: 400,
      transition: 'all 0.1s',
      position: 'relative',
      boxShadow: 'none'
    },
    keyWide: {
      minWidth: '68px'
    },
    keySpace: {
      minWidth: '296px'
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
    },
    trainingArea: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      gap: 0,
      width: '100%',
    },
    keyboardColumn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexShrink: 0,
    },
    keyboardViewport: {
      width: isLaptopLayout ? '560px' : '760px',
      display: 'flex',
      justifyContent: 'center',
      overflow: 'visible',
    },
    sideHand: {
      width: '170px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingTop: '120px',
      flexShrink: 0,
      transform: 'scale(0.72)',
      transformOrigin: 'top center',
      opacity: 0.56,
      filter: 'grayscale(1)',
    },
    bottomHands: {
      width: '100%',
      marginTop: '-118px',
      opacity: 0.56,
      filter: 'grayscale(1)',
      pointerEvents: 'none'
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.trainingArea}>
        {isLaptopLayout && (
          <div style={styles.sideHand}>
            <HandsGuide
              side="left"
              nextChar={nextChar}
              language={language}
              highlightColor={theme.highlightBg}
              shiftKeyId={nextKeyInfo?.shiftKeyId}
            />
          </div>
        )}

        <div style={styles.keyboardColumn}>
          <div style={styles.keyboardViewport}>
            <div style={styles.keyboard}>
              {keyboardRows.map((row, rowIndex) => (
                <div key={rowIndex} style={styles.row}>
                  {row.map((key, keyIndex) => {
                    const isNext = isNextKey(key);
                    let keyStyle = { ...styles.key };

                    if (key.normal === 'Space') {
                      keyStyle = { ...keyStyle, ...styles.keySpace };
                    } else if (['Backspace', 'Enter', 'Shift', 'CapsLock', 'Tab'].includes(key.normal)) {
                      keyStyle = { ...keyStyle, ...styles.keyWide };
                    }

                    keyStyle.backgroundColor = theme.keyBg;
                    keyStyle.borderColor = theme.keyBorder;
                    keyStyle.color = theme.keyText;

                    if (isNext) {
                      keyStyle.backgroundColor = theme.highlightBg;
                      keyStyle.borderColor = theme.highlightBg;
                      keyStyle.color = theme.highlightText;
                      keyStyle.transform = 'none';
                      keyStyle.boxShadow = 'none';
                    }

                    return (
                      <div key={key.id || keyIndex} style={keyStyle}>
                        {getDisplayText(key)}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {!isLaptopLayout && (
            <div style={styles.bottomHands}>
              <HandsGuide
                side="both"
                nextChar={nextChar}
                language={language}
                highlightColor={theme.highlightBg}
                shiftKeyId={nextKeyInfo?.shiftKeyId}
              />
            </div>
          )}
        </div>

        {isLaptopLayout && (
          <div style={styles.sideHand}>
            <HandsGuide
              side="right"
              nextChar={nextChar}
              language={language}
              highlightColor={theme.highlightBg}
              shiftKeyId={nextKeyInfo?.shiftKeyId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default KeyboardGuide;
