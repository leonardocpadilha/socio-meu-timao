import PlanoFiel from "./PlanoFiel";

export default class PlanoDoutor extends PlanoFiel {
    
    public constructor() {
        super("Plano Doutor", 45.00, ["50% de desconto na compra de ingressos", "20% de desconto na loja ShopTimão", "Frete reduzido na loja"]);
    }

    public calcularValorIngresso(precoBase: number): number {
        return precoBase * 0.50;
    }

    public calcularDescontoLoja(valorProduto: number): number {
        return valorProduto * 0.80;
    }
}
