import PlanoFiel from "../plans/PlanoFiel";

export default class Torcedor {
    private nome: string;
    private adimplente: boolean = true;
    private plano: PlanoFiel;

    public constructor(nome: string, plano: PlanoFiel, adimplente: boolean = true) {
        this.nome = nome;
        this.adimplente = adimplente;
        this.plano = plano;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getAdimplente(): boolean {
        return this.adimplente;
    }

    public setAdimplente(adimplente: boolean): void {
        this.adimplente = adimplente;
    }

    public getPlano(): PlanoFiel {
        return this.plano;
    }

    public setPlano(plano: PlanoFiel): void {
        this.plano = plano;
    }
}