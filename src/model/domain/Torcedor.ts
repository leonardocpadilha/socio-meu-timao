import PlanoFiel from "../plans/PlanoFiel";

export default class Torcedor {
  private nome: string;
  private cpf: string;
  private dataNascimento: string;
  private senha: string;
  private adimplente: boolean;
  private plano: PlanoFiel | null;

  public constructor(nome: string, cpf: string, senha: string) {
    this.nome = nome;
    this.cpf = cpf;
    this.senha = senha;
    this.dataNascimento = "";
    this.adimplente = true;
    this.plano = null;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public getCpf(): string {
    return this.cpf;
  }

  public setCpf(cpf: string): void {
    this.cpf = cpf;
  }

  public getSenha(): string {
    return this.senha;
  }

  public setSenha(senha: string): void {
    this.senha = senha;
  }

  public getDataNascimento(): string {
    return this.dataNascimento;
  }

  public setDataNascimento(dataNascimento: string): void {
    this.dataNascimento = dataNascimento;
  }

  public getAdimplente(): boolean {
    return this.adimplente;
  }

  public setAdimplente(adimplente: boolean): void {
    this.adimplente = adimplente;
  }

  public getPlano(): PlanoFiel | null {
    return this.plano;
  }

  public setPlano(plano: PlanoFiel | null): void {
    this.plano = plano;
  }
}
