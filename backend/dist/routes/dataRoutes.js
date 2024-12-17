"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataController_1 = require("../controllers/dataController");
const dataRoutes = express_1.default.Router();
dataRoutes.post('/load', dataController_1.loadData);
dataRoutes.get('/', dataController_1.getmetaData);
dataRoutes.delete('/', dataController_1.deleteData);
exports.default = dataRoutes;
