import React, { useContext } from 'react';
import { IntlProvider } from 'react-intl';

import getTranslations from '../../../locales';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';

function withIntlProvider(Component) {
  function ComponentWithIntlProvider(props) {
    const { userConfig } = useContext(UserConfigContext);
    const locale = userConfig ? userConfig.locale.toLowerCase() : 'en';
    const translations = getTranslations(locale);
    return (
      <IntlProvider locale={locale} messages={translations} textComponent={React.Fragment}>
        <Component
          {...props}
        />
      </IntlProvider>
    );
  }

  return ComponentWithIntlProvider;
}

export default withIntlProvider;
