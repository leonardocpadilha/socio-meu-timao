import Torcedor from "../domain/Torcedor";

export default class ServicoDeBeneficios {
  public aplicarDescontoLoja(torcedor: Torcedor, valorProduto: number): number {
    if (!torcedor.getAdimplente()) {
      return valorProduto;
    }

    const plano = torcedor.getPlano();
    if (!plano) {
      return valorProduto;
    }

    return plano.calcularDescontoLoja(valorProduto);
  }
}
