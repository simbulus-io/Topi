import { LoggerHelper, LogLevel } from './helpers/logger_helper';
import 'source-map-support/register';

'use strict';


const { execSync } = require('child_process');
const NODE_VERSION = execSync('node -v');

const BANNER = `

88888888888 .d88888b.  8888888b. 8888888
    888    d88P" "Y88b 888   Y88b  888
    888    888     888 888    888  888
    888    888     888 888   d88P  888
    888    888     888 8888888P"   888
    888    888     888 888         888
    888    Y88b. .d88P 888         888
    888     "Y88888P"  888       8888888

    v1.0.0

 running on nodejs: ${NODE_VERSION}
`;

const log_level = LogLevel.INFO;
const log = new LoggerHelper(log_level).log;
log.info(BANNER);
log.info('firing up...');

const http = require('http');
http.globalAgent.maxSockets = 5;
let server: any;
try {
  server = require('./server');
} catch (e) {
  log.error(e);
}

const s = server.Server.bootstrap();
// block on setup
s.setup().then(() => {
  log.info('topi setup complete...');
  // game on
  const app = s.app;
  const http_port = app.get('config').express.express_port;
  log.info(`Creating app on port ${http_port}`);

  const http_server = http.createServer(app);
  http_server.listen(http_port);
  http_server.on('listening', on_listening);
  function on_listening() {
    const addr = http_server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    log.info(bind);
  }
  // top level error handlers
  process.on('uncaughtException', (err) => {
    log.error(`Uncaught exception: ${err.stack || err}`);
  });
  process.on('unhandledRejection', (reason, p) => {
    const r = (reason as any);
    log.error(`Unhandled Rejection at: Promise ${p}, ${r.stack || r}`);
  });
});


