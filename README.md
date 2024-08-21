# React Environment Detection

This project is a Proof of Concept (PoC) for detecting the environment in which a React application is running. It demonstrates various methods to identify the running environment, including Location/Hostname, Build-time flags, Configuration files, Custom Meta Tags, and whether the project was started with `npm start` or `npx serve`.

## Features

- **Location/Hostname Detection**: Determines the environment based on the current URL's hostname.
- **Build-time Flags (Webpack)**: Uses Webpack's `DefinePlugin` to inject environment variables at build time.
- **Configuration Files**: Loads different configuration files depending on the environment (development, production, staging).
- **Custom Meta Tags**: Reads environment information from custom meta tags in the `index.html`.
- **Started Method Detection**: Identifies whether the project was started with `npm start` or served as a production build with `npx serve`.

## Project Structure

```
react-env-detection/
│
├── src/
│   ├── config/
│   │   ├── development.js
│   │   ├── production.js
│   │   └── staging.js
│   ├── App.js
│   ├── index.js
│   └── ...
├── public/
│   └── index.html
├── webpack.config.js
├── .babelrc
├── .env
├── .env.production
├── .env.staging
└── package.json
```

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed. You can download Node.js from [here](https://nodejs.org/).

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd react-env-detection
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the Project

You can run the project in different environments using the following commands:

1. **Development Mode**:
   ```bash
   npm start
   ```
   - This will start the Webpack Dev Server in development mode with hot reloading.
   - The application will use the `.env` file for environment variables.

2. **Production Build**:
   ```bash
   npm run build
   npm run serve
   ```
   - This will create a production build of the application in the `dist/` directory and serve it using `npx serve`.
   - The application will use the `.env.production` file for environment variables.

3. **Staging Build**:
   ```bash
   npm run build:staging
   npm run serve
   ```
   - This will create a staging build of the application and serve it using `npx serve`.
   - The application will use the `.env.staging` file for environment variables.

### How It Works

- **Dynamic Import for Configuration**: The application utilizes dynamic imports to load configuration files based on the detected environment. This approach provides flexibility and allows for efficient loading of environment-specific settings.

```javascript
async function loadConfig() {
  const appEnvironment = window.appEnvironment; // Assuming the app sets this

  try {
    const configModule = await import(`./config/${appEnvironment}.js`);
    return configModule.default; // Assuming your config files export a default object
  } catch (error) {
    // Handle the case where the specific config file is not found
    console.error(`Config for environment '${appEnvironment}' not found. Loading default.`);
    const defaultConfigModule = await import('./config/default.js');
    return defaultConfigModule.default;
  }
}
```

1. **Location/Hostname Detection**: The application checks the hostname of the current URL to determine if it’s running in development, staging, or production.
2. **Build-time Flags**: Webpack's `DefinePlugin` is used to inject environment variables during the build process.
3. **Configuration Files**: Based on the environment, the application loads different configurations from the `config` directory.
4. **Custom Meta Tags**: The application reads the environment from a meta tag in the `index.html` file.
5. **Started Method Detection**: The application checks the `NODE_ENV` variable to determine if it was started in development or served as a production build.

### Troubleshooting

- **White Screen**: If the application loads a white screen, check the console for any errors. Ensure all dependencies are installed correctly, and the `dist/` directory contains the necessary files.
- **Environment Not Detected**: Ensure that the `.env`, `.env.production`, and `.env.staging` files are correctly set up with the appropriate environment variables.
