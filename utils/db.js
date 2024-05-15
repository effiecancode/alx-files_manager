import { MongoClient } from 'mongodb';

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${HOST}:${PORT}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
    this.client.connect().then(() => {
      this.db = this.client.db(`${DATABASE}`);
      // Listen for connection events
      this.client.on('connected', () => {
        console.log('Connected to MongoDB');
      });
      this.client.on('disconnected', () => {
        console.log('Disconnected from MongoDB');
      });
    }).catch((err) => {
      console.error(err);
    });
  }

  // Simplified version of isAlive method
  async isConnected() {
    try {
      // Attempt to perform a simple database operation
      await this.db.collection('dummy').findOne({});
      return true; // Connection is alive
    } catch (error) {
      console.error('Failed to connect:', error);
      return false; // Connection is not alive
    }
  }

  // Example methods for nbUsers and nbFiles
  async nbUsers() {
    const users = this.db.collection('users');
    const usersNum = await users.countDocuments();
    return usersNum;
  }

  async nbFiles() {
    const files = this.db.collection('files');
    const filesNum = await files.countDocuments();
    return filesNum;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
