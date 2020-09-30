import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Select from '../Select';
import translations from '../../common/constants/translations';
import { UserConfigContext } from '../../providers/withUserConfigProvider';
import './appHeader.scss';

function AppHeader(props) {
  const { userConfig, setUserConfig } = useContext(UserConfigContext);

  const handleChangeLocale = (locale) => {
    setUserConfig({
      ...userConfig,
      locale,
    });
  };

  return (
    <div className="app-header-wrap">
      <span className="heading">{props.intl.formatMessage({ id: 'Book your one way trip to fun' })}</span>
      <Select defaultValue="en" onChange={handleChangeLocale} title="lang">
        {Object.keys(translations).map((translation) => (
          <Select.Option
            key={translation}
            value={translations[translation]}
          >
            {translation}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}

AppHeader.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(AppHeader);
