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

  const filteredItems = filterCategory === 'all'
    ? shopItems
    : shopItems.filter(item => item.category === filterCategory);

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
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' },
    filterButtons: { display: 'flex', gap: '10px', marginBottom: '1rem', justifyContent: 'center', flexWrap: 'wrap' },
    filterBtn: { padding: '8px 16px', background: '#3a3a4a', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
    filterBtnActive: { background: '#4caf50' },
    shopGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' },
    itemCard: { background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center', cursor: 'pointer', border: '2px solid transparent', transition: 'transform 0.2s' },
    itemCardActive: { border: '2px solid #ffd700', boxShadow: '0 0 15px rgba(255,215,0,0.3)' },
    itemPreview: { width: '100%', height: '220px', borderRadius: '12px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'},
    characterPreviewWrapper: { height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '70px', boxSizing: 'border-box', transform: 'scale(0.9)', transformOrigin: 'center'},
    itemName: { fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#ffd700' },
    itemPrice: { fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' },
    btn: { padding: '8px 16px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', width: '100%' },
    buyBtn: { background: '#4caf50', color: 'white' },
    activateBtn: { background: '#2196f3', color: 'white' },
    activeBtn: { background: '#ffd700', color: '#1e1e2f' },
    disabledBtn: { opacity: 0.5, cursor: 'not-allowed' }
  };

  const renderPreview = (item) => {
    if (item.category === 'background') {
      return <div style={{ ...styles.itemPreview, background: item.style.background }} />;
    } else if (item.category === 'keyboard') {
      return (
        <div style={{ ...styles.itemPreview, background: '#1e1e2f', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ width: '30px', height: '30px', backgroundColor: item.style.keyBg, border: `2px solid ${item.style.keyBorder}`, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.style.keyText, fontSize: '14px' }}>A</div>
            ))}
          </div>
          <div style={{ fontSize: '12px', color: '#aaa' }}>Предпросмотр клавиш</div>
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
        <div style={{ ...styles.itemPreview, background: 'rgba(0,0,0,0.2)' }}>
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
        <h2>🛒 Магазин</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#ffd700', fontWeight: 'bold' }}>🪙 {userData.coins} монет</span>
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
            btnText = `Купить за ${item.price} 🪙`;
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
                {!purchased && <span>💰 {item.price} 🪙</span>}
                {purchased && <span>✅ Куплено</span>}
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