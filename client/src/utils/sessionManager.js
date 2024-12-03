export const setSession = (token) => {
    localStorage.setItem('authToken', token);
  };
  
  export const getSession = () => {
    return localStorage.getItem('authToken');
  };
  
  export const clearSession = () => {
    localStorage.removeItem('authToken');
  };
  