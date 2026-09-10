import PlanoFiel from "./PlanoFiel";

export default class PlanoLoucoDoBando extends PlanoFiel {
    
    public constructor() {
        super("Plano Louco do Bando", 110.00, ["75% de desconto na compra de ingressos", "25% de desconto na loja ShopTimão", "1 tour grátis por ano na Casa do Povo"]);
    }

    public calcularValorIngresso(precoBase: number): number {
        return precoBase * 0.25;
    }

    public calcularDescontoLoja(valorProduto: number): number {
        return valorProduto * 0.75;
    }
}
