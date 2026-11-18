"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServicoDeTorcedor {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    cadastrar(torcedor) {
        const torcedorExistente = this.repository.buscarPorCpf(torcedor.getCpf());
        if (torcedorExistente) {
            throw new Error("Já existe um torcedor cadastrado com este CPF.");
        }
        this.repository.salvar(torcedor);
    }
    buscarPorCpf(cpf) {
        return this.repository.buscarPorCpf(cpf);
    }
}
exports.default = ServicoDeTorcedor;
