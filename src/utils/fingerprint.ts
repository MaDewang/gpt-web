// @ts-ignore
import { getAgent } from 'fingerprintjs2';

let fingerprint = ''

async function getBrowserFingerprint() {
    try {
      const agent = await getAgent();
      const fingerprint = await agent.get();
      
      return fingerprint;
    } catch (error) {
      console.error(error);
      return 'Error: Unable to generate browser fingerprint';
    }
  }

  export const getFingerprint = () => {
    return new Promise((resolve, reject) => {
      if (fingerprint) {
        resolve(fingerprint) 
      }
      const lcoalFingerprint = localStorage.getItem('fingerprint')
      if (lcoalFingerprint) {
        fingerprint = lcoalFingerprint
        resolve(lcoalFingerprint)
      } else {
        getBrowserFingerprint().then(res => {
          fingerprint = res
          resolve(lcoalFingerprint)
        }).catch(reject)
      }
    })
  }