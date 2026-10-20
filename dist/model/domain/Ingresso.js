"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StatusIngresso_1 = require("../../enum/StatusIngresso");
class Ingresso {
    torcedor;
    partida;
    valorPago;
    status;
    constructor(torcedor, partida, valorPago) {
        this.torcedor = torcedor;
        this.partida = partida;
        this.valorPago = valorPago;
        this.status = StatusIngresso_1.StatusIngresso.ATIVO;
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
    getStatus() {
        return this.status;
    }
    liberar() {
        if (this.status === StatusIngresso_1.StatusIngresso.ATIVO) {
            this.status = StatusIngresso_1.StatusIngresso.CANCELADO;
            this.partida.liberarIngresso();
            return true;
        }
        return false;
    }
}
exports.default = Ingresso;
