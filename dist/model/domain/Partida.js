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
    reservarIngresso(param1, param2) {
        let quantidade = 1;
        if (typeof param1 === "number") {
            quantidade = param1;
        }
        else if (typeof param1 === "string") {
            if (param1.toLowerCase() !== this.adversario.toLowerCase()) {
                console.log(`Partida incorreta! O adversário desta partida é ${this.adversario}.`);
                return;
            }
            if (typeof param2 === "number") {
                quantidade = param2;
            }
        }
        if (quantidade <= 0) {
            console.log("A quantidade de ingressos deve ser maior que zero.");
            return;
        }
        if (this.ingressosDisponiveis >= quantidade) {
            this.ingressosDisponiveis -= quantidade;
        }
        else {
            console.log("Não há ingressos suficientes disponíveis.");
        }
    }
    liberarIngresso() {
        this.ingressosDisponiveis++;
    }
}
exports.default = Partida;
