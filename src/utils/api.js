import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://elice.iptime.org:5500'
});

export default instance;
