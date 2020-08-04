const { port, env } = require('./config/config');
const app = require('./config/expressApp');
const mongo = require('./config/db');

// open mongoose connection
mongo.connect();

// listen to requests
app.listen(process.env.PORT || port, () => console.log(`server started on port ${process.env.PORT || port} (${env})`));