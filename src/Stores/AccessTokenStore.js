const ACCESS_TOKEN_KEY = 'access_token';

let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) || '';

export const setAccessToken = (token) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  accessToken = token;
};

export const getAccessToken = () => accessToken;

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  accessToken = '';

  window.location.assign('/');
  console.log('logout');
};