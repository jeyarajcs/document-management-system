const { port, env } = require('./config/config');
const app = require('./config/expressApp');
const mongo = require('./config/db');

// open mongoose connection
mongo.connect();

// listen to requests
app.listen(port, () => console.log(`server started on port ${port} (${env})`));