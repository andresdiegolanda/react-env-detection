const configMap = {
    development: {
      apiUrl: 'http://localhost:3000/api',
      featureFlag: true,
    },
    staging: {
      apiUrl: 'https://staging.yourapp.com/api',
      featureFlag: true,
    },
    production: {
      apiUrl: 'https://api.yourapp.com',
      featureFlag: false,
    },
    default: {
      apiUrl: 'http://localhost:3000/api', // Fallback URL as default
      featureFlag: false,
    },
  };
  
  export default configMap;
  