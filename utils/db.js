// Importing the required module from 'mongodb' package
import { MongoClient } from 'mongodb';

// Defining default connection parameters
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}/`;

// Class def for managing MongoDB connection and operations
class DBClient {
  constructor() {
    // Initialize db property as null
    this.db = null;
    // Connect to MongoDB server using MongoClient
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
      if (error) console.log(error);
      this.db = client.db(database);
      this.db.createCollection('users');
      this.db.createCollection('files');
    });
  }

  // Method to check if the database connection is alive
  // Return true if this.db is not null, indicating the connection is alive
  isAlive() {
    return !!this.db;
  }

  // Method to retrieve the number of documents in the 'users' collection
  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  // Method to retrieve a user from the 'users' collection based on a query
  async getUser(query) {
    console.log('QUERY IN DB.JS', query);
    const user = await this.db.collection('users').findOne(query);
    console.log('GET USER IN DB.JS', user);
    return user; // Return the retrieved user
  }

  // Method to retrieve the number of documents in the 'files' collection
  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}
// Instantiate DBClient class
const dbClient = new DBClient();

export default dbClient;
