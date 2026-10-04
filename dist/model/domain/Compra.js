"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compra = void 0;
const StatusCompra_1 = require("../../enum/StatusCompra");
class Compra {
    ingresso;
    status;
    constructor(ingresso) {
        this.ingresso = ingresso;
        this.status = StatusCompra_1.StatusCompra.PENDENTE;
    }
    aprovar() {
        if (this.status !== StatusCompra_1.StatusCompra.PENDENTE) {
            return;
        }
        this.status = StatusCompra_1.StatusCompra.APROVADA;
    }
    cancelar() {
        if (this.status !== StatusCompra_1.StatusCompra.PENDENTE) {
            return;
        }
        this.ingresso.liberar();
        this.status = StatusCompra_1.StatusCompra.CANCELADA;
    }
    getStatus() {
        return this.status;
    }
}
exports.Compra = Compra;
