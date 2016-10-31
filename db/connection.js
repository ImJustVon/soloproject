const pg = require('pg');

var config = {
  database: 'solo_project',
};

var pool = new pg.Pool(config);

module.exports = pool;
