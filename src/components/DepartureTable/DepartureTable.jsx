import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Table from '../Table';
import { getHeader, getRows } from './departureTableHeader';
import { DeparturesContext } from '../../providers/withDeparturesProvider';
import './departureTable.scss';

function DepartureTable(props) {
  const { departures } = useContext(DeparturesContext);
  return (
    <div className="departure-table">
      <Table
        columns={getHeader(props.intl)}
        dataSource={getRows(departures)}
        sticky
      />
    </div>
  );
}

DepartureTable.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(DepartureTable);
