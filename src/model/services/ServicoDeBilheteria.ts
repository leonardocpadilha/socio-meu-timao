import Torcedor from "../domain/Torcedor";
import Partida from "../domain/Partida";
import Ingresso from "../domain/Ingresso";

export default class ServicoDeBilheteria {
    public processarCompra(torcedor: Torcedor, partida: Partida): Ingresso {
        if (!torcedor.getAdimplente()) {
            throw new Error("Torcedor inadimplente. Regularize sua mensalidade.");
        }

        if (!partida.temVaga()) {
            throw new Error("Os ingressos para esta partida estão esgotados");
        }

        const valorFinal = torcedor.getPlano().calcularValorIngresso(partida.getPrecoBase());

        partida.reservarIngresso();

        return new Ingresso(torcedor, partida, valorFinal);
    }
}