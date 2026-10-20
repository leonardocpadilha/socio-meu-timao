import readline from "readline-sync";
import Partida from "../model/domain/Partida";
import Ingresso from "../model/domain/Ingresso";
import Torcedor from "../model/domain/Torcedor";

export default class MainScreen {
  public showBanner(): void {
    console.clear();
    console.log(`
┌────────────────────────────────────────────────────────┐
│                    SÓCIO MEU TIMÃO                     │
│         Sua paixão pelo Corinthians começa aqui        │
└────────────────────────────────────────────────────────┘
        `);
    console.log("Bem-vindo Corinthiano(a)! Escolha uma das opções abaixo para começar:\n");
  }

  public showMenu(): number {
    const options = ["Login", "Cadastre-se", "Conheça", "Planos"];

    return readline.keyInSelect(options, "Por onde você quer iniciar? ", { cancel: "Sair" });
  }

  public pedirDadosCadastro(): {
    nome: string;
    cpf: string;
    dataNascimento: string;
    email: string;
    senha: string;
  } {
    const nome = readline.question("Digite seu nome: ");
    const cpf = readline.question("Digite seu CPF: ");
    const dataNascimento = readline.question("Digite sua data de nascimento (dd/mm/aaaa): ");
    const email = readline.questionEMail("Digite seu e-mail: ");
    const senha = readline.question("Crie sua senha: ", { hideEchoBack: true });

    return { nome, cpf, dataNascimento, email, senha };
  }

  public mostrarMensagem(mensagem: string): void {
    console.log(`\n${mensagem}`);
    readline.keyInPause("Pressione qualquer tecla para continuar...");
  }

  public solicitarDadosLogin(): { cpf: string; senha: string } {
    const cpf = readline.question("Digite seu CPF: ");
    const senha = readline.question("Digite sua senha: ", { hideEchoBack: true });

    return { cpf, senha };
  }

  public mostrarConheca(): void {
    console.clear();
    console.log(`
┌────────────────────────────────────────────────────────┐
│          CONHEÇA O PROGRAMA SÓCIO MEU TIMÃO            │
└────────────────────────────────────────────────────────┘
O Programa Sócio Meu Timão é a maneira perfeita de demonstrar 
seu amor pelo Corinthians e apoiar o clube de forma exclusiva. 

Como funciona:
1. Cadastre-se no sistema.
2. Escolha o plano que melhor se adapta a você.
3. Use seus descontos e reserve ingressos para os jogos 
do Corinthians.
`);
    readline.keyInPause("Pressione qualquer tecla para voltar ao menu...");
  }

  public mostrarPlanos(): void {
    console.clear();
    console.log(`
┌────────────────────────────────────────────────────────┐
│                   PLANOS SÓCIO MEU TIMÃO               │
└────────────────────────────────────────────────────────┘
Existe um plano para cada tipo de fiel torcedor. Escolha o
                que melhor se adapta a você!

┌────────────────────────────────────────────────────────┐
│                     FIEL DEMOCRACIA                    │
|   Para o torcedor que vive o clube intensamente no     |
|           dia a dia com economia garantida             |
|                                                        |
|                       BENEFÍCIOS                       |
|         25% de desconto na compra de ingressos         |
|                           +                            |
|            10% de desconto na loja ShopTimão           |
|                                                        |
|========================================================|
|                      R$ 20,00/mês                      |
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                      FIEL INVASÃO                      │
|   Para quem não perde um jogo e quer mais vantagens    |
|              na hora de vestir a camisa                |
|                                                        |
|                       BENEFÍCIOS                       |
|         50% de desconto na compra de ingressos         |
|                           +                            |
|            20% de desconto na loja ShopTimão           |
|                           +                            |
|                  Frete reduzido na loja                |
|                                                        |
|========================================================|
|                      R$ 45,00/mês                      |
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                      FIEL MUNDIAL                      │
|  A experiência definitiva para o corinthiano de alma   |
|          que quer viver o clube por inteiro            |
|                                                        |
|                       BENEFÍCIOS                       |
|         75% de desconto na compra de ingressos         |
|                           +                            |
|            25% de desconto na loja ShopTimão           |
|                           +                            |
|          1 tour grátis por ano na Casa do Povo         |
|                                                        |
|========================================================|
|                     R$ 110,00/mês                      |
└────────────────────────────────────────────────────────┘
`);
    readline.keyInPause("Pressione qualquer tecla para voltar ao menu...");
  }

  public showMenuLogado(nomeTorcedor: string): number {
    console.clear();
    console.log(`\nOlá, ${nomeTorcedor}! Área do Sócio.`);
    const options = [
      "Escolher / Alterar Plano",
      "Comprar Ingresso",
      "Cancelar Ingresso",
      "Ver Meus Dados",
      "Sair da Conta",
    ];
    return readline.keyInSelect(options, "O que deseja fazer? ", { cancel: false });
  }

  public selecionarPlano(): number {
    console.clear();
    console.log(`
┌────────────────────────────────────────────────────────┐
│                    ESCOLHA O SEU PLANO                 │
└────────────────────────────────────────────────────────┘
`);
    const options = [
      "Fiel Democracia (R$ 20,00/mês - 25% de desconto)",
      "Fiel Invasão (R$ 45,00/mês - 50% de desconto)",
      "Fiel Mundial (R$ 110,00/mês - 75% de desconto)",
    ];
    return readline.keyInSelect(options, "Qual plano deseja assinar? ", { cancel: "Voltar" });
  }

  public selecionarPartida(partidas: Partida[]): number {
    console.clear();
    console.log("=== PARTIDAS DISPONÍVEIS ===");
    const options = partidas.map(
      (partida) =>
        `Corinthians x ${partida.getAdversario()} | Preço: R$ ${partida.getPrecoBase().toFixed(2)} | Vagas: ${partida.getIngressosDisponiveis()}`,
    );
    return readline.keyInSelect(options, "Selecione a partida desejada: ", { cancel: "Voltar" });
  }

  public mostrarBoasVindas(nome: string): void {
    this.mostrarMensagem(`Bem-vindo(a), ${nome}!`);
  }

  public mostrarSucessoPlano(nomePlano: string): void {
    this.mostrarMensagem(`Plano ${nomePlano} ativado com sucesso!`);
  }

  public mostrarSucessoCompra(partida: Partida, ingresso: Ingresso): void {
    console.clear();
    console.log(`
┌────────────────────────────────────────────────────────┐
│              COMPRA REALIZADA COM SUCESSO              │
└────────────────────────────────────────────────────────┘
Partida:             Corinthians x ${partida.getAdversario()}
Valor com desconto:  R$ ${ingresso.getValorPago().toFixed(2)}
Status do Ingresso:  ${ingresso.getStatus()}
Ingressos restantes: ${partida.getIngressosDisponiveis()}
    `);
    readline.keyInPause("Pressione qualquer tecla para continuar...");
  }

  public mostrarSucessoCancelamento(ingresso: Ingresso): void {
    console.clear();
    console.log(`
┌────────────────────────────────────────────────────────┐
│             INGRESSO CANCELADO COM SUCESSO             │
└────────────────────────────────────────────────────────┘
Partida:             Corinthians x ${ingresso.getPartida().getAdversario()}
Status do Ingresso:  ${ingresso.getStatus()}
Valor reembolsado:   R$ ${ingresso.getValorPago().toFixed(2)}
A vaga foi devolvida para a partida!
    `);
    readline.keyInPause("Pressione qualquer tecla para continuar...");
  }

  public mostrarDadosTorcedor(torcedor: Torcedor): void {
    const plano = torcedor.getPlano();
    const nomePlano = plano ? plano.getNome() : "Nenhum plano ativo";

    console.clear();
    console.log(`
┌────────────────────────────────────────────────────────┐
│                    DADOS DO SÓCIO                      │
└────────────────────────────────────────────────────────┘
Nome:                ${torcedor.getNome()}
CPF:                 ${torcedor.getCpf()}
E-mail:              ${torcedor.getEmail()}
Data de Nascimento:  ${torcedor.getDataNascimento()}
Situação:            ${torcedor.getAdimplente() ? "Adimplente" : "Inadimplente"}
Plano Atual:         ${nomePlano}
    `);
    readline.keyInPause("Pressione qualquer tecla para continuar...");
  }

  public mostrarSaidaSistema(): void {
    console.log("\nSaindo do Sócio Meu Timão... Vai Corinthians!");
  }

  public mostrarOpcaoInvalida(): void {
    console.log("\nOpção inválida. Por favor, tente novamente.");
    readline.keyInPause("Pressione qualquer tecla para continuar...");
  }
}
