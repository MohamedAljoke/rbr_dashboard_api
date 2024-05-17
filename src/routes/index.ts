import { Response, Request, Router } from 'express';
import employeesRoutes from './employees_routes';

const api = Router();

api.get('version', (_: Request, res: Response) => {
  res.json({ version: '1.0.0' });
});

api.use('/employees', employeesRoutes);
export default api;
