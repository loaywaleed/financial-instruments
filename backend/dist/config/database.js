"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongodb_1 = require("mongodb");
let client;
const connectToDatabase = async () => {
    if (!client) {
        try {
            client = new mongodb_1.MongoClient(process.env.MONGO_URI || 'mongodb://localhost:27017');
            await client.connect();
        }
        catch (error) {
            console.error('Failed to connect to the database', error);
            throw new Error('Database connection failed');
        }
    }
    return client.db('myDatabase');
};
exports.connectToDatabase = connectToDatabase;
