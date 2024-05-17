import { Response, Request, Router } from 'express';
import employeesRoutes from './employees_routes';

const api = Router();

export const appVersion = '1.0.0';
api.get('/version', (_: Request, res: Response) => {
  return res.status(200).json({ version: appVersion });
});

api.use('/employees', employeesRoutes);
export default api;
