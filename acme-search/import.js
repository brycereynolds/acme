const { upsertRecords } = require('./service.js')
const formatter = require('./formatter.js');

const artifacts = formatter();
upsertRecords(artifacts);
