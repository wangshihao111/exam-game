import axios from 'axios';

console.log(process.env.NODE_ENV === 'development')

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3030' : ''