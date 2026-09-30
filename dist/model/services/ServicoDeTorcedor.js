"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServicoDeTorcedor {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    cadastrar(torcedor) {
        this.repository.salvar(torcedor);
    }
    buscarPorCpf(cpf) {
        return this.repository.buscarPorCpf(cpf);
    }
}
exports.default = ServicoDeTorcedor;
