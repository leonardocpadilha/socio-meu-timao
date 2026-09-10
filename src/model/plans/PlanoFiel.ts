export default abstract class PlanoFiel {
    protected nome: string;
    protected mensalidadeBase: number;
    protected beneficios: string[];
    
    public constructor(nome: string, mensalidadeBase: number, beneficios: string[]) {
        this.nome = nome;
        this.mensalidadeBase = mensalidadeBase;
        this.beneficios = beneficios;
    }

    public getNome(): string {
        return this.nome;
    }

    public getMensalidadeBase(): number {
        return this.mensalidadeBase;
    }

    public getBeneficios(): string[] {
        return this.beneficios;
    }

    public abstract calcularValorIngresso(precoBase: number): number;

    public abstract calcularDescontoLoja(valorProduto: number): number;
}