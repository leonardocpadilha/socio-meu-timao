"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ingresso {
    torcedor;
    partida;
    valorPago;
    constructor(torcedor, partida, valorPago) {
        this.torcedor = torcedor;
        this.partida = partida;
        this.valorPago = valorPago;
    }
    getTorcedor() {
        return this.torcedor;
    }
    getPartida() {
        return this.partida;
    }
    getValorPago() {
        return this.valorPago;
    }
}
exports.default = Ingresso;
