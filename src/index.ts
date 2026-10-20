import MainController from "./controller/MainController";
import { TorcedorRepositoryJson } from "./repository/TorcedorRepositoryJson";
import ServicoDeTorcedor from "./model/services/ServicoDeTorcedor";
import ServicoDeBilheteria from "./model/services/ServicoDeBilheteria";

const repository = new TorcedorRepositoryJson();

const servico = new ServicoDeTorcedor(repository);

const bilheteria = new ServicoDeBilheteria();

const controller = new MainController(servico, bilheteria);

controller.start();
