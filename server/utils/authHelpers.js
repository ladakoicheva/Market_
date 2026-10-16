
export const generateToken = () => 'token-' + Date.now() + '-' + Math.random() + '-test-' + Math.random();




const UNIX = {
  '1_HOUR': 60 * 60 * 1000,
  '8_HOUR': 60 * 60 * 1000 * 8,
  '30_MINUTES':  30*60*1000
}


export const getLiveToken = () => Date.now() + UNIX["1_HOUR"];
export const extendLiveToken = ()=>Date.now()+ UNIX["30_MINUTES"]
