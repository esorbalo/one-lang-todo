import baseConfig from './base';
import envConfig from './env.current.js';

export default Object.freeze(Object.assign({}, baseConfig, envConfig));
