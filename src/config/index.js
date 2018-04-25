
const Config = {
  API_BASE_URL: 'http://p1663488m8.imwork.net:49784',
  BASE_TAB: 'http://localhost:8080',
  LOGOUT_URL: '',
  LOGIN_URL: 'http://127.0.0.1/cas/login'
}

if (window && window.mungConfig) {
  Object.assign(Config, window.mungConfig)
}

export default Config
