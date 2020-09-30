import React, { useState, useContext } from 'react';
import { fetchDepartures } from '../../api/departures';
import { UserConfigContext } from '../withUserConfigProvider';

// inital context state
const initialState = {
  isFetching: false,
  isError: false,
  info: [],
  locations: [],
  departureInfo: {
    from: null,
    to: null,
    adults: 0,
    departureDate: null,
  },
};

// Context
const DeparturesContext = React.createContext({ ...initialState });

// Hook
const useDepartures = (
  initialDepartures = { ...initialState },
) => {
  const [departures, setDepartures] = useState(initialDepartures);
  const { userConfig } = useContext(UserConfigContext);

  const fetchDeparturesStart = () => {
    setDepartures({ ...departures, isFetching: true, isError: false });
  };

  const fetchDeparturesSuccess = (_departures, _initialDepartures) => {
    setDepartures({
      ...departures,
      isFetching: false,
      info: [..._initialDepartures.info, ..._departures.departures],
      locations: [..._initialDepartures.locations, ..._departures.locations],
    });
  };

  const fetchDeparturesError = () => {
    setDepartures({ ...departures, isFetching: false, isError: true });
  };

  const getDepartures = (departureDetails, isPoll) => {
    fetchDeparturesStart();
    fetchDepartures({
      ...departureDetails.departureInfo,
      index: departureDetails.info && departureDetails.info.length,
      lang: userConfig.locale.toUpperCase(),
    }, isPoll)
      .then((res) => {
        if (!res.body.complete) {
          setTimeout(() => (getDepartures(departureDetails, true)), 3000);
        }
        fetchDeparturesSuccess(res.body, departureDetails);
      })
      .catch(() => {
        fetchDeparturesError();
      });
  };

  const getDeparturesList = (departureDetails) => {
    getDepartures(departureDetails);
  };

  return {
    departures,
    setDepartures,
    getDeparturesList,
  };
};

// Provider
function withDeparturesProvider(Component) {
  function DeparturesProvider(props) {
    const departures = useDepartures();

    return (
      <DeparturesContext.Provider value={departures}>
        <Component
          {...props}
        />
      </DeparturesContext.Provider>
    );
  }

  return DeparturesProvider;
}

export { DeparturesContext, withDeparturesProvider };
