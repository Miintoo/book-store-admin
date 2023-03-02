import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://elice.iptime.org:8080/api'
});

const excludeTokenUrl = ['/admin/login'];

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Auth');
    try {
      if (!excludeTokenUrl.includes(config.url) && token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      console.log('jwt 토큰이 없거나 jwt 토큰의 유효기간이 지났습니다.');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('Auth');
      localStorage.removeItem('Role');
      // 인증되지 않은 유저의 경우 로그인 페이지로 리다이렉트 처리
      location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
