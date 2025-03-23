import { getToken, removeToken } from "./authentication";

const url = import.meta.env.VITE_BASE_URL;

const request = async (
  method: string,
  api: string,
  payload?: any
): Promise<any> => {
  try {
    const response = await fetch(`${url}${api}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: payload ? JSON.stringify(payload) : undefined,
    });

    const data = await response.json();

    if (response.status === 401) {
      removeToken();
      window.location.href = "http://localhost:5173/login";
    }
    if (!response.ok) {
      return { err: data.message };
    }

    return data;
  } catch (error) {
    console.error("Request Error:", error);
    return { err: "An error occured" };
  }
};

const postRequest = (api: string, payload: any) =>
  request("POST", api, payload);
const getRequest = (api: string) => request("GET", api);
const putRequest = (api: string, payload: Object) =>
  request("PUT", api, payload);
const deleteRequest = (api: string) => request("DELETE", api);

export { postRequest, getRequest, putRequest, deleteRequest };
