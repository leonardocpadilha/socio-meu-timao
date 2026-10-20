"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Torcedor_1 = __importDefault(require("../model/domain/Torcedor"));
const ServicoDeBilheteria_1 = __importDefault(require("../model/services/ServicoDeBilheteria"));
const PlanoFielDemocracia_1 = __importDefault(require("../model/plans/PlanoFielDemocracia"));
const PlanoFielInvasao_1 = __importDefault(require("../model/plans/PlanoFielInvasao"));
const PlanoFielMundial_1 = __importDefault(require("../model/plans/PlanoFielMundial"));
const MainScreen_1 = __importDefault(require("../view/MainScreen"));
class MainController {
    servicoDeTorcedor;
    servicoDeBilheteria;
    mainScreen;
    torcedorLogado = null;
    ultimoIngresso = null;
    constructor(servicoDeTorcedor, servicoDeBilheteria = new ServicoDeBilheteria_1.default()) {
        this.servicoDeTorcedor = servicoDeTorcedor;
        this.servicoDeBilheteria = servicoDeBilheteria;
        this.mainScreen = new MainScreen_1.default();
    }
    start() {
        while (true) {
            this.mainScreen.showBanner();
            const option = this.mainScreen.showMenu();
            switch (option) {
                case -1:
                    this.mainScreen.mostrarSaidaSistema();
                    return;
                case 0:
                    this.loginTorcedor();
                    break;
                case 1:
                    this.cadastrarTorcedor();
                    break;
                case 2:
                    this.mainScreen.mostrarConheca();
                    break;
                case 3:
                    this.mainScreen.mostrarPlanos();
                    break;
                default:
                    this.mainScreen.mostrarOpcaoInvalida();
                    break;
            }
        }
    }
    cadastrarTorcedor() {
        const dadosTorcedor = this.mainScreen.pedirDadosCadastro();
        const opcaoPlano = this.mainScreen.selecionarPlano();
        if (opcaoPlano === -1) {
            this.mainScreen.mostrarMensagem("Cadastro cancelado.");
            return;
        }
        const novoTorcedor = new Torcedor_1.default(dadosTorcedor.nome, dadosTorcedor.cpf, dadosTorcedor.senha);
        novoTorcedor.setDataNascimento(dadosTorcedor.dataNascimento);
        if (opcaoPlano === 0) {
            novoTorcedor.setPlano(new PlanoFielDemocracia_1.default());
        }
        else if (opcaoPlano === 1) {
            novoTorcedor.setPlano(new PlanoFielInvasao_1.default());
        }
        else if (opcaoPlano === 2) {
            novoTorcedor.setPlano(new PlanoFielMundial_1.default());
        }
        else {
            this.mainScreen.mostrarOpcaoInvalida();
            return;
        }
        this.servicoDeTorcedor.cadastrar(novoTorcedor);
        this.mainScreen.mostrarMensagem(`Cadastro realizado com sucesso! Plano ${novoTorcedor.getPlano()?.getNome()} ativado.`);
    }
    loginTorcedor() {
        const dadosLogin = this.mainScreen.solicitarDadosLogin();
        const torcedorEncontrado = this.servicoDeTorcedor.buscarPorCpf(dadosLogin.cpf);
        if (!torcedorEncontrado) {
            this.mainScreen.mostrarMensagem("CPF não encontrado. Por favor, cadastre-se primeiro.");
            return;
        }
        if (torcedorEncontrado.getSenha() !== dadosLogin.senha) {
            this.mainScreen.mostrarMensagem("Senha incorreta. Por favor, tente novamente.");
            return;
        }
        this.torcedorLogado = torcedorEncontrado;
        this.mainScreen.mostrarBoasVindas(torcedorEncontrado.getNome());
        this.menuTorcedorLogado();
    }
    menuTorcedorLogado() {
        while (this.torcedorLogado) {
            const option = this.mainScreen.showMenuLogado(this.torcedorLogado.getNome());
            switch (option) {
                case 0:
                    this.comprarIngresso();
                    break;
                case 1:
                    this.cancelarIngresso();
                    break;
                case 2:
                    this.verMeusDados();
                    break;
                case 3:
                    this.torcedorLogado = null;
                    this.ultimoIngresso = null;
                    this.mainScreen.mostrarMensagem("Você saiu da sua conta.");
                    return;
            }
        }
    }
    comprarIngresso() {
        if (!this.torcedorLogado)
            return;
        const partidas = this.servicoDeBilheteria.getPartidas();
        const indice = this.mainScreen.selecionarPartida(partidas);
        if (indice === -1) {
            return;
        }
        const partidaEscolhida = partidas[indice];
        const ingresso = this.servicoDeBilheteria.processarCompra(this.torcedorLogado, partidaEscolhida);
        if (ingresso) {
            this.ultimoIngresso = ingresso;
            this.mainScreen.mostrarSucessoCompra(partidaEscolhida, ingresso);
        }
        else {
            this.mainScreen.mostrarMensagem("Não foi possível comprar o ingresso (sem plano ativo, sem vagas ou torcedor inadimplente).");
        }
    }
    cancelarIngresso() {
        if (!this.ultimoIngresso) {
            this.mainScreen.mostrarMensagem("Você não possui nenhum ingresso comprado para cancelar.");
            return;
        }
        if (!this.ultimoIngresso.liberar()) {
            this.mainScreen.mostrarMensagem("Este ingresso já se encontra cancelado.");
            return;
        }
        this.mainScreen.mostrarSucessoCancelamento(this.ultimoIngresso);
    }
    verMeusDados() {
        if (this.torcedorLogado) {
            this.mainScreen.mostrarDadosTorcedor(this.torcedorLogado);
        }
    }
}
exports.default = MainController;
