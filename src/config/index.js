
const Config = {
  API_BASE_URL: 'http://172.16.36.159:20000/app/mock/21',
  BASE_TAB: 'http://localhost:8080',
  LOGOUT_URL: '',
  LOGIN_URL: 'http://127.0.0.1/cas/login'
}

if (window && window.mungConfig) {
  Object.assign(Config, window.mungConfig)
}

export default Config
