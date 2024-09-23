const app = require('./app');
const SERVER_PORT = 3001;

init();

async function init() {
  try {
    app.listen(SERVER_PORT, () => {
      console.log('Express App Listening on Port ' + SERVER_PORT);
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
