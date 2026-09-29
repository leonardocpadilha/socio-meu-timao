import Torcedor from "../domain/Torcedor";
import Partida from "../domain/Partida";
import Ingresso from "../domain/Ingresso";

export default class ServicoDeBilheteria {
    public processarCompra(torcedor: Torcedor, partida: Partida): Ingresso | null {
        if (!torcedor.getAdimplente()) {
            return null;
        }

        if (!partida.temVaga()) {
            return null;
        }

        const valorFinal = torcedor.getPlano().calcularValorIngresso(partida.getPrecoBase());

        partida.reservarIngresso();

        return new Ingresso(torcedor, partida, valorFinal);
    }
}