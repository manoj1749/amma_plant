import axios from 'axios';

const network = axios.create({
  url: 'http://192.168.137.1:4848/api',
});
export default network;
