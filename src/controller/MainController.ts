import Torcedor from "../model/domain/Torcedor";
import { ITorcedorRepository } from "../repository/ITorcedorRepository";
import MainScreen from "../view/MainScreen";

export default class MainController {
    private mainScreen: MainScreen;

    private torcedorLogado: Torcedor | null = null;

    constructor(private torcedorRepository: ITorcedorRepository) {
        this.mainScreen = new MainScreen();
    }

    public start(): void {
        while(true) {
            this.mainScreen.showBanner();
            const option = this.mainScreen.showMenu();
            switch(option) {
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

    private cadastrarTorcedor(): void {
        const dadosTorcedor = this.mainScreen.pedirDadosCadastro();
        const novoTorcedor = new Torcedor(dadosTorcedor.nome, dadosTorcedor.cpf, dadosTorcedor.senha);
        novoTorcedor.setDataNascimento(dadosTorcedor.dataNascimento);
        novoTorcedor.setEmail(dadosTorcedor.email);
        this.torcedorRepository.salvar(novoTorcedor);
        this.mainScreen.mostrarMensagem("Cadastro realizado com sucesso!");
    }

    private loginTorcedor(): void {
        const dadosLogin = this.mainScreen.solicitarDadosLogin();
        const torcedorEncontrado = this.torcedorRepository.buscarPorCpf(dadosLogin.cpf) as any;
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