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
      minHeight: '100vh',
      padding: '2rem'
    },
    formContainer: {
      background: '#272e35',
      border: '1px solid rgba(203, 208, 223, 0.08)',
      borderRadius: '8px',
      padding: '2rem',
      width: '100%',
      maxWidth: '400px',
      boxShadow: 'none'
    },
    title: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#6d7887',
      fontSize: '18px'
    },
    inputGroup: {
      marginBottom: '1rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      color: '#6d7887',
      fontSize: '13px'
    },
    input: {
      width: '100%',
      padding: '12px',
      background: '#22272e',
      border: '1px solid #cbd0df',
      borderRadius: '8px',
      color: '#cbd0df',
      fontSize: '1rem',
      outline: 'none'
    },
    button: {
      width: '100%',
      padding: '12px',
      background: '#4895ef',
      border: 'none',
      borderRadius: '8px',
      color: '#22272e',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '1rem'
    },
    switchButton: {
      width: '100%',
      padding: '12px',
      background: 'transparent',
      border: '1px solid rgba(203, 208, 223, 0.16)',
      borderRadius: '8px',
      color: '#6d7887',
      fontSize: '1rem',
      cursor: 'pointer',
      marginTop: '1rem'
    },
    error: {
      background: 'rgba(255, 107, 129, 0.14)',
      border: '1px solid #ff6b81',
      borderRadius: '8px',
      padding: '10px',
      marginBottom: '1rem',
      color: '#ff6b81',
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
        <h2 style={styles.title}>{isLogin ? 'Вход' : 'Регистрация'}</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Имя пользователя</label>
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
            <label style={styles.label}>Пароль</label>
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
              <label style={styles.label}>Подтверждение пароля</label>
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
