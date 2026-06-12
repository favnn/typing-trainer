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
  const [currentPage, setCurrentPage] = useState('test');
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
    const rootNodes = [document.documentElement, document.body];
    const resetPageBackground = () => {
      rootNodes.forEach(node => {
        node.style.background = '';
        node.style.backgroundImage = '';
        node.style.backgroundSize = '';
        node.style.backgroundPosition = '';
        node.style.backgroundRepeat = '';
        node.style.backgroundAttachment = '';
        node.style.backgroundColor = '#22272e';
      });
    };

    resetPageBackground();

    if (userData?.activeSkins?.background) {
      const bgItem = shopItems.find(
        item => item.id === userData.activeSkins.background
      );

      if (bgItem?.style) {
        rootNodes.forEach(node => {
          Object.assign(node.style, bgItem.style);
          node.style.backgroundAttachment = 'fixed';
        });
      }
    }

    return () => {
      resetPageBackground();
    };
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
    setCurrentPage('test');
    setPracticeKeys([]);
  };

  const handleLogin = (username, data) => {
    setCurrentUser(username);
    setUserData(data);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', username);
    localStorage.setItem('userData', JSON.stringify(data));
    setCurrentPage('test');
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
  const navItems = [
    { id: 'home', label: 'Главная', icon: '⌂' },
    { id: 'test', label: 'Тест', icon: '⌨' },
    { id: 'lessons', label: 'Уроки', icon: '▤' },
    { id: 'shop', label: 'Магазин', icon: '◫' },
    { id: 'stats', label: 'Статистика', icon: '♕' }
  ];

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-brand" title="typing trainer">
          <img src="/logoMain.png" alt="Typing trainer" className="nav-logo" />
        </div>

        <div className="nav-links">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => setCurrentPage(item.id)}
              title={item.label}
              aria-current={currentPage === item.id ? 'page' : undefined}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="nav-bottom">
          <div className="coin-display" title="Монеты">{userData?.coins || 0}</div>
          <button className="user-profile" onClick={handleLogout} title={`Выйти: ${currentUser}`}>
            <span className="nav-icon">○</span>
            <span className="nav-text">{currentUser}</span>
          </button>
        </div>
      </nav>

      <main className="app-content">
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
      </main>
    </div>
  );
}

export default App;
