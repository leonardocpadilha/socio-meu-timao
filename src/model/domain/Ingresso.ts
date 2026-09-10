import Partida from "./Partida";
import Torcedor from "./Torcedor";

export default class Ingresso {
    private torcedor: Torcedor;
    private partida: Partida;
    private valorPago: number;

    public constructor(torcedor: Torcedor, partida: Partida, valorPago: number) {
        this.torcedor = torcedor;
        this.partida = partida;
        this.valorPago = valorPago;
    }

    public getTorcedor(): Torcedor {
        return this.torcedor;
    }

    public getPartida(): Partida {
        return this.partida;
    }

    public getValorPago(): number {
        return this.valorPago;
    }
}