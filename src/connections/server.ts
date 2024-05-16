import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

function createServer() {
  const app = express();
  app.use(
    cors({
      origin: process.env.front || 'http://localhost:3000',
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(helmet()); //for better security

  return app;
}

export default createServer;
