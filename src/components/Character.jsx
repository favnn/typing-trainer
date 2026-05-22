import React from 'react';
import characterBase from '../data/characterBase';
import wardrobeItems from '../data/wardrobeItems';

const Character = ({ activeWardrobe }) => {
  const getActive = (slot) => {
    const itemId = activeWardrobe?.[slot];
    if (itemId && wardrobeItems[itemId]) return wardrobeItems[itemId];
    const defaultItem = Object.values(wardrobeItems).find(
      item => item.slot === slot && item.default
    );
    return defaultItem || wardrobeItems[`${slot}_default`];
  };

  const headItem = getActive('head');
  const bodyItem = getActive('body');
  const armsItem = getActive('arms');
  const legsItem = getActive('legs');
  const shoesItem = getActive('shoes');
  const hatItem = getActive('hat');

  const skinColor = characterBase.skinColor;

  const containerWidth = 120;
  const containerHeight = 250;

  const cx = containerWidth / 2; // 60

  // Позиции (выверены)
  const headTop = 0;
  const headSize = 50;
  const neckTop = headTop + headSize - 6;
  const neckWidth = 14;
  const neckHeight = 12;
  const bodyTop = neckTop + neckHeight;
  const bodyWidth = 70;
  const bodyHeight = 75;
  const armTop = bodyTop + 8;
  const armWidth = 18;
  const armHeight = 65;
  const handTop = armTop + armHeight - 2;
  const handSize = 15;
  const leftArmX = cx - bodyWidth/2 - armWidth + 2;
  const rightArmX = cx + bodyWidth/2 - 2;
  const legTop = bodyTop + bodyHeight;
  const legWidth = 22;
  const legHeight = 60;
  const leftLegX = cx - 22;
  const rightLegX = cx + 2;
  const shoeTop = legTop + legHeight - 8;
  const shoeWidth = 24;
  const shoeHeight = 14;

  // Функция затемнения цвета
  const adjustColor = (hex, amount) => {
    if (!hex || !hex.startsWith('#')) return hex;
    let r, g, b;
    if (hex.length === 7) {
      r = parseInt(hex.slice(1,3), 16);
      g = parseInt(hex.slice(3,5), 16);
      b = parseInt(hex.slice(5,7), 16);
    } else if (hex.length === 4) {
      r = parseInt(hex[1]+hex[1], 16);
      g = parseInt(hex[2]+hex[2], 16);
      b = parseInt(hex[3]+hex[3], 16);
    } else return hex;
    const clamp = (v) => Math.max(0, Math.min(255, v));
    return `rgb(${clamp(r+amount)},${clamp(g+amount)},${clamp(b+amount)})`;
  };

  // Градиенты
  const bodyGradient = `linear-gradient(180deg, ${bodyItem.color} 0%, ${adjustColor(bodyItem.color, -20)} 100%)`;
  const legGradient = `linear-gradient(180deg, ${legsItem.color} 0%, ${adjustColor(legsItem.color, -15)} 100%)`;
  const armGradient = armsItem.render === 'skin'
    ? `linear-gradient(90deg, ${adjustColor(skinColor, -10)} 0%, ${skinColor} 50%, ${adjustColor(skinColor, -10)} 100%)`
    : `linear-gradient(180deg, ${armsItem.color} 0%, ${adjustColor(armsItem.color, -15)} 100%)`;

  const styles = {
    container: {
      position: 'relative',
      width: `${containerWidth}px`,
      height: `${containerHeight}px`,
      margin: '0 auto',
    },
    // Голова
    head: {
      position: 'absolute',
      top: `${headTop}px`,
      left: `${cx - headSize/2}px`,
      width: `${headSize}px`,
      height: `${headSize}px`,
      borderRadius: '50%',
      backgroundColor: skinColor,
      boxShadow: `inset 0 -2px 3px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.15)`,
      zIndex: 3,
    },
    ear: {
      position: 'absolute',
      width: '10px',
      height: '12px',
      borderRadius: '40%',
      backgroundColor: skinColor,
      top: '18px',
      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
    },
    leftEar: { left: '-8px' },
    rightEar: { right: '-8px' },
    eye: {
      width: '7px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#2c3e50',
      position: 'absolute',
      top: '17px',
      boxShadow: '0 0 2px rgba(0,0,0,0.3)',
    },
    leftEye: { left: '12px' },
    rightEye: { right: '12px' },
    eyeHighlight: {
      width: '3px',
      height: '3px',
      borderRadius: '50%',
      backgroundColor: '#fff',
      position: 'absolute',
      top: '1px',
      left: '1px',
    },
    mouth: {
      width: '12px',
      height: '5px',
      borderRadius: '0 0 8px 8px',
      backgroundColor: '#e74c3c',
      position: 'absolute',
      bottom: '12px',
      left: '50%',
      transform: 'translateX(-50%)',
      boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.2)',
    },
    // Шея
    neck: {
      position: 'absolute',
      top: `${neckTop}px`,
      left: `${cx - neckWidth/2}px`,
      width: `${neckWidth}px`,
      height: `${neckHeight}px`,
      backgroundColor: skinColor,
      borderRadius: '4px',
      zIndex: 2,
    },
    // Тело
    body: {
      position: 'absolute',
      top: `${bodyTop}px`,
      left: `${cx - bodyWidth/2}px`,
      width: `${bodyWidth}px`,
      height: `${bodyHeight}px`,
      background: bodyGradient,
      borderRadius: '12px 12px 6px 6px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      zIndex: 2,
      overflow: 'hidden',
    },
    collar: {
      position: 'absolute',
      top: '-2px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '24px',
      height: '16px',
      borderRadius: '0 0 12px 12px',
      backgroundColor: '#ecf0f1',
      boxShadow: 'inset 0 -2px 3px rgba(0,0,0,0.1)',
      zIndex: 4,
    },
    // Капюшон худи (за головой)
    hoodieHoodBack: {
      position: 'absolute',
      top: '-8px',
      left: `${cx - 28}px`,
      width: '56px',
      height: '36px',
      borderRadius: '30px 30px 10px 10px',
      backgroundColor: bodyItem.color,
      boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
      zIndex: 1, // за головой
    },
    // Рука
    arm: {
      position: 'absolute',
      width: `${armWidth}px`,
      height: `${armHeight}px`,
      background: armGradient,
      borderRadius: '9px',
      zIndex: 1,
      boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
    },
    leftArmPos: { top: `${armTop}px`, left: `${leftArmX}px` },
    rightArmPos: { top: `${armTop}px`, left: `${rightArmX}px` },
    // Ладонь
    palm: {
      position: 'absolute',
      width: `${handSize}px`,
      height: `${handSize}px`,
      backgroundColor: skinColor,
      borderRadius: '50%',
      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.2)',
      zIndex: 2,
    },
    leftPalm: {
      top: `${handTop}px`,
      left: `${leftArmX + (armWidth - handSize)/2}px`,
    },
    rightPalm: {
      top: `${handTop}px`,
      left: `${rightArmX + (armWidth - handSize)/2}px`,
    },
    // Нога
    leg: {
      position: 'absolute',
      width: `${legWidth}px`,
      height: `${legHeight}px`,
      background: legGradient,
      borderRadius: '0 0 6px 6px',
      boxShadow: '0 3px 5px rgba(0,0,0,0.15)',
      zIndex: 1,
    },
    leftLegPos: { top: `${legTop}px`, left: `${leftLegX}px` },
    rightLegPos: { top: `${legTop}px`, left: `${rightLegX}px` },
    knee: {
      position: 'absolute',
      bottom: '15px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '14px',
      height: '8px',
      borderRadius: '10px',
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
    // Обувь
    shoe: {
      position: 'absolute',
      width: `${shoeWidth}px`,
      height: `${shoeHeight}px`,
      background: `linear-gradient(180deg, ${shoesItem.color} 0%, ${adjustColor(shoesItem.color, -25)} 100%)`,
      borderRadius: '4px 4px 12px 12px',
      boxShadow: '0 2px 3px rgba(0,0,0,0.2)',
      zIndex: 0,
    },
    leftShoePos: { top: `${shoeTop}px`, left: `${leftLegX - 1}px` },
    rightShoePos: { top: `${shoeTop}px`, left: `${rightLegX - 1}px` },
    shoelace: {
      position: 'absolute',
      top: '2px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '6px',
      height: '8px',
      borderRadius: '2px',
      backgroundColor: '#ecf0f1',
      boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
    },
    // Волосы – аккуратная «шапочка» с чёлкой
    hair: {
      position: 'absolute',
      top: '-4px',
      left: `${cx - 32}px`,
      width: '64px',
      height: '34px',
      borderRadius: '32px 32px 0 0',
      background: `linear-gradient(180deg, ${headItem.color} 0%, ${adjustColor(headItem.color, -10)} 100%)`,
      boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.1)',
      zIndex: 4,
    },
    bangs: {
      position: 'absolute',
      top: '11px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '58px',
      height: '14px',
      borderRadius: '14px 14px 0 0',
      backgroundColor: headItem.color,
      boxShadow: '0 -1px 2px rgba(0,0,0,0.1)',
      zIndex: 4,
    },
    // Бейсболка
    capBase: {
      position: 'absolute',
      top: '-14px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '56px',
      height: '28px',
      borderRadius: '50% 50% 0 0 / 60% 60% 0 0',
      backgroundColor: headItem.color,
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      zIndex: 5,
    },
    capVisor: {
      position: 'absolute',
      top: '14px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '44px',
      height: '12px',
      borderRadius: '0 0 12px 12px',
      backgroundColor: adjustColor(headItem.color, -20),
      boxShadow: '0 2px 3px rgba(0,0,0,0.15)',
      zIndex: 4,
    },
    capButton: {
      position: 'absolute',
      top: '4px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      backgroundColor: '#fff',
      boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
      zIndex: 6,
    },
    // Шлем астронавта
    astronautHelmet: {
      position: 'absolute',
      top: '-16px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '68px',
      height: '68px',
      borderRadius: '50%',
      background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(189,195,199,0.7))',
      border: '3px solid #95a5a6',
      boxShadow: '0 0 15px rgba(0,0,0,0.3)',
      zIndex: 6,
    },
    helmetVisor: {
      position: 'absolute',
      top: '8px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '50px',
      height: '28px',
      borderRadius: '25px',
      background: 'rgba(52, 73, 94, 0.4)',
      border: '1px solid rgba(255,255,255,0.3)',
    },
    // Шляпа волшебника
    wizardHat: {
      position: 'absolute',
      top: '-34px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 0,
      height: 0,
      borderLeft: '22px solid transparent',
      borderRight: '22px solid transparent',
      borderBottom: `34px solid ${hatItem.color}`,
      zIndex: 7,
      filter: 'drop-shadow(0 3px 3px rgba(0,0,0,0.2))',
    },
    wizardHatStar: {
      position: 'absolute',
      top: '-22px',
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: '14px',
      color: '#f1c40f',
      textShadow: '0 0 5px #f1c40f',
      zIndex: 8,
    },
    // Цилиндр
    topHatBody: {
      position: 'absolute',
      top: '-38px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '42px',
      height: '38px',
      backgroundColor: hatItem.color,
      borderRadius: '6px 6px 0 0',
      boxShadow: '0 4px 6px rgba(0,0,0,0.25)',
      background: `linear-gradient(135deg, ${hatItem.color}, ${adjustColor(hatItem.color, -20)})`,
      zIndex: 7,
    },
    topHatBrim: {
      position: 'absolute',
      top: '-6px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '12px',
      backgroundColor: hatItem.color,
      borderRadius: '6px',
      boxShadow: '0 3px 4px rgba(0,0,0,0.2)',
      zIndex: 6,
    },
    topHatBand: {
      position: 'absolute',
      top: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '42px',
      height: '8px',
      backgroundColor: '#c0392b',
      zIndex: 8,
      borderRadius: '2px',
    },
  };

  // Рендер волос/шапок
  const renderHeadAccessory = () => {
    const type = headItem.render;
    if (type === 'hair') {
      return (
        <>
          <div style={styles.hair} />
          <div style={styles.bangs} />
        </>
      );
    }
    if (type === 'cap') {
      return (
        <>
          <div style={styles.capBase}>
            <div style={styles.capButton} />
          </div>
          <div style={styles.capVisor} />
        </>
      );
    }
    if (type === 'astronaut_helmet') {
      return (
        <div style={styles.astronautHelmet}>
          <div style={styles.helmetVisor} />
        </div>
      );
    }
    return null;
  };

  // Тело с капюшоном
  const renderBody = () => {
    if (bodyItem.render === 'hoodie') {
      return (
        <>
          {/* Капюшон за головой */}
          <div style={styles.hoodieHoodBack} />
          {/* Тело */}
          <div style={styles.body} />
        </>
      );
    }
    return (
      <>
        <div style={styles.body} />
        <div style={styles.collar} />
      </>
    );
  };

  const renderHat = () => {
    if (!hatItem || hatItem.render === null) return null;
    if (hatItem.render === 'wizard_hat') {
      return (
        <>
          <div style={styles.wizardHat} />
          <div style={styles.wizardHatStar}>✦</div>
        </>
      );
    }
    if (hatItem.render === 'top_hat') {
      return (
        <>
          <div style={styles.topHatBody} />
          <div style={styles.topHatBrim} />
          <div style={styles.topHatBand} />
        </>
      );
    }
    return null;
  };

  return (
    <div style={styles.container}>
      {/* Шляпы (поверх всего) */}
      {renderHat()}

      {/* Капюшон худи (если есть) рисуется в renderBody ДО головы, 
          поэтому здесь только голова */}
      {/* Сначала рисуем капюшон (если худи) */}
      {bodyItem.render === 'hoodie' && <div style={styles.hoodieHoodBack} />}

      {/* Голова */}
      <div style={styles.head}>
        <div style={{ ...styles.ear, ...styles.leftEar }} />
        <div style={{ ...styles.ear, ...styles.rightEar }} />
        <div style={{ ...styles.eye, ...styles.leftEye }}>
          <div style={styles.eyeHighlight} />
        </div>
        <div style={{ ...styles.eye, ...styles.rightEye }}>
          <div style={styles.eyeHighlight} />
        </div>
        <div style={styles.mouth} />
      </div>

      {/* Причёска / головной убор */}
      {renderHeadAccessory()}

      {/* Шея */}
      <div style={styles.neck} />

      {/* Тело поверх капюшона (если не худи, просто тело) */}
      {bodyItem.render !== 'hoodie' ? renderBody() : <div style={styles.body} />}

      {/* Руки */}
      <div style={{ ...styles.arm, ...styles.leftArmPos }} />
      <div style={{ ...styles.palm, ...styles.leftPalm }} />
      <div style={{ ...styles.arm, ...styles.rightArmPos }} />
      <div style={{ ...styles.palm, ...styles.rightPalm }} />

      {/* Ноги */}
      <div style={{ ...styles.leg, ...styles.leftLegPos }}>
        <div style={styles.knee} />
      </div>
      <div style={{ ...styles.leg, ...styles.rightLegPos }}>
        <div style={styles.knee} />
      </div>

      {/* Обувь */}
      <div style={{ ...styles.shoe, ...styles.leftShoePos }}>
        {shoesItem.render === 'sneakers' && <div style={styles.shoelace} />}
      </div>
      <div style={{ ...styles.shoe, ...styles.rightShoePos }}>
        {shoesItem.render === 'sneakers' && <div style={styles.shoelace} />}
      </div>
    </div>
  );
};

export default Character;