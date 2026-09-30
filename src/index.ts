import MainController from "./controller/MainController";
import { TorcedorRepositoryJson } from "./repository/TorcedorRepositoryJson";
import ServicoDeTorcedor from "./model/services/ServicoDeTorcedor";

const repository = new TorcedorRepositoryJson();

const servico = new ServicoDeTorcedor(repository);

const controller = new MainController(servico);

controller.start();
