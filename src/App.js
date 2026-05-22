import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import TestPage from './pages/TestPage';
import LessonsPage from './pages/LessonsPage';
import StatsPage from './pages/StatsPage';
import LoginPage from './pages/LoginPage';
import ShopPage from './pages/ShopPage';
import { updateUserData, getUserData } from './services/api';
import shopItems from './data/shopItems';
import './App.css';

const getKeyboardTheme = (activeSkins) => {
  const skinId = activeSkins?.keyboard;
  const found = shopItems.find(item => item.id === skinId);
  return found?.style || shopItems.find(item => item.id === 'kb_default').style;
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [practiceKeys, setPracticeKeys] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedData = localStorage.getItem('userData');
    if (savedUser && savedData) {
      setCurrentUser(savedUser);
      setUserData(JSON.parse(savedData));
      setIsAuthenticated(true);
      loadUserData(savedUser);
    }
  }, []);

  useEffect(() => {
    if (userData?.activeSkins?.background) {
      const bgItem = shopItems.find(item => item.id === userData.activeSkins.background);
      if (bgItem) {
        document.body.style.background = bgItem.style.background;
        document.body.style.backgroundAttachment = 'fixed';
        return;
      }
    }
    document.body.style.background = '';
    document.body.style.backgroundAttachment = '';
  }, [userData?.activeSkins?.background]);

  const loadUserData = async (username) => {
    try {
      const data = await getUserData(username);
      setUserData(data.userData);
      localStorage.setItem('userData', JSON.stringify(data.userData));
    } catch (err) {
      console.error('Ошибка загрузки данных:', err);
    }
  };

  const handleLogout = async () => {
    if (currentUser && userData) {
      try {
        await updateUserData(currentUser, userData);
      } catch (err) {
        console.error('Ошибка сохранения:', err);
      }
    }
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userData');
    setCurrentUser(null);
    setUserData(null);
    setIsAuthenticated(false);
    setCurrentPage('home');
    setPracticeKeys([]);
  };

  const handleLogin = (username, data) => {
    setCurrentUser(username);
    setUserData(data);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', username);
    localStorage.setItem('userData', JSON.stringify(data));
    setCurrentPage('home');
    setPracticeKeys([]);
  };

  const updateUserDataLocal = async (newDataOrUpdater) => {
    let updatedData;
    if (typeof newDataOrUpdater === 'function') {
      updatedData = newDataOrUpdater(userData);
    } else {
      updatedData = { ...userData, ...newDataOrUpdater };
    }
    setUserData(updatedData);
    localStorage.setItem('userData', JSON.stringify(updatedData));
    if (currentUser) {
      try {
        await updateUserData(currentUser, updatedData);
      } catch (err) {
        console.error('Ошибка сохранения на сервере:', err);
      }
    }
  };

  const handlePracticeErrors = (problemKeys) => {
    setPracticeKeys(problemKeys);
    setCurrentPage('test');
  };

  const handlePracticeComplete = (success, updatedUserData) => {
    setPracticeKeys([]);
    if (success && updatedUserData) {
      setUserData(updatedUserData);
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
    } else if (success) {
      const savedData = localStorage.getItem('userData');
      if (savedData) {
        setUserData(JSON.parse(savedData));
      }
    }
    if (currentPage === 'stats') {
      setCurrentPage('home');
      setTimeout(() => setCurrentPage('stats'), 50);
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const keyboardTheme = getKeyboardTheme(userData?.activeSkins);

  return (
    <div className="App">
      <nav className="navbar">
<img src="/logo.png" alt="Дабл ю Дабл ю" style={{ height: '80px' }} />        <div className="nav-links">
          <button onClick={() => setCurrentPage('home')}>Главная</button>
          <button onClick={() => setCurrentPage('test')}>Тест</button>
          <button onClick={() => setCurrentPage('lessons')}>Уроки</button>
          <button onClick={() => setCurrentPage('shop')}>Магазин</button>
          <button onClick={() => setCurrentPage('stats')}>Статистика</button>
          <div className="coin-display">🪙 {userData?.coins || 0}</div>
          <div className="user-profile" onClick={handleLogout} style={{ cursor: 'pointer' }}>
            👤 {currentUser} 🚪
          </div>
        </div>
      </nav>

      {currentPage === 'home' && <Home userData={userData} />}
      {currentPage === 'test' && (
        <TestPage
          userData={userData}
          updateUserData={updateUserDataLocal}
          practiceKeys={practiceKeys}
          onPracticeComplete={handlePracticeComplete}
          keyboardTheme={keyboardTheme}
        />
      )}
      {currentPage === 'lessons' && (
        <LessonsPage userData={userData} updateUserData={updateUserDataLocal} keyboardTheme={keyboardTheme} />
      )}
      {currentPage === 'stats' && (
        <StatsPage
          key={userData?.problemKeys ? JSON.stringify(userData.problemKeys) : Date.now()}
          userData={userData}
          onPracticeErrors={handlePracticeErrors}
        />
      )}
      {currentPage === 'shop' && <ShopPage userData={userData} updateUserData={updateUserDataLocal} />}
    </div>
  );
}

export default App;