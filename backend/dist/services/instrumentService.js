"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllInstrumentTypes = getAllInstrumentTypes;
exports.getAllInstruments = getAllInstruments;
const database_1 = require("../config/database");
const apiErrorHandler_1 = require("../utils/apiErrorHandler");
const INSTRUMENT_TYPES = {
    Stock: 'Stock',
    Crypto: 'Crypto',
    Forex: 'Forex',
    Commodity: 'Commodity',
};
async function getAllInstrumentTypes() {
    try {
        const db = await (0, database_1.connectToDatabase)();
        return db.collection('instrument').find({}).toArray();
    }
    catch (error) {
        throw new apiErrorHandler_1.ApiError('Failed to fetch data', 400);
    }
}
async function getAllInstruments() {
    return;
}
