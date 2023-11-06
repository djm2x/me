const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        ENVIRONMENT: 'ME & ME',
        SomeAPIKey: JSON.stringify(process.env.SomeAPIKey),
        SomeOtherAPIKey: JSON.stringify(process.env.SomeOtherAPIKey)
      }
    }),
    new Dotenv({
      // path: './.env', // Path to your .env file
    }),
  ],
};

// import { EnvironmentPlugin } from 'webpack';
// const Dotenv = require('dotenv-webpack');
// module.exports = {
//   plugins: [new Dotenv()],
// };
