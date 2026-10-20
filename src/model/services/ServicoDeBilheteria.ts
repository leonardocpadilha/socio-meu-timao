import Torcedor from "../domain/Torcedor";
import Partida from "../domain/Partida";
import Ingresso from "../domain/Ingresso";

export default class ServicoDeBilheteria {
  private partidas: Partida[] = [
    new Partida("Palmeiras", 100.0, 50),
    new Partida("São Paulo", 80.0, 40),
    new Partida("Santos", 60.0, 30),
  ];

  public getPartidas(): Partida[] {
    return this.partidas;
  }

  public processarCompra(torcedor: Torcedor, partida: Partida): Ingresso | null {
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

    return new Ingresso(torcedor, partida, valorFinal);
  }
}
