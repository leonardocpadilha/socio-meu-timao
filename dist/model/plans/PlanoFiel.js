"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlanoFiel {
    nome;
    mensalidadeBase;
    beneficios;
    constructor(nome, mensalidadeBase, beneficios) {
        this.nome = nome;
        this.mensalidadeBase = mensalidadeBase;
        this.beneficios = beneficios;
    }
    getNome() {
        return this.nome;
    }
    getMensalidadeBase() {
        return this.mensalidadeBase;
    }
    getBeneficios() {
        return this.beneficios;
    }
}
exports.default = PlanoFiel;
