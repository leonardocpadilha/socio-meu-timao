"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validador = void 0;
class Validador {
    proximo = null;
    conectar(proximo) {
        this.proximo = proximo;
        return proximo;
    }
    validar(item) {
        this.executarRegra(item);
        if (this.proximo) {
            this.proximo.validar(item);
        }
    }
}
exports.Validador = Validador;
