"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertDataService = insertDataService;
exports.fetchMetadataService = fetchMetadataService;
exports.fetchExchangeService = fetchExchangeService;
exports.fetchCandleService = fetchCandleService;
exports.DeleteAllDataService = DeleteAllDataService;
exports.fetchMetadataBySymbol = fetchMetadataBySymbol;
const database_1 = require("../config/database");
const apiErrorHandler_1 = require("../utils/apiErrorHandler");
async function insertDataService(metadata_raw, exchange_raw, candle_raw, instrumentTypes) {
    try {
        const db = await (0, database_1.connectToDatabase)();
        const metadata = metadata_raw.hits.hits.map((hit) => hit._source);
        const exchange = exchange_raw.hits.hits.map((hit) => hit._source);
        const candle = candle_raw.hits.hits.map((hit) => hit._source);
        const metadataCollection = db.collection('metadata');
        const exchangeCollection = db.collection('exchange');
        const candleCollection = db.collection('candle');
        await metadataCollection.insertMany(Array.isArray(metadata) ? metadata : [metadata]);
        await exchangeCollection.insertMany(Array.isArray(exchange) ? exchange : [exchange]);
        await candleCollection.insertMany(Array.isArray(candle) ? candle : [candle]);
        return 'Data loaded successfully';
    }
    catch (error) {
        throw new apiErrorHandler_1.ApiError('Failed to insert data', 400);
    }
}
async function fetchMetadataService() {
    try {
        const db = await (0, database_1.connectToDatabase)();
        return db.collection('metadata').find({}).toArray();
    }
    catch (error) {
        throw new apiErrorHandler_1.ApiError('Failed to fetch data', 400);
    }
}
async function fetchExchangeService() {
    try {
        const db = await (0, database_1.connectToDatabase)();
        return db.collection('exchange').find({}).toArray();
    }
    catch (error) {
        throw new apiErrorHandler_1.ApiError('Failed to fetch data', 400);
    }
}
async function fetchCandleService() {
    try {
        const db = await (0, database_1.connectToDatabase)();
        return db.collection('candle').find({}).toArray();
    }
    catch (error) {
        throw new apiErrorHandler_1.ApiError('Failed to fetch data', 400);
    }
}
async function DeleteAllDataService() {
    try {
        const db = await (0, database_1.connectToDatabase)();
        db.collection('metadata').deleteMany({});
        db.collection('exchange').deleteMany({});
        db.collection('candle').deleteMany({});
        return 'Data deleted successfully';
    }
    catch (error) {
        throw new apiErrorHandler_1.ApiError('Failed to delete data', 400);
    }
}
async function fetchMetadataBySymbol(symbol) {
    try {
        const db = await (0, database_1.connectToDatabase)();
        const result = db.collection('data').findOne({ symbol });
        if (!result) {
            throw new apiErrorHandler_1.ApiError('Data not found', 404);
        }
        return result;
    }
    catch (error) {
        throw new apiErrorHandler_1.ApiError('Failed to fetch data', 400);
    }
}
