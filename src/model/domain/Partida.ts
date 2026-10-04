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

  public reservarIngresso(quantidade?: number): void;
  public reservarIngresso(partida: string, quantidade?: number): void;
  public reservarIngresso(param1?: number | string, param2?: number): void {
    let quantidade: number = 1;
    if (typeof param1 === "number") {
      quantidade = param1;
    } else if (typeof param2 === "string") {
      if (param1 !== this.adversario) {
        return;
      }
      if (typeof param2 === "number") {
        quantidade = param2;
      }
    }
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
