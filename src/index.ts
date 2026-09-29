import MainController from "./controller/MainController";
import { TorcedorRepositoryJSON } from "./repository/TorcedorRepositoryJSON";

const repositoryJSON = new TorcedorRepositoryJSON();

const controller = new MainController(repositoryJSON);

controller.start();
