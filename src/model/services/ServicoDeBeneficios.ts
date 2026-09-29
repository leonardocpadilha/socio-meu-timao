import Torcedor from "../domain/Torcedor";

export default class ServicoDeBeneficios {

    public aplicarDescontoLoja(torcedor: Torcedor, valorProduto: number): number {
        if (!torcedor.getAdimplente()) {
            return valorProduto;
        }

        return torcedor.getPlano().calcularDescontoLoja(valorProduto);
    }
}