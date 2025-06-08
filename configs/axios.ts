import axios from "axios";

const myPlatesAxios = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 本番環境以外はリクエストとレスポンス時にデバッグ用ログを出力する
if (process.env.EXPO_PUBLIC__ENV !== "production") {
  myPlatesAxios.interceptors.request.use(
    (config) => {
      console.log(config);
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  myPlatesAxios.interceptors.response.use(
    (response) => {
      console.log(response);
      return response;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );
}

export default myPlatesAxios;
