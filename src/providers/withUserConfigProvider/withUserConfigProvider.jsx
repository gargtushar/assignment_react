import React, { useState } from 'react';

// inital context state
const initialState = {
  locale: 'en',
};

// Context
const UserConfigContext = React.createContext({ ...initialState });

// Hook
const useUserConfig = (
  initialUserConfig = { ...initialState },
) => {
  const [userConfig, setUserConfig] = useState(initialUserConfig);

  return {
    userConfig,
    setUserConfig,
  };
};

// Provider
function withUserConfigProvider(Component) {
  function UserConfigProvider(props) {
    const userConfig = useUserConfig();

    return (
      <UserConfigContext.Provider value={userConfig}>
        <Component
          {...props}
        />
      </UserConfigContext.Provider>
    );
  }

  return UserConfigProvider;
}

export { UserConfigContext, withUserConfigProvider };
