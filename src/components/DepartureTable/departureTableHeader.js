export const getHeader = (intl) => ([
  {
    title: intl.formatMessage({ id: 'Departure Time' }),
    key: 'departure_time',
    dataIndex: 'departure_time',
  },
  {
    title: intl.formatMessage({ id: 'Arrival Time' }),
    key: 'arrival_time',
    dataIndex: 'arrival_time',
  },
  {
    title: intl.formatMessage({ id: 'Location Name' }),
    key: 'location_name',
    dataIndex: 'location_name',
  },
  {
    title: intl.formatMessage({ id: 'Price' }),
    key: 'price',
    dataIndex: 'price',
  },
]);

const getLocationIndex = (locations, locationId) => (
  locations.findIndex((location) => location.id === locationId));

export const getRows = (departureDetails) => {
  const { locations, info } = departureDetails;
  let _departureDetails = [];
  _departureDetails = info && info.map((departure) => {
    const _departure = {};
    const locationIndex = getLocationIndex(locations, departure.destination_location_id);
    _departure.departure_time = new Date(departure.departure_time).toLocaleString();
    _departure.arrival_time = new Date(departure.arrival_time).toLocaleString();
    _departure.price = `$ ${departure.prices.total}`;
    _departure.location_name = locations[locationIndex].name;
    _departure.key = departure.id;
    return _departure;
  });
  return _departureDetails;
};
