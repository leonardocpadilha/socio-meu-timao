"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Torcedor_1 = __importDefault(require("../model/domain/Torcedor"));
const MainScreen_1 = __importDefault(require("../view/MainScreen"));
class MainController {
    torcedorRepository;
    mainScreen;
    torcedorLogado = null;
    constructor(torcedorRepository) {
        this.torcedorRepository = torcedorRepository;
        this.mainScreen = new MainScreen_1.default();
    }
    start() {
        while (true) {
            this.mainScreen.showBanner();
            const option = this.mainScreen.showMenu();
            switch (option) {
                case -1:
                    console.log("Saindo do Sócio Meu Timão...");
                    return;
                case 0:
                    this.loginTorcedor();
                    break;
                case 1:
                    this.cadastrarTorcedor();
                    break;
                case 2:
                    break;
                case 3:
                    break;
                default:
                    console.log("Opção inválida. Por favor, tente novamente.");
                    break;
            }
        }
    }
    cadastrarTorcedor() {
        const dadosTorcedor = this.mainScreen.pedirDadosCadastro();
        const novoTorcedor = new Torcedor_1.default(dadosTorcedor.nome, dadosTorcedor.cpf, dadosTorcedor.senha);
        novoTorcedor.setDataNascimento(dadosTorcedor.dataNascimento);
        novoTorcedor.setEmail(dadosTorcedor.email);
        this.torcedorRepository.salvar(novoTorcedor);
        this.mainScreen.mostrarMensagem("Cadastro realizado com sucesso!");
    }
    loginTorcedor() {
        const dadosLogin = this.mainScreen.solicitarDadosLogin();
        const torcedorEncontrado = this.torcedorRepository.buscarPorCpf(dadosLogin.cpf);
        if (!torcedorEncontrado) {
            this.mainScreen.mostrarMensagem("CPF não encontrado. Por favor, cadastre-se primeiro.");
            return;
        }
        if (torcedorEncontrado.senha !== dadosLogin.senha) {
            this.mainScreen.mostrarMensagem("Senha incorreta. Por favor, tente novamente.");
            return;
        }
        this.torcedorLogado = torcedorEncontrado;
        this.mainScreen.mostrarMensagem(`Bem-vindo, ${torcedorEncontrado.nome}!`);
    }
}
exports.default = MainController;
