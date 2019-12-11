console.log('Reading Configs');

switch (process.env.NODE_ENV) {
  case 'production': {
    module.exports = require('./Prod');
    break;
  }
  default: {
    module.exports = require('./Dev');
    break;
  }
}
