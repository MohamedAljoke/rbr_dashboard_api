import createServer from './connections/server';
import log from './utils/logger';

const port = process.env.PORT || 8000;

const app = createServer();

app.listen(port, async () => {
  log.info(`Application working on port: ${port}`);
  //TODO: connect to mongo
});
