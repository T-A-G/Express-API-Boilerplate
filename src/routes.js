import userRoutes from './api/user';

/**
* Function that adds all routes to app.
* @param {Express Application} app express server
*/
const addRoutes = (app) => {
  app.use('/api/user', userRoutes);
};

export default addRoutes;
