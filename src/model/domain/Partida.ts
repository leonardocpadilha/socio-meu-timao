export default class Partida {
  private adversario: string;
  private precoBase: number;
  private ingressosDisponiveis: number;

  public constructor(adversario: string, precoBase: number, ingressosDisponiveis: number) {
    this.adversario = adversario;
    this.precoBase = precoBase;
    this.ingressosDisponiveis = ingressosDisponiveis;
  }

  public getAdversario(): string {
    return this.adversario;
  }

  public getPrecoBase(): number {
    return this.precoBase;
  }

  public getIngressosDisponiveis(): number {
    return this.ingressosDisponiveis;
  }

  public temVaga(): boolean {
    return this.ingressosDisponiveis > 0;
  }

  public reservarIngresso(quantidade: number = 1): void {
    if (quantidade <= 0) {
      return;
    }
    if (this.ingressosDisponiveis >= quantidade) {
      this.ingressosDisponiveis -= quantidade;
    }
  }

  public liberarIngresso(): void {
    this.ingressosDisponiveis++;
  }
}
