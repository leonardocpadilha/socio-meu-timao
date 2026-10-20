"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Torcedor_1 = __importDefault(require("../model/domain/Torcedor"));
const StatusIngresso_1 = require("../enum/StatusIngresso");
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
        const novoTorcedor = new Torcedor_1.default(dadosTorcedor.nome, dadosTorcedor.cpf, dadosTorcedor.senha);
        novoTorcedor.setDataNascimento(dadosTorcedor.dataNascimento);
        novoTorcedor.setEmail(dadosTorcedor.email);
        this.servicoDeTorcedor.cadastrar(novoTorcedor);
        this.mainScreen.mostrarMensagem("Cadastro realizado com sucesso!");
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
                    this.escolherPlano();
                    break;
                case 1:
                    this.comprarIngresso();
                    break;
                case 2:
                    this.cancelarIngresso();
                    break;
                case 3:
                    this.verMeusDados();
                    break;
                case 4:
                    this.torcedorLogado = null;
                    this.ultimoIngresso = null;
                    this.mainScreen.mostrarMensagem("Você saiu da sua conta.");
                    return;
            }
        }
    }
    escolherPlano() {
        if (!this.torcedorLogado)
            return;
        const opcao = this.mainScreen.selecionarPlano();
        if (opcao === 0) {
            this.torcedorLogado.setPlano(new PlanoFielDemocracia_1.default());
        }
        else if (opcao === 1) {
            this.torcedorLogado.setPlano(new PlanoFielInvasao_1.default());
        }
        else if (opcao === 2) {
            this.torcedorLogado.setPlano(new PlanoFielMundial_1.default());
        }
        else {
            return;
        }
        const plano = this.torcedorLogado.getPlano();
        if (plano) {
            this.mainScreen.mostrarSucessoPlano(plano.getNome());
        }
    }
    comprarIngresso() {
        if (!this.torcedorLogado)
            return;
        if (!this.torcedorLogado.getPlano()) {
            this.mainScreen.mostrarMensagem("Você ainda não possui um plano ativo! Escolha um plano primeiro para ter desconto nos ingressos.");
            return;
        }
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
            this.mainScreen.mostrarMensagem("Não foi possível comprar o ingresso (sem vagas ou torcedor inadimplente).");
        }
    }
    cancelarIngresso() {
        if (!this.ultimoIngresso) {
            this.mainScreen.mostrarMensagem("Você não possui nenhum ingresso comprado para cancelar.");
            return;
        }
        if (this.ultimoIngresso.getStatus() === StatusIngresso_1.StatusIngresso.CANCELADO) {
            this.mainScreen.mostrarMensagem("Este ingresso já se encontra cancelado.");
            return;
        }
        this.ultimoIngresso.liberar();
        this.mainScreen.mostrarSucessoCancelamento(this.ultimoIngresso);
    }
    verMeusDados() {
        if (this.torcedorLogado) {
            this.mainScreen.mostrarDadosTorcedor(this.torcedorLogado);
        }
    }
}
exports.default = MainController;
