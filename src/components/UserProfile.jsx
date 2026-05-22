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
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '0.3rem 0.8rem',
      borderRadius: '20px',
      fontSize: '0.9rem'
    },
    menu: {
      position: 'absolute',
      top: '100%',
      right: 0,
      marginTop: '8px',
      background: '#2d2d3a',
      borderRadius: '12px',
      padding: '0.5rem',
      minWidth: '150px',
      zIndex: 1000,
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    },
    menuItem: {
      padding: '8px 12px',
      cursor: 'pointer',
      borderRadius: '6px',
      transition: 'background 0.2s'
    }
  };

  return (
    <div style={styles.profile} onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}>
      <div style={styles.username}>
        <span>👤</span> {username}
      </div>
      
      {showMenu && (
        <div style={styles.menu}>
          <div style={{...styles.menuItem, color: '#ffd700'}}>
            🪙 {userData.coins} монет
          </div>
          <div style={{...styles.menuItem, color: '#4caf50'}}>
            ⚡ {userData.bestSpeedWPM} WPM
          </div>
          <hr style={{margin: '4px 0', borderColor: '#4a4a5a'}} />
          <div 
            style={{...styles.menuItem, color: '#f44336'}}
            onClick={onLogout}
          >
            🚪 Выйти
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;