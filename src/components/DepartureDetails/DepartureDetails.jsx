import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { SearchOutlined } from '@ant-design/icons';
import Select from '../Select';
import DatePicker from '../DatePicker';
import InputNumber from '../InputNumber';
import Button from '../Button';
import { cities } from '../../common/constants/departuredetails';
import { DeparturesContext } from '../../providers/withDeparturesProvider';
import './departureDetails.scss';

function DepartureDetails(props) {
  const { departures, setDepartures, getDeparturesList } = useContext(DeparturesContext);
  const { departureInfo } = departures;

  const from = props.intl.formatMessage({ id: 'From' });
  const to = props.intl.formatMessage({ id: 'To' });

  const handleOnChange = (value, key) => {
    setDepartures({
      ...departures,
      departureInfo: {
        ...departureInfo,
        [key]: value,
      },
    });
  };

  return (
    <div className="departure-details-wrap">
      <div style={{ width: '35%' }}>
        <Select
          placeholder={from}
          onChange={(value) => handleOnChange(value, 'from')}
          style={{ width: '48%' }}
        >
          {Object.keys(cities).map((city) => (
            <Select.Option
              key={city}
              value={cities[city]}
            >
              {city}
            </Select.Option>
          ))}
        </Select>
        <span className="dash">-</span>
        <Select
          placeholder={to}
          onChange={(value) => handleOnChange(value, 'to')}
          style={{ width: '48%' }}
        >
          {Object.keys(cities).map((city) => (
            <Select.Option
              key={city}
              value={cities[city]}
            >
              {city}
            </Select.Option>
          ))}
        </Select>
      </div>
      <DatePicker
        style={{ width: '20%' }}
        placeholder={props.intl.formatMessage({ id: 'Departure Date' })}
        onChange={(date, dateString) => handleOnChange(dateString, 'departureDate')}
      />
      <InputNumber
        style={{ width: '20%' }}
        min={0}
        max={100}
        placeholder={props.intl.formatMessage({ id: 'Adults' })}
        type="number"
        onChange={(value) => handleOnChange(value, 'adults')}
      />
      <Button
        icon={<SearchOutlined />}
        ghost
        onClick={() => { getDeparturesList(departures); }}
        style={{ width: '20%' }}
      >
        {props.intl.formatMessage({ id: 'Search' })}
      </Button>
    </div>
  );
}

DepartureDetails.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(DepartureDetails);
