"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MainController_1 = __importDefault(require("./controller/MainController"));
const TorcedorRepositoryJSON_1 = require("./repository/TorcedorRepositoryJSON");
const repositoryJSON = new TorcedorRepositoryJSON_1.TorcedorRepositoryJSON();
const controller = new MainController_1.default(repositoryJSON);
controller.start();
