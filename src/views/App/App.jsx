import React from 'react';
// import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import withIntlProvider from '../../common/hocs/withIntlProvider';
import { withUserConfigProvider } from '../../providers/withUserConfigProvider';
import DepartureDetails from '../../components/DepartureDetails/DepartureDetails';
import AppHeader from '../../components/AppHeader';
import 'antd/dist/antd.css';
import './app.scss';
import { withDeparturesProvider } from '../../providers/withDeparturesProvider';
import DepartureTable from '../../components/DepartureTable/DepartureTable';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className="festival" />
      <DepartureDetails />
      <DepartureTable />
    </div>
  );
}

App.propTypes = {
  // intl: PropTypes.object.isRequired,
};

export default withUserConfigProvider(
  withIntlProvider(
    injectIntl(
      withDeparturesProvider(App),
    ),
  ),
);
