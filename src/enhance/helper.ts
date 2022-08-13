import crypto = require('crypto');

/**
 * encrypt data with hmac
 * @param data will encrypt data    
 * @param key the hmac key
 * @param algorithm 
 * @returns hex string
 */
export function hash(data: string | Buffer, key: string | Buffer, algorithm = 'sha1') {
  const hmac = crypto.createHmac(algorithm, key)
  hmac.update(data);
  return hmac.digest('hex');
}
