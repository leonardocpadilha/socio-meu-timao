"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
class MainScreen {
    showBanner() {
        console.clear();
        console.log(`
┌────────────────────────────────────────────────┐
│                SÓCIO MEU TIMÃO                 │
│     Sua paixão pelo Corinthians começa aqui    │
└────────────────────────────────────────────────┘
        `);
        console.log("Bem-vindo Corinthiano(a)! Escolha uma das opções abaixo para começar:\n");
    }
    showMenu() {
        const options = ["Login", "Cadastre-se", "Conheça", "Planos"];
        return readline_sync_1.default.keyInSelect(options, "Por onde você quer iniciar? ", { cancel: "Sair" });
    }
    pedirDadosCadastro() {
        const nome = readline_sync_1.default.question("Digite seu nome: ");
        const cpf = readline_sync_1.default.question("Digite seu CPF: ");
        const dataNascimento = readline_sync_1.default.question("Digite sua data de nascimento (dd/mm/aaaa): ");
        const email = readline_sync_1.default.questionEMail("Digite seu e-mail: ");
        const senha = readline_sync_1.default.question("Crie sua senha: ", { hideEchoBack: true });
        return { nome, cpf, dataNascimento, email, senha };
    }
    mostrarMensagem(mensagem) {
        console.log(`\n${mensagem}`);
        readline_sync_1.default.keyInPause("Pressione qualquer tecla para continuar...");
    }
    solicitarDadosLogin() {
        const cpf = readline_sync_1.default.question("Digite seu CPF: ");
        const senha = readline_sync_1.default.question("Digite sua senha: ", { hideEchoBack: true });
        return { cpf, senha };
    }
}
exports.default = MainScreen;
