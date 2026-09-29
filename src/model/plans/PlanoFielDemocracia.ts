import PlanoFiel from "./PlanoFiel";

export default class PlanoFielDemocracia extends PlanoFiel {
  public constructor() {
    super("Plano Fiel Democracia", 20.0, [
      "25% de desconto na compra de ingressos",
      "10% de desconto na loja ShopTimão",
    ]);
  }

  public calcularValorIngresso(precoBase: number): number {
    return precoBase * 0.7;
  }

  public calcularDescontoLoja(valorProduto: number): number {
    return valorProduto * 0.9;
  }
}
