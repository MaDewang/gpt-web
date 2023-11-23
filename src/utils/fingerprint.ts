// @ts-ignore
import Fingerprint2 from 'fingerprintjs2';

let fingerprint = ''

function getBrowserFingerprint() {
  return new Promise<string>((resolve, reject) => {
    try {
      Fingerprint2.get((components: any[]) => { // 参数只有回调函数时，默认浏览器指纹依据所有配置信息进行生成
        const values = components.map(component => component.value); // 配置的值的数组
        const murmur = Fingerprint2.x64hash128(values.join(''), 31); // 生成浏览器指纹
        console.log(components);
        console.log(values);
        console.log(murmur);
        localStorage.setItem('browserId', murmur); // 存储浏览器指纹，在项目中用于校验用户身份和埋点
        resolve(murmur)
      })
    } catch (error) {
      console.error(error);
      reject('Error: Unable to generate browser fingerprint');
    }
    
  })
    
  }

  export const getFingerprint = () => {
    return new Promise((resolve, reject) => {
      if (fingerprint) {
        resolve(fingerprint) 
      }
      const lcoalFingerprint = localStorage.getItem('browserId')
      if (lcoalFingerprint) {
        fingerprint = lcoalFingerprint
        resolve(fingerprint)
      } else {
        getBrowserFingerprint().then((res) => {
          fingerprint = res || ''
          resolve(fingerprint)
        }).catch(reject)
      }
    })
  }