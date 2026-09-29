import PlanoFiel from "./PlanoFiel";

export default class PlanoFielInvasao extends PlanoFiel {
  public constructor() {
    super("Plano Fiel Invasao", 45.0, [
      "50% de desconto na compra de ingressos",
      "20% de desconto na loja ShopTimão",
      "Frete reduzido na loja",
    ]);
  }

  public calcularValorIngresso(precoBase: number): number {
    return precoBase * 0.5;
  }

  public calcularDescontoLoja(valorProduto: number): number {
    return valorProduto * 0.8;
  }
}
