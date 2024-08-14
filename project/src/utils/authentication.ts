const setToken = (data: string): void => {
  localStorage.setItem("token", data);
};

const getToken = (): string => {
  return localStorage.getItem("token") || "";
};

const removeToken = (): void => {
  localStorage.removeItem("token");
};

export { setToken, getToken, removeToken };
