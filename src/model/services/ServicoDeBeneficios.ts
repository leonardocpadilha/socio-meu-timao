import Torcedor from "../domain/Torcedor";

export default class ServicoDeBeneficios {

    public aplicarDescontoLoja(torcedor: Torcedor, valorProduto: number): number {
        if (!torcedor.getAdimplente()) {
            throw new Error("Torcedor inadimplente.");
        }

        return torcedor.getPlano().calcularDescontoLoja(valorProduto);
    }
}