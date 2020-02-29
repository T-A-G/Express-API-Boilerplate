import mongoose from 'mongoose';
import generateApp from './server';

/**
* Function to start an express app
*/
const startApp = () => {
  // generate app
  const app = generateApp();

  // start server
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 App listening to ${PORT}....`);
    console.log('Press Ctrl+C to quit.');
  });
};

// connect to MongoDB
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO_DB, { useUnifiedTopology: true, useNewUrlParser: true });

mongoose.connection.once('open', startApp);

mongoose.connection.on('error', (err) => {
  console.error(`⚠️ MongoDB connection error: ${err}`);
  process.exit(-1);
});
