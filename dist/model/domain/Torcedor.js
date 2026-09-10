"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Torcedor {
    nome;
    adimplente = true;
    plano;
    constructor(nome, plano, adimplente = true) {
        this.nome = nome;
        this.adimplente = adimplente;
        this.plano = plano;
    }
    getNome() {
        return this.nome;
    }
    setNome(nome) {
        this.nome = nome;
    }
    getAdimplente() {
        return this.adimplente;
    }
    setAdimplente(adimplente) {
        this.adimplente = adimplente;
    }
    getPlano() {
        return this.plano;
    }
    setPlano(plano) {
        this.plano = plano;
    }
}
exports.default = Torcedor;
