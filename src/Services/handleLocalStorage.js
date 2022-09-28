export const setLocalStorage = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
}

const AUTH = "@login-token"

export const isAuthenticated = () => !!localStorage.getItem(AUTH)

export const getLocalToken = () => {
  const obj = JSON.parse(localStorage.getItem(AUTH));
  return obj;
}

