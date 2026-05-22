const API_URL = 'http://127.0.0.1:8000/api';

export const register = async (username, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Ошибка регистрации');
  }
  
  return response.json();
};

export const updateProblemKeys = async (username, problemKeys) => {
  const response = await fetch(`${API_URL}/user/${username}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problemKeys })
  });
  
  if (!response.ok) {
    throw new Error('Ошибка обновления проблемных клавиш');
  }
  
  return response.json();
};

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Ошибка входа');
  }
  
  return response.json();
};

export const updateUserData = async (username, userData) => {
  const response = await fetch(`${API_URL}/user/${username}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Ошибка сохранения');
  }
  
  return response.json();
};

export const getUserData = async (username) => {
  const response = await fetch(`${API_URL}/user/${username}`);
  if (!response.ok) {
    throw new Error('Ошибка получения данных');
  }
  return response.json();
};