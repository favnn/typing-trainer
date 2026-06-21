import React, { useState } from 'react';
import shopItems from '../data/shopItems';
import Character from '../components/Character';

const ShopPage = ({ userData, updateUserData }) => {
  const [filterCategory, setFilterCategory] = useState('all');
  const purchasedItems = userData.purchasedItems || [];
  const activeSkins = userData.activeSkins || {};
  const activeWardrobe = userData.activeWardrobe || {};

  const wardrobeCategories = ['head', 'body', 'arms', 'legs', 'shoes', 'hat'];
  const isWardrobeItem = (item) => wardrobeCategories.includes(item.category);

  const handleBuyOrActivate = (item) => {
    const purchased = isPurchased(item);

    // Если предмет уже куплен или он дефолтный — просто активируем
    if (purchased) {
      if (isWardrobeItem(item)) {
        const newWardrobe = { ...activeWardrobe, [item.slot]: item.id };
        updateUserData({ ...userData, activeWardrobe: newWardrobe });
      } else {
        const newActive = { ...activeSkins, [item.category]: item.id };
        updateUserData({ ...userData, activeSkins: newActive });
      }

      return;
    }

    // Если не куплен — покупаем
    if (userData.coins < item.price) {
      alert('Недостаточно монет!');
      return;
    }

    const newCoins = userData.coins - item.price;
    const newPurchased = [...purchasedItems, item.id];

    if (isWardrobeItem(item)) {
      const newWardrobe = { ...activeWardrobe, [item.slot]: item.id };

      updateUserData({
        ...userData,
        coins: newCoins,
        purchasedItems: newPurchased,
        activeWardrobe: newWardrobe
      });
    } else {
      const newActive = { ...activeSkins, [item.category]: item.id };

      updateUserData({
        ...userData,
        coins: newCoins,
        purchasedItems: newPurchased,
        activeSkins: newActive
      });
    }
  };

  const visibleItems = shopItems.filter(item => !item.hidden);

  const filteredItems = filterCategory === 'all'
    ? visibleItems
    : visibleItems.filter(item => item.category === filterCategory);

  const isActive = (item) => {
    if (isWardrobeItem(item)) {
      const activeItemId = activeWardrobe[item.slot];

      if (!activeItemId && item.default) {
        return true;
      }

      return activeItemId === item.id;
    }

    const activeSkinId = activeSkins[item.category];

    if (!activeSkinId && item.default) {
      return true;
    }

    return activeSkinId === item.id;
  };

  const isPurchased = (item) => item.default || item.price === 0 || purchasedItems.includes(item.id);

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
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '42px',
      flexWrap: 'wrap'
    },
    title: {
      color: '#6d7887',
      fontSize: '18px',
      lineHeight: 1.2,
      fontWeight: 600
    },
    coinPill: {
      minHeight: '35px',
      padding: '0 12px',
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: '8px',
      background: '#272e35',
      color: '#6d7887',
      fontSize: '13px',
      fontWeight: 600
    },
    filterButtons: {
      display: 'flex',
      gap: '10px',
      marginBottom: '24px',
      flexWrap: 'wrap'
    },
    filterBtn: {
      minHeight: '32px',
      padding: '0 14px',
      background: '#272e35',
      border: 'none',
      color: '#6d7887',
      borderRadius: '8px',
      fontFamily: 'inherit',
      fontWeight: 500
    },
    filterBtnActive: { color: '#4895ef', background: 'rgba(72, 149, 239, 0.1)' },
    shopGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '16px' },
    itemCard: {
      background: '#272e35',
      borderRadius: '8px',
      padding: '1rem',
      textAlign: 'center',
      cursor: 'pointer',
      border: '1px solid rgba(203, 208, 223, 0.08)',
      transition: 'border-color 0.16s ease'
    },
    itemCardActive: { border: '1px solid rgba(72, 149, 239, 0.55)' },
    itemPreview: { width: '100%', height: '200px', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'},
    characterPreviewWrapper: { height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '70px', boxSizing: 'border-box', transform: 'scale(0.9)', transformOrigin: 'center'},
    itemName: { fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#cbd0df' },
    itemPrice: { fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', color: '#6d7887' },
    btn: { minHeight: '35px', padding: '0 14px', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer', width: '100%', fontFamily: 'inherit' },
    buyBtn: { background: '#4895ef', color: '#22272e' },
    activateBtn: { background: '#22272e', color: '#cbd0df' },
    activeBtn: { background: 'rgba(72, 149, 239, 0.1)', color: '#4895ef' },
    disabledBtn: { opacity: 0.5, cursor: 'not-allowed' }
  };

  const renderPreview = (item) => {
    if (item.category === 'background') {
      return <div style={{ ...styles.itemPreview, ...item.style }} />;
    } else if (item.category === 'keyboard') {
      return (
        <div style={{ ...styles.itemPreview, background: '#22272e', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ width: '30px', height: '30px', backgroundColor: item.style.keyBg, border: `1px solid ${item.style.keyBorder}`, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.style.keyText, fontSize: '14px' }}>A</div>
            ))}
          </div>
          <div style={{ fontSize: '12px', color: '#6d7887' }}>Предпросмотр клавиш</div>
        </div>
      );
    } else if (['head', 'body', 'arms', 'legs', 'shoes', 'hat'].includes(item.category)) {
      const defaultPreviewWardrobe = {
        head: 'head_default',
        body: 'body_default',
        arms: 'arms_default',
        legs: 'legs_default',
        shoes: 'shoes_default',
        hat: 'hat_default',
      };

      const previewWardrobe = {
        ...defaultPreviewWardrobe,
        [item.slot]: item.id,
      };

      return (
        <div style={{ ...styles.itemPreview, background: '#22272e' }}>
          <div style={styles.characterPreviewWrapper}>
              <Character
              activeWardrobe={previewWardrobe}
              hideHoodieHood={item.id === 'body_hoodie'}
            />
          </div>
        </div>
      );
    }
    return null;
  };

  const categoryLabels = {
    all: 'Все',
    background: 'Обои',
    keyboard: 'Раскладки',
    head: 'Голова',
    body: 'Тело',
    arms: 'Руки',
    legs: 'Ноги',
    shoes: 'Обувь',
    hat: 'Шляпы'
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Магазин</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={styles.coinPill}>{userData.coins} coins</span>
        </div>
      </div>

      <div style={styles.filterButtons}>
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            style={{ ...styles.filterBtn, ...(filterCategory === key ? styles.filterBtnActive : {}) }}
            onClick={() => setFilterCategory(key)}
          >{label}</button>
        ))}
      </div>

      <div style={styles.shopGrid}>
        {filteredItems.map(item => {
          const purchased = isPurchased(item);
          const active = isActive(item);
          let btnStyle = {};
          let btnText = '';
          let btnDisabled = false;

          if (active) {
            btnStyle = styles.activeBtn;
            btnText = 'Активно';
          } else if (purchased) {
            btnStyle = styles.activateBtn;
            btnText = 'Использовать';
          } else {
            btnStyle = styles.buyBtn;
            btnText = `Купить за ${item.price}`;
            btnDisabled = userData.coins < item.price;
          }

          return (
            <div
              key={item.id}
              style={{ ...styles.itemCard, ...(active ? styles.itemCardActive : {}) }}
              onClick={() => handleBuyOrActivate(item)}
            >
              {renderPreview(item)}
              <div style={styles.itemName}>{item.name}</div>
              <div style={styles.itemPrice}>
                {!purchased && <span>{item.price} coins</span>}
                {purchased && <span>Куплено</span>}
              </div>
              <button
                style={{ ...styles.btn, ...btnStyle, ...(btnDisabled ? styles.disabledBtn : {}) }}
                disabled={btnDisabled}
                onClick={(e) => { e.stopPropagation(); handleBuyOrActivate(item); }}
              >{btnText}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopPage;
