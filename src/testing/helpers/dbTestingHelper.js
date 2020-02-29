import mongoose from 'mongoose';
import * as _ from 'lodash';
import { MongoMemoryServer } from 'mongodb-memory-server';

// in memory mongoDB server used for testing
const mongod = new MongoMemoryServer();

/**
* Function connects to a memory test mongoDB instance
*/
export const connect = async () => {
  const uri = await mongod.getConnectionString();
  await mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
};

/**
* Function that closes the in memory test mongoDB instance
*/
export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};


/**
* Function that flushes all data from the the in memory test mongoDB instance
*/
export const clearDatabase = async () => {
  const { collections } = mongoose.connection;

  // delete all collections in mongoDB instance 
  await Promise.all(
    _.map(collections, async (collection) => collection.deleteMany()),
  );
};
