"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidadorCpfExistente = void 0;
const Validador_1 = require("../Validador");
class ValidadorCpfExistente extends Validador_1.Validador {
    repository;
    constructor(repository) {
        super();
        this.repository = repository;
    }
    executarRegra(torcedor) {
        const torcedorExistente = this.repository.buscarPorCpf(torcedor.getCpf());
        if (torcedorExistente) {
            throw new Error("Já existe um torcedor cadastrado com este CPF.");
        }
    }
}
exports.ValidadorCpfExistente = ValidadorCpfExistente;
