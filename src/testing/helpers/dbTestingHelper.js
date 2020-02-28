import mongoose from 'mongoose';
import * as _ from 'lodash';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

export const connect = async () => {
  const uri = await mongod.getConnectionString();
  await mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
};

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

export const clearDatabase = async () => {
  const { collections } = mongoose.connection;

  await Promise.all(
    _.map(collections, async (collection) => collection.deleteMany()),
  );
};
