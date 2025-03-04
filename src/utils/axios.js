import axios from 'axios';

// 創建 axios 實例
const instance = axios.create({
  // baseURL: 'https://your-api-base-url',  // 如果有基礎 URL 可以設置
  timeout: 10000,  // 請求超時時間
  headers: {
    'Content-Type': 'application/json',
  }
});

// 請求攔截器
instance.interceptors.request.use(
  config => {
    // 在發送請求之前做些什麼
    return config;
  },
  error => {
    // 對請求錯誤做些什麼
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// 響應攔截器
instance.interceptors.response.use(
  response => {
    // 對響應數據做點什麼
    return response;
  },
  error => {
    // 對響應錯誤做點什麼
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default instance;