import userRoutes from './api/user';

const addRoutes = (app) => {
  app.use('/api/user', userRoutes);
};

export default addRoutes;
