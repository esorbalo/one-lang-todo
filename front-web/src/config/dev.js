

import baseConfig from './base';

const config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  urlServer: 'http://localhost:8080',
};

export default Object.freeze(Object.assign({}, baseConfig, config));
