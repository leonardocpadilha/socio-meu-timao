import Torcedor from "../model/domain/Torcedor";
import Ingresso from "../model/domain/Ingresso";
import ServicoDeTorcedor from "../model/services/ServicoDeTorcedor";
import ServicoDeBilheteria from "../model/services/ServicoDeBilheteria";
import PlanoFielDemocracia from "../model/plans/PlanoFielDemocracia";
import PlanoFielInvasao from "../model/plans/PlanoFielInvasao";
import PlanoFielMundial from "../model/plans/PlanoFielMundial";
import MainScreen from "../view/MainScreen";

export default class MainController {
  private mainScreen: MainScreen;

  private torcedorLogado: Torcedor | null = null;
  private ultimoIngresso: Ingresso | null = null;

  constructor(
    private servicoDeTorcedor: ServicoDeTorcedor,
    private servicoDeBilheteria: ServicoDeBilheteria = new ServicoDeBilheteria(),
  ) {
    this.mainScreen = new MainScreen();
  }

  public start(): void {
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

  private cadastrarTorcedor(): void {
    const dadosTorcedor = this.mainScreen.pedirDadosCadastro();
    const opcaoPlano = this.mainScreen.selecionarPlano();
    if (opcaoPlano === -1) {
      this.mainScreen.mostrarMensagem("Cadastro cancelado.");
      return;
    }

    const novoTorcedor = new Torcedor(dadosTorcedor.nome, dadosTorcedor.cpf, dadosTorcedor.senha);
    novoTorcedor.setDataNascimento(dadosTorcedor.dataNascimento);
    if (opcaoPlano === 0) {
      novoTorcedor.setPlano(new PlanoFielDemocracia());
    } else if (opcaoPlano === 1) {
      novoTorcedor.setPlano(new PlanoFielInvasao());
    } else if (opcaoPlano === 2) {
      novoTorcedor.setPlano(new PlanoFielMundial());
    } else {
      this.mainScreen.mostrarOpcaoInvalida();
      return;
    }

    this.servicoDeTorcedor.cadastrar(novoTorcedor);
    this.mainScreen.mostrarMensagem(
      `Cadastro realizado com sucesso! Plano ${novoTorcedor.getPlano()?.getNome()} ativado.`,
    );
  }

  private loginTorcedor(): void {
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

  private menuTorcedorLogado(): void {
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

  private comprarIngresso(): void {
    if (!this.torcedorLogado) return;

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
    } else {
      this.mainScreen.mostrarMensagem(
        "Não foi possível comprar o ingresso (sem plano ativo, sem vagas ou torcedor inadimplente).",
      );
    }
  }

  private cancelarIngresso(): void {
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

  private verMeusDados(): void {
    if (this.torcedorLogado) {
      this.mainScreen.mostrarDadosTorcedor(this.torcedorLogado);
    }
  }
}
