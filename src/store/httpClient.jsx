import axios from 'axios';

export default axios.create({
  timeout: 30000,
  baseURL: process.env.NODE_ENV === 'development' ? 'http://se.local/api/v1' : 'https://www.spuernasenecke.com/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});
