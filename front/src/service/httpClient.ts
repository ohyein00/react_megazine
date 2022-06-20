import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const soy = "http://3.39.124.255";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const yujin = "http://15.164.93.211";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mock = "http://localhost:10004";
const API_DEV = soy
const API_PRODUCT = soy
const baseURL = process.env.NODE_ENV === "development" ? API_DEV : API_PRODUCT;

const getToken = (tokenName: string) => {
  const localToken = localStorage.getItem('recoil-persist');
  if (localToken) {
    const tokenParseJson = JSON.parse(localToken)
    if (tokenParseJson !== '') {
      const token = tokenParseJson[tokenName]
      return token
    }
  }
}
const axiosApi = (url: string, options?: object) => {
  const instanceDefault = axios.create({
    baseURL: `${url}/api`,
    ...options
  });
  return instanceDefault;
};

const authTokenInstance = axios.create({timeout:10000, baseURL: `${baseURL}/api`});

authTokenInstance.interceptors.request.use(
    (config)=>{

      const token = getToken('userToken')
      if(token) {
        config.headers = {'X-AUTH-TOKEN': `${token}`,}
      }
      try{
        return config
      }catch(err){
        console.error(`[_axios.interceptors.request] config : ${err}`);
      }
      return config
    }
  )
// 나중에 리프레시 토큰이나 토큰 만료에 대해 인터셉터

export const defaultInstance = axiosApi(baseURL);
export const authInstance = authTokenInstance;
