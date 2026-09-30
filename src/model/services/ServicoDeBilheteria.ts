import Torcedor from "../domain/Torcedor";
import Partida from "../domain/Partida";
import Ingresso from "../domain/Ingresso";
import { Compra } from "../domain/Compra";

export default class ServicoDeBilheteria {
  public processarCompra(torcedor: Torcedor, partida: Partida): Compra | null {
    if (!torcedor.getAdimplente()) {
      return null;
    }
    if (!partida.temVaga()) {
      return null;
    }

    const plano = torcedor.getPlano();
    if (!plano) {
      return null;
    }

    const valorFinal = plano.calcularValorIngresso(partida.getPrecoBase());

    partida.reservarIngresso();

    const ingresso = new Ingresso(torcedor, partida, valorFinal);

    return new Compra(ingresso);
  }
}
