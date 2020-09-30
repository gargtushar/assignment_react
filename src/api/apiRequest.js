import superagent from 'superagent';
import apiEndpoints from '../common/constants/apiEndpoints';

const defaultHeaders = {
  'X-Busbud-Token': 'PARTNER_BaASYYHxTxuOINEOMWq5GA',
  Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
};

export default function request({
  method = 'get',
  url,
  endpoint,
  payload,
  query,
  responseType,
  type = 'application/json',
}) {
  const _url = url || `${apiEndpoints.baseUrl}/${endpoint}`;

  const apiRequest = superagent(method, _url);

  apiRequest.set(defaultHeaders);

  if (responseType === 'blob') {
    apiRequest.responseType('blob');
  }
  return (
    new Promise((resolve, reject) => {
      apiRequest
        .set('Content-Type', type)
        .send(payload)
        .query(query)
        .then(resolve)
        .catch((error) => {
          const errorBody = (error.response && error.response.body) || {};
          reject(errorBody);
        });
    })
  );
}
