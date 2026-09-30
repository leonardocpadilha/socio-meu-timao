"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MainController_1 = __importDefault(require("./controller/MainController"));
const TorcedorRepositoryJson_1 = require("./repository/TorcedorRepositoryJson");
const ServicoDeTorcedor_1 = __importDefault(require("./model/services/ServicoDeTorcedor"));
const repository = new TorcedorRepositoryJson_1.TorcedorRepositoryJson();
const servico = new ServicoDeTorcedor_1.default(repository);
const controller = new MainController_1.default(servico);
controller.start();
