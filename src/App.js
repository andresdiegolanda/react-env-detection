import React, { useState, useEffect } from 'react';

// Load configuration based on process.env.REACT_APP_ENVIRONMENT using a switch statement
let config;

switch (process.env.REACT_APP_ENVIRONMENT) {
  case 'production':
    config = require('./config/production').default;
    break;
  case 'staging':
    config = require('./config/staging').default;
    break;
  default:
    config = require('./config/development').default;
}

// Detect environment using window location
const getWindowEnvironment = () => {
  const hostname = window.location.hostname;

  if (hostname.includes('localhost')) {
    return 'development from window location';
  } else if (hostname.includes('staging.yourapp.com')) {
    return 'staging from window location';
  } else if (hostname.includes('yourapp.com')) {
    return 'production from window location';
  } else {
    return 'unknown from window location';
  }
};

// Detect environment using meta tag
const metaEnvironment = document.querySelector('meta[name="environment"]').getAttribute('content');

// Detect environment using build-time flag
const buildEnvironment = process.env.BUILD_ENV || 'development';

// Detect environment using NODE_ENV
const nodeEnvironment = process.env.NODE_ENV + ' from process';

const App = () => {
  const [dynamicConfig, setDynamicConfig] = useState(null);

  useEffect(() => {
    const loadDynamicConfig = async () => {
      const appEnvironment = window.appEnvironment || 'development'; // Fallback to 'development' if not set

      try {
        // Dynamically import the config file based on the environment
        const configModule = await import(`./config/${appEnvironment}`);
        setDynamicConfig(configModule.default);
      } catch (error) {
        // Handle the case where the specific config file is not found
        console.error(`Config for environment '${appEnvironment}' not found. Loading default.`);
        const defaultConfigModule = await import('./config/default');
        setDynamicConfig(defaultConfigModule.default);
      }
    };

    loadDynamicConfig();
  }, []);

  return (
    <div>
      <h1>React Environment Detection</h1>
      <p><strong>REACT_APP_ENVIRONMENT:</strong> {process.env.REACT_APP_ENVIRONMENT}</p>
      <p><strong>Window Location Environment:</strong> {getWindowEnvironment()}</p>
      <p><strong>Meta Tag Environment:</strong> {metaEnvironment}</p>
      <p><strong>Build-time Flag Environment:</strong> {buildEnvironment}</p>
      <p><strong>NODE_ENV Environment:</strong> {nodeEnvironment}</p>
      <p><strong>API URL from Config:</strong> {config.apiUrl} from json file</p>
      <p><strong>Feature Flag from Config:</strong> {config.featureFlag ? 'Enabled' : 'Disabled'} from json file</p>

      {dynamicConfig ? (
        <>
          <h2>Dynamic Configuration</h2>
          <p><strong>API URL from Dynamic Config:</strong> {dynamicConfig.apiUrl}</p>
          <p><strong>Feature Flag from Dynamic Config:</strong> {dynamicConfig.featureFlag ? 'Enabled' : 'Disabled'}</p>
        </>
      ) : (
        <p>Loading dynamic configuration...</p>
      )}
    </div>
  );
};

export default App;

