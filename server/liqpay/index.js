let crypto = require('crypto');
import config from "../config/environment"
console.log('publicKey', config.liqpay.publicKey, config);
const publicKey = config.liqpay.publicKey;
const privateKey = config.liqpay.privateKey;
const apiEndpoint = 'https://www.liqpay.com/api/3/checkout';
const apiVersion = '3';

export function generatePaymentLink(params) {
  params.public_key = publicKey;
  params.version = apiVersion;
  console.log('publicKey1', params.public_key, config);
  let data = paramsToDataString(params);
  let signature = signString(data);

  return apiEndpoint + '?data=' + data + '&signature=' + signature;
}

export function signString(data) {
  let sha1 = crypto.createHash('sha1');
  sha1.update(privateKey + data + privateKey);

  return sha1.digest('base64');
}

function paramsToDataString(params) {
  return new Buffer(JSON.stringify(params)).toString('base64');
}

