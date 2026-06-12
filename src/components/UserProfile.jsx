import React, { useState } from 'react';

const UserProfile = ({ username, userData, onLogout }) => {
  const [showMenu, setShowMenu] = useState(false);

  const styles = {
    profile: {
      position: 'relative',
      cursor: 'pointer'
    },
    username: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: '#272e35',
      padding: '0.3rem 0.8rem',
      borderRadius: '8px',
      fontSize: '0.9rem',
      color: '#6d7887'
    },
    menu: {
      position: 'absolute',
      top: '100%',
      right: 0,
      marginTop: '8px',
      background: '#272e35',
      borderRadius: '8px',
      padding: '0.5rem',
      minWidth: '150px',
      zIndex: 1000,
      border: '1px solid rgba(203, 208, 223, 0.08)'
    },
    menuItem: {
      padding: '8px 12px',
      cursor: 'pointer',
      borderRadius: '6px',
      transition: 'background 0.2s',
      color: '#6d7887'
    }
  };

  return (
    <div style={styles.profile} onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}>
      <div style={styles.username}>
        <span>○</span> {username}
      </div>
      
      {showMenu && (
        <div style={styles.menu}>
          <div style={{...styles.menuItem, color: '#cbd0df'}}>
            {userData.coins} монет
          </div>
          <div style={{...styles.menuItem, color: '#4895ef'}}>
            {userData.bestSpeedWPM} WPM
          </div>
          <hr style={{margin: '4px 0', borderColor: 'rgba(203, 208, 223, 0.08)'}} />
          <div 
            style={{...styles.menuItem, color: '#ff6b81'}}
            onClick={onLogout}
          >
            Выйти
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
