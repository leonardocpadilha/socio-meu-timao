"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Partida {
    adversario;
    precoBase;
    ingressosDisponiveis;
    constructor(adversario, precoBase, ingressosDisponiveis) {
        this.adversario = adversario;
        this.precoBase = precoBase;
        this.ingressosDisponiveis = ingressosDisponiveis;
    }
    getAdversario() {
        return this.adversario;
    }
    getPrecoBase() {
        return this.precoBase;
    }
    getIngressosDisponiveis() {
        return this.ingressosDisponiveis;
    }
    temVaga() {
        return this.ingressosDisponiveis > 0;
    }
    reservarIngresso() {
        if (this.temVaga()) {
            this.ingressosDisponiveis--;
        }
    }
}
exports.default = Partida;
