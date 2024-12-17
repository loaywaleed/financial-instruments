"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetadataBySymbol = exports.deleteData = exports.getmetaData = exports.loadData = void 0;
const dataService_1 = require("../services/dataService");
const metadata_json_1 = __importDefault(require("../data/metadata.json"));
const exchange_json_1 = __importDefault(require("../data/exchange.json"));
const candle_json_1 = __importDefault(require("../data/candle.json"));
const instrumentTypes_json_1 = __importDefault(require("../data/instrumentTypes.json"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.loadData = (0, express_async_handler_1.default)(async (_req, res) => {
    const result = await (0, dataService_1.insertDataService)(metadata_json_1.default, exchange_json_1.default, candle_json_1.default, instrumentTypes_json_1.default);
    res.status(201).json({ message: 'Data loaded successfully', result });
});
exports.getmetaData = (0, express_async_handler_1.default)(async (_req, res) => {
    const result = await (0, dataService_1.fetchMetadataService)();
    res.status(200).json(result);
});
exports.deleteData = (0, express_async_handler_1.default)(async (_req, res) => {
    await (0, dataService_1.DeleteAllDataService)();
    res.status(204).end();
});
exports.getMetadataBySymbol = (0, express_async_handler_1.default)(async (req, res) => {
    const result = await (0, dataService_1.fetchMetadataBySymbol)(req.params.symbol);
    res.status(200).json(result);
});
