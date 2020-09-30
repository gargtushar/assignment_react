import apiCall from './apiRequest';
import apiEndpoints from '../common/constants/apiEndpoints';

export function fetchDepartures(departureInfo, isPoll = false) {
  const query = {};
  query.adult = departureInfo.adults;
  query.currency = 'CAD';
  query.lang = departureInfo.lang;

  if (isPoll) {
    query.index = departureInfo.index;
  }

  const endpoint = `${apiEndpoints.departure}/${departureInfo.from}/${departureInfo.to}/${departureInfo.departureDate}`;

  return apiCall({
    endpoint: isPoll ? `${endpoint}/poll` : endpoint,
    query,
  });
}

export default {
  fetchDepartures,
};
