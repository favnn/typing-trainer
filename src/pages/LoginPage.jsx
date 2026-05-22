import React, { useState } from 'react';
import { register, login } from '../services/api';

const LoginPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 80px)',
      padding: '2rem'
    },
    formContainer: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '2rem',
      width: '100%',
      maxWidth: '400px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    },
    title: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#ffd700'
    },
    inputGroup: {
      marginBottom: '1rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      color: '#e0e0e0'
    },
    input: {
      width: '100%',
      padding: '12px',
      background: '#1e1e2f',
      border: '1px solid #4a4a5a',
      borderRadius: '8px',
      color: 'white',
      fontSize: '1rem',
      outline: 'none'
    },
    button: {
      width: '100%',
      padding: '12px',
      background: '#4caf50',
      border: 'none',
      borderRadius: '8px',
      color: 'white',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '1rem'
    },
    switchButton: {
      width: '100%',
      padding: '12px',
      background: 'transparent',
      border: '1px solid #4a4a5a',
      borderRadius: '8px',
      color: '#e0e0e0',
      fontSize: '1rem',
      cursor: 'pointer',
      marginTop: '1rem'
    },
    error: {
      background: 'rgba(244, 67, 54, 0.2)',
      border: '1px solid #f44336',
      borderRadius: '8px',
      padding: '10px',
      marginBottom: '1rem',
      color: '#f44336',
      textAlign: 'center'
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed'
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username.trim()) {
      setError('Введите имя пользователя');
      setLoading(false);
      return;
    }

    if (!password) {
      setError('Введите пароль');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Вход
        const result = await login(username, password);
        onLogin(result.username, result.userData);
      } else {
        // Регистрация
        if (password !== confirmPassword) {
          setError('Пароли не совпадают');
          setLoading(false);
          return;
        }
        
        if (password.length < 4) {
          setError('Пароль должен быть не менее 4 символов');
          setLoading(false);
          return;
        }
        
        const result = await register(username, password);
        onLogin(result.username, result.userData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>{isLogin ? '🔐 Вход' : '📝 Регистрация'}</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>👤 Имя пользователя</label>
            <input
              type="text"
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите имя"
              autoFocus
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>🔒 Пароль</label>
            <input
              type="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
            />
          </div>
          
          {!isLogin && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>🔒 Подтверждение пароля</label>
              <input
                type="password"
                style={styles.input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Повторите пароль"
              />
            </div>
          )}
          
          <button 
            type="submit" 
            style={{...styles.button, ...(loading ? styles.buttonDisabled : {})}}
            disabled={loading}
          >
            {loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
          </button>
        </form>
        
        <button 
          style={styles.switchButton}
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
          }}
        >
          {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;