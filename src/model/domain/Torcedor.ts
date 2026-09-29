import PlanoFiel from "../plans/PlanoFiel";

export default class Torcedor {
    private id: string;
    private nome: string;
    private cpf: string;
    private data_nascimento: string;
    private email: string;
    private senha: string;
    private adimplente: boolean = true;
    private plano: PlanoFiel | null;

    public constructor(nome: string, cpf: string, senha: string) {
        this.id = Date.now().toString(); 
        this.nome = nome;
        this.cpf = cpf;
        this.senha = senha;
        this.data_nascimento = "";
        this.email = "";
        this.adimplente = true;
        this.plano = null;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
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
        return this.data_nascimento;
    }

    public setDataNascimento(data_nascimento: string): void {
        this.data_nascimento = data_nascimento;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
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

    public setPlano(plano: PlanoFiel): void {
        this.plano = plano;
    }
}